import type { IProgramRepository } from "../interfaces/IProgramRepository.js";

export class ProgramService {
  constructor(private repo: IProgramRepository) {}
  list(orgId: string) { return this.repo.list(orgId); }
  get(orgId: string, id: string) { return this.repo.get(orgId, id); }
  create(orgId: string, input: any) { return this.repo.create(orgId, input); }
}
