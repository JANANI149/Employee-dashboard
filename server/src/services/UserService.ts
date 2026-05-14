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

  /**
   * Enable or disable a user account.
   * Business rule: admin cannot deactivate themselves.
   */
  async updateStatus(orgId: string, targetUserId: string, status: "active" | "inactive", requesterId: string) {
    if (targetUserId === requesterId) {
      throw new Error("You cannot change your own account status.");
    }
    return this.repo.updateStatus(orgId, targetUserId, status);
  }

  /**
   * Permanently remove a user from the org.
   * Business rule: admin cannot delete themselves.
   */
  async remove(orgId: string, targetUserId: string, requesterId: string) {
    if (targetUserId === requesterId) {
      throw new Error("You cannot delete your own account.");
    }
    return this.repo.remove(orgId, targetUserId);
  }
}
