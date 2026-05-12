import type { Request, Response } from "express";
import { UserService } from "../services/UserService.js";
import { userRepo } from "../repositories/index.js";
import type { Role } from "../types/index.js";

const service = new UserService(userRepo);

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
   *
   * Business rules enforced:
   *  - role must be a valid Role value
   *  - admin cannot change their own role (prevents self-lockout)
   *  - target user must belong to the same org as the requester
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

      return res.status(200).json(updated);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to update role";
      // Self-role-change violation comes back as 403
      if (message.includes("cannot change your own role")) {
        return res.status(403).json({ error: message });
      }
      return res.status(500).json({ error: message });
    }
  },

  /**
   * DELETE /api/users/:id
   * Admin-only: remove a user from the organization.
   * Sprint 3 TODO: implement actual deletion via FirestoreUserRepository.
   */
  remove: async (req: Request, res: Response) => {
    if (req.params.id === req.user!.id) {
      return res.status(403).json({ error: "You cannot delete your own account." });
    }
    // Placeholder — in-memory store has no delete; Sprint 3 adds real deletion.
    return res.status(204).end();
  },
};
