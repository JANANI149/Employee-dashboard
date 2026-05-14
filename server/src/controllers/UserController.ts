import type { Request, Response } from "express";
import { UserService } from "../services/UserService.js";
import { AuditLogService } from "../services/AuditLogService.js";
import { userRepo, auditLogRepo } from "../repositories/index.js";
import type { Role } from "../types/index.js";

const service = new UserService(userRepo);
const auditService = new AuditLogService(auditLogRepo);

const VALID_ROLES: Role[] = ["admin", "manager", "researcher", "employee"];

export const UserController = {
  /**
   * GET /api/users
   * Returns all users in the requesting user's organization.
   * Restricted to admin and manager roles (enforced on the route).
   */
  list: async (req: Request, res: Response) => {
    try {
      const users = await service.listByOrg(req.orgId!);
      return res.status(200).json(users);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to list users";
      return res.status(500).json({ error: message });
    }
  },

  /**
   * PATCH /api/users/:id/role
   * Admin-only: update a user's role within the same org.
   * Body: { role: Role }
   */
  updateRole: async (req: Request, res: Response) => {
    const { role } = req.body as { role?: Role };

    if (!role || !VALID_ROLES.includes(role)) {
      return res.status(400).json({
        error: `'role' must be one of: ${VALID_ROLES.join(", ")}`,
      });
    }

    try {
      const updated = await service.updateRole(
        req.orgId!,
        req.params.id,
        role,
        req.user!.id,
      );

      if (!updated) {
        return res.status(404).json({ error: "User not found in this organization." });
      }

      // Record audit log
      await auditService.log({
        orgId: req.orgId!,
        actorId: req.user!.id,
        actorName: req.user!.id,
        action: "ROLE_CHANGED",
        targetType: "user",
        targetId: req.params.id,
        targetName: updated.name,
        metadata: { newRole: role },
      });

      return res.status(200).json(updated);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update role";
      if (message.includes("cannot change your own role")) {
        return res.status(403).json({ error: message });
      }
      return res.status(500).json({ error: message });
    }
  },

  /**
   * PATCH /api/users/:id/status
   * Admin-only: activate or deactivate a user account.
   * Body: { status: "active" | "inactive" }
   */
  updateStatus: async (req: Request, res: Response) => {
    const { status } = req.body as { status?: "active" | "inactive" };

    if (!status || !["active", "inactive"].includes(status)) {
      return res.status(400).json({ error: "'status' must be 'active' or 'inactive'" });
    }

    try {
      const updated = await service.updateStatus(req.orgId!, req.params.id, status, req.user!.id);

      if (!updated) {
        return res.status(404).json({ error: "User not found in this organization." });
      }

      // Record audit log
      await auditService.log({
        orgId: req.orgId!,
        actorId: req.user!.id,
        actorName: req.user!.id,
        action: status === "inactive" ? "USER_DEACTIVATED" : "USER_ACTIVATED",
        targetType: "user",
        targetId: req.params.id,
        targetName: updated.name,
        metadata: { status },
      });

      return res.status(200).json(updated);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update status";
      if (message.includes("cannot change your own")) {
        return res.status(403).json({ error: message });
      }
      return res.status(500).json({ error: message });
    }
  },

  /**
   * DELETE /api/users/:id
   * Admin-only: permanently remove a user from the organization.
   */
  remove: async (req: Request, res: Response) => {
    try {
      // Fetch user info before deletion for the audit log
      const targetUser = await userRepo.getById(req.params.id);

      const deleted = await service.remove(req.orgId!, req.params.id, req.user!.id);

      if (!deleted) {
        return res.status(404).json({ error: "User not found in this organization." });
      }

      // Record audit log
      await auditService.log({
        orgId: req.orgId!,
        actorId: req.user!.id,
        actorName: req.user!.id,
        action: "USER_DELETED",
        targetType: "user",
        targetId: req.params.id,
        targetName: targetUser?.name ?? req.params.id,
      });

      return res.status(204).end();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to delete user";
      if (message.includes("cannot delete your own")) {
        return res.status(403).json({ error: message });
      }
      return res.status(500).json({ error: message });
    }
  },
};
