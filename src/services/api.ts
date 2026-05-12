/**
 * Axios instance for all backend API calls.
 *
 * The request interceptor dynamically attaches:
 *  - Authorization: Bearer <firebase-id-token>   (fresh on every request)
 *  - x-org-id: <orgId>                           (from auth store)
 *
 * Using a dynamic token getter (getIdToken) ensures we never send an expired
 * token — Firebase refreshes it automatically in the background.
 */
import axios from "axios";
import { getIdToken } from "@/lib/googleAuth";

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL ?? ""}/api`,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") return config;

  // Always get a fresh token — Firebase refreshes it under the hood if expired.
  const token = await getIdToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // Keep localStorage in sync so that non-interceptor code can read it.
    localStorage.setItem("bp_token", token);
  }

  const orgId = localStorage.getItem("bp_orgId");
  if (orgId) config.headers["x-org-id"] = orgId;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear storage and redirect to login.
      if (typeof window !== "undefined") {
        localStorage.removeItem("bp_token");
        localStorage.removeItem("bp_orgId");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);