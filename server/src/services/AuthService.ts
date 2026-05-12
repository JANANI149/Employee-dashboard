import type { IUserRepository } from "../interfaces/IUserRepository.js";
import type { User } from "../types/index.js";
import { adminAuth } from "../config/firebase.js";

export class AuthService {
  constructor(private userRepo: IUserRepository) {}

  /**
   * Verify a Firebase ID token and return (or seed) the matching app user.
   *
   * Flow:
   *  1. Verify the token with Firebase Admin SDK.
   *  2. Look up the user in our database by Firebase UID (or email as fallback).
   *  3. If the user doesn't exist yet, create a record (first-time login).
   *  4. Return the app user (with role + orgId).
   */
  async loginWithFirebaseToken(idToken: string): Promise<{ user: User }> {
    // Step 1: Verify the token.
    const decoded = await adminAuth.verifyIdToken(idToken);

    // Step 2: Look up by Firebase UID first, then email fallback.
    let user = await this.userRepo.getById(decoded.uid);

    if (!user && decoded.email) {
      user = await this.userRepo.getByEmail(decoded.email);
    }

    if (!user) {
      // Step 3: First login — create a new user record WITHOUT a role
      // Admin must assign role via PATCH /users/:id/role
      user = await this.userRepo.create({
        id: decoded.uid,
        name: decoded.name ?? decoded.email?.split("@")[0] ?? "User",
        email: decoded.email ?? "",
        role: undefined as any, // NO ROLE - needs admin approval
        orgId: "org-1",
        status: "inactive", // Inactive until admin approves
      });
    }

    return { user };
  }

  /**
   * Demo login fallback — accepts a role string, returns a matching seed user.
   *
   * ⚠️  Only used when the Firebase Admin SDK is not configured (dev mode).
   * The frontend sends { role } in the body instead of { idToken }.
   */
  async loginDemo(role: string): Promise<{ user: User }> {
    const validRoles = ["admin", "manager", "researcher", "employee"];
    if (!validRoles.includes(role)) {
      throw new Error(`Invalid role. Must be one of: ${validRoles.join(", ")}`);
    }
    const email = `${role}@bugspace.io`;
    const user = await this.userRepo.getByEmail(email);
    if (!user) throw new Error("Demo user not found for role: " + role);
    return { user };
  }

  /**
   * Return the app user for a verified Firebase token (used by GET /api/auth/me).
   */
  async me(idToken: string): Promise<User | null> {
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      return this.userRepo.getById(decoded.uid);
    } catch {
      return null;
    }
  }
}
