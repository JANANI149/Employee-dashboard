/**
 * UserManagementTable — admin-only user management dashboard.
 *
 * Features:
 * - Fetches users from GET /api/users
 * - Role badge display
 * - Inline role update via PATCH /api/users/:id/role
 * - Delete via DELETE /api/users/:id (with confirmation modal)
 * - Search by name/email
 * - Skeleton loading state
 */
import { useState, useEffect, useCallback } from "react";
import { api } from "@/services/api";
import type { User, Role } from "@/types";
import { RoleBadge } from "./RoleBadge";
import { ConfirmModal } from "./ConfirmModal";
import { useAuth } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw, Trash2, ShieldCheck, Power } from "lucide-react";

const ROLES: Role[] = ["admin", "manager", "researcher", "employee"];

function SkeletonRow() {
  return (
    <tr className="border-t border-border animate-pulse">
      {[...Array(6)].map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-muted rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export function UserManagementTable() {
  const { appUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<User[]>("/users");
      setUsers(data);
    } catch {
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleRoleChange = async (userId: string, role: Role) => {
    setUpdatingRole(userId);
    try {
      const { data } = await api.patch<User>(`/users/${userId}/role`, { role });
      setUsers((prev) => prev.map((u) => u.id === userId ? data : u));
    } catch {
      alert("Failed to update role.");
    } finally {
      setUpdatingRole(null);
    }
  };

  const handleStatusToggle = async (user: User) => {
    const newStatus = user.status === "inactive" ? "active" : "inactive";
    setUpdatingStatus(user.id);
    try {
      const { data } = await api.patch<User>(`/users/${user.id}/status`, { status: newStatus });
      setUsers((prev) => prev.map((u) => u.id === user.id ? data : u));
    } catch {
      alert("Failed to update user status.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/users/${deleteTarget.id}`);
      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
    } catch {
      alert("Failed to delete user.");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-md border border-border bg-background text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button variant="outline" size="sm" onClick={fetchUsers} className="gap-1.5">
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-secondary/40 text-muted-foreground text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Email</th>
              <th className="text-left px-4 py-3 font-medium">Role</th>
              <th className="text-left px-4 py-3 font-medium">Organisation</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && [...Array(4)].map((_, i) => <SkeletonRow key={i} />)}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground text-sm">
                  {search ? "No users match your search." : "No users found."}
                </td>
              </tr>
            )}
            {!loading && filtered.map((u) => (
              <tr key={u.id} className="border-t border-border hover:bg-secondary/20 transition-colors">
                {/* Name */}
                <td className="px-4 py-3 font-medium">{u.name}</td>
                {/* Email */}
                <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                {/* Role — inline dropdown for admins */}
                <td className="px-4 py-3">
                  {appUser?.role === "admin" && u.id !== appUser?.id ? (
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                      <select
                        value={u.role}
                        disabled={updatingRole === u.id}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as Role)}
                        className="text-xs rounded border border-border bg-background px-1.5 py-1 outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                      {updatingRole === u.id && (
                        <span className="text-xs text-muted-foreground animate-pulse">Saving…</span>
                      )}
                    </div>
                  ) : (
                    <RoleBadge role={u.role} />
                  )}
                </td>
                {/* Org */}
                <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{u.orgId}</td>
                {/* Status */}
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs ${u.status === "inactive" ? "text-destructive" : "text-emerald-400"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${u.status === "inactive" ? "bg-destructive" : "bg-emerald-400"}`} />
                    {u.status ?? "active"}
                  </span>
                </td>
                {/* Actions */}
                <td className="px-4 py-3 text-right">
                  {appUser?.role === "admin" && u.id !== appUser?.id && (
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusToggle(u)}
                        disabled={updatingStatus === u.id}
                        className={u.status === "inactive"
                          ? "text-emerald-500 hover:text-emerald-500 hover:bg-emerald-500/10 gap-1.5"
                          : "text-yellow-500 hover:text-yellow-500 hover:bg-yellow-500/10 gap-1.5"}
                        title={u.status === "inactive" ? "Activate user" : "Deactivate user"}
                      >
                        <Power className="h-3.5 w-3.5" />
                        {updatingStatus === u.id ? "..." : u.status === "inactive" ? "Enable" : "Disable"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteTarget(u)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination placeholder */}
      <p className="text-xs text-muted-foreground text-right">
        Showing {filtered.length} of {users.length} users
      </p>

      {/* Confirm delete modal */}
      <ConfirmModal
        open={!!deleteTarget}
        title="Remove User"
        description={`Are you sure you want to remove "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel={deleting ? "Removing…" : "Remove"}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        destructive
      />
    </div>
  );
}
