import { Link, Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/store/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { Role } from "@/types";

const navByRole: Record<Role, { to: string; label: string }[]> = {
  admin: [
    { to: "/admin",         label: "Dashboard"     },
    { to: "/programs",      label: "Programs"      },
    { to: "/reports",       label: "Reports"       },
    { to: "/users",         label: "Users"         },
    { to: "/organizations", label: "Organizations" },
    { to: "/audit-logs",    label: "Audit Logs"    },
  ],
  manager: [
    { to: "/manager",    label: "Dashboard" },
    { to: "/programs",   label: "Programs"  },
    { to: "/reports",    label: "Reports"   },
    { to: "/users",      label: "Users"     },
    { to: "/audit-logs", label: "Audit Logs"},
  ],
  researcher: [
    { to: "/researcher",  label: "Dashboard" },
    { to: "/reports",     label: "Reports"   },
    { to: "/reports/new", label: "Submit"    },
  ],
  employee: [
    { to: "/employee", label: "Dashboard" },
    { to: "/reports",  label: "Reports"   },
  ],
};

export function AppLayout() {
  const { appUser, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !appUser) navigate({ to: "/login" });
  }, [appUser, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!appUser) return null;

  const items = navByRole[appUser.role];

  const handleLogout = async () => {
    await signOut();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen flex bg-white text-foreground">
      <aside className="w-60 bg-black border-r border-gray-800 p-4 flex flex-col gap-2">
        <div className="text-lg font-semibold mb-4 text-white">
          BUGSPACE <span className="text-purple-500">PRO</span>
        </div>
        <nav className="flex flex-col gap-1">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-purple-600 hover:text-white transition-colors",
                location.pathname === it.to && "bg-purple-600 text-white font-medium"
              )}
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-gray-200 flex items-center justify-between px-6 bg-white">
          <div className="text-sm text-gray-600 capitalize">{appUser.role}</div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-900">{appUser.name}</span>
            <Button size="sm" variant="ghost" onClick={handleLogout} className="text-gray-700 hover:text-gray-900">
              Logout
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}