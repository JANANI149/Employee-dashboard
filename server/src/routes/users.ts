import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { verifyRole } from "../middleware/verifyRole.js";

const router = Router();

/** GET /api/users — list all users in the org (admin + manager) */
router.get("/", verifyRole("admin", "manager"), UserController.list);

/** PATCH /api/users/:id/role — update a user's role (admin only) */
router.patch("/:id/role", verifyRole("admin"), UserController.updateRole);

/** PATCH /api/users/:id/status — activate or deactivate a user (admin only) */
router.patch("/:id/status", verifyRole("admin"), UserController.updateStatus);

/** DELETE /api/users/:id — permanently remove a user (admin only) */
router.delete("/:id", verifyRole("admin"), UserController.remove);

export default router;
