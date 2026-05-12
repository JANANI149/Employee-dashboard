import type { IUserRepository } from "../interfaces/IUserRepository.js";
import type { Role } from "../types/index.js";

export class UserService {
  constructor(private repo: IUserRepository) {}

  listByOrg(orgId: string) {
    return this.repo.listByOrg(orgId);
  }

  getById(id: string) {
    return this.repo.getById(id);
  }

  /**
   * Update a user's role within the same org.
   * Business rule: an admin cannot change their own role (prevents accidental self-lockout).
   */
  async updateRole(orgId: string, targetUserId: string, role: Role, requesterId: string) {
    if (targetUserId === requesterId) {
      throw new Error("You cannot change your own role.");
    }
    return this.repo.updateRole(orgId, targetUserId, role);
  }
}
