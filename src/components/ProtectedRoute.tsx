/**
 * ProtectedRoute — role-guarded route wrapper.
 *
 * Drop this inside any TanStack Router route component that needs access control.
 *
 * States handled:
 *  1. loading  → spinner (Firebase auth resolving)
 *  2. not logged in → redirect to /login
 *  3. logged in, wrong role → /unauthorized (403)
 *  4. logged in, correct role → render children
 *
 * Usage:
 *   <ProtectedRoute allowedRoles={["admin"]}>
 *     <AdminPage />
 *   </ProtectedRoute>
 */
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../store/auth";
import { isRoleAllowed } from "../lib/roleRedirect";
import type { Role } from "../types";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { appUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!appUser) {
      navigate({ to: "/login" });
      return;
    }
    if (allowedRoles && !isRoleAllowed(appUser.role, allowedRoles)) {
      navigate({ to: "/unauthorized" });
    }
  }, [appUser, loading, allowedRoles, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-7 w-7 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Checking permissions…</p>
        </div>
      </div>
    );
  }

  if (!appUser) return null;

  if (allowedRoles && !isRoleAllowed(appUser.role, allowedRoles)) {
    return null; // will redirect in useEffect
  }

  return <>{children}</>;
}
