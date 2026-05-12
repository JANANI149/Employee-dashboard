/**
 * src/routes/unauthorized.tsx
 * 403 Unauthorized page — shown when a user is authenticated but lacks the required role.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldX } from "lucide-react";
import { useAuth } from "@/store/auth";
import { getRoleDashboard } from "@/lib/roleRedirect";

export const Route = createFileRoute("/unauthorized")({
  component: UnauthorizedPage,
});

function UnauthorizedPage() {
  const { appUser } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-destructive/10 text-destructive">
            <ShieldX className="h-8 w-8" />
          </span>
        </div>
        <h1 className="text-5xl font-bold text-foreground mb-2">403</h1>
        <h2 className="text-xl font-semibold text-foreground mb-2">Access Denied</h2>
        <p className="text-sm text-muted-foreground mb-8">
          You don't have permission to view this page.
          {appUser && (
            <span className="block mt-1">
              Your current role is <strong className="text-foreground capitalize">{appUser.role}</strong>.
            </span>
          )}
        </p>
        <Link
          to={appUser ? getRoleDashboard(appUser.role) : "/login"}
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Go to my dashboard
        </Link>
      </div>
    </div>
  );
}
