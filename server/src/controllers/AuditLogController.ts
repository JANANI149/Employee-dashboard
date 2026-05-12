import type { Request, Response } from "express";
import { AuditLogService } from "../services/AuditLogService.js";
import { auditLogRepo } from "../repositories/index.js";

const service = new AuditLogService(auditLogRepo);

export const AuditLogController = {
  /**
   * GET /api/audit-logs
   * Returns all audit logs for the requesting user's org.
   * Read-only — no POST/PATCH/DELETE endpoints exist (append-only by design).
   */
  list: async (req: Request, res: Response) => {
    const orgId = req.user!.orgId;
    const logs = await service.listByOrg(orgId);
    return res.status(200).json(logs);
  },
};
