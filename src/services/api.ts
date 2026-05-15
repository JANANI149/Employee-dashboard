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
import { useAuth } from "@/store/auth";

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
  }

  // Get orgId from auth store
  const orgId = useAuth.getState().appUser?.orgId;
  if (orgId) config.headers["x-org-id"] = orgId;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear store and redirect to login.
      if (typeof window !== "undefined") {
        useAuth.getState().signOut();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);