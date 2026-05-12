import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = Router();

/**
 * GET /api/users
 * Admin and manager only — lists all users in the requesting user's org.
 * (Previously unrestricted — now locked down per architecture review.)
 */
router.get("/", verifyRole("admin", "manager"), UserController.list);

/**
 * PATCH /api/users/:id/role
 * Admin-only: update a specific user's role.
 * Body: { role: "admin" | "manager" | "researcher" | "employee" }
 */
router.patch("/:id/role", verifyRole("admin"), UserController.updateRole);

/**
 * DELETE /api/users/:id
 * Admin-only: remove a user from the organization.
 */
router.delete("/:id", verifyRole("admin"), UserController.remove);

export default router;
