import type { Request, Response } from "express";
import { OrganizationService } from "../services/OrganizationService.js";
import { orgRepo } from "../repositories/index.js";

const service = new OrganizationService(orgRepo);

export const OrganizationController = {
  /**
   * GET /api/organizations
   * Admin-only: list all organizations in the system.
   */
  list: async (_req: Request, res: Response) => {
    try {
      const orgs = await service.list();
      return res.status(200).json(orgs);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to list organizations";
      return res.status(500).json({ error: message });
    }
  },

  /**
   * GET /api/organizations/:id
   * Admin/manager: fetch a single org by id.
   */
  get: async (req: Request, res: Response) => {
    try {
      const org = await service.get(req.params.id);
      if (!org) return res.status(404).json({ error: "Organization not found." });
      return res.status(200).json(org);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to get organization";
      return res.status(500).json({ error: message });
    }
  },

  /**
   * POST /api/organizations
   * Admin-only: create a new tenant organization.
   * Body: { name: string, domain?: string }
   */
  create: async (req: Request, res: Response) => {
    const { name, domain } = req.body as { name?: string; domain?: string };

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ error: "'name' is required and must be a non-empty string." });
    }

    try {
      const org = await service.create({ name: name.trim(), domain }, req.user!.id);
      return res.status(201).json(org);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create organization";
      return res.status(500).json({ error: message });
    }
  },
};
