import type { IUserRepository } from "../interfaces/IUserRepository.js";
import type { User } from "../types/index.js";
import { adminAuth } from "../config/firebase.js";

/**
 * Emails that are automatically assigned the "admin" role on first login.
 * These users bypass the waiting-approval flow entirely.
 */
const ADMIN_EMAILS: string[] = [
  "kavinhbn@gmail.com",
  "tnhariyt009@gmail.com",
  "bugspacepro@gmail.com",
];

export class AuthService {
  constructor(private userRepo: IUserRepository) {}

  /**
   * Verify a Firebase ID token and return (or seed) the matching app user.
   *
   * Flow:
   *  1. Verify the token with Firebase Admin SDK.
   *  2. Look up the user in our database by Firebase UID (or email as fallback).
   *  3. If the user doesn't exist yet, create a record (first-time login).
   *     - If the email is in ADMIN_EMAILS → role: "admin", status: "active"
   *     - Otherwise → no role, status: "inactive" (needs admin approval)
   *  4. If the user exists but has no role and their email is in ADMIN_EMAILS,
   *     auto-upgrade them to admin.
   *  5. Return the app user (with role + orgId).
   */
  async loginWithFirebaseToken(idToken: string): Promise<{ user: User }> {
    // Step 1: Verify the token.
    const decoded = await adminAuth.verifyIdToken(idToken);

    // Step 2: Look up by Firebase UID first, then email fallback.
    let user = await this.userRepo.getById(decoded.uid);

    if (!user && decoded.email) {
      user = await this.userRepo.getByEmail(decoded.email);
    }

    const isAdminEmail = decoded.email
      ? ADMIN_EMAILS.includes(decoded.email.toLowerCase())
      : false;

    if (!user) {
      // Step 3: First login — create a new user record.
      if (isAdminEmail) {
        // Known admin email → assign admin role immediately
        user = await this.userRepo.create({
          id: decoded.uid,
          name: decoded.name ?? decoded.email?.split("@")[0] ?? "Admin",
          email: decoded.email ?? "",
          role: "admin",
          orgId: "org-1",
          status: "active",
        });
      } else {
        // Regular user → no role, needs admin approval
        user = await this.userRepo.create({
          id: decoded.uid,
          name: decoded.name ?? decoded.email?.split("@")[0] ?? "User",
          email: decoded.email ?? "",
          role: undefined as any, // NO ROLE - needs admin approval
          orgId: "org-1",
          status: "inactive", // Inactive until admin approves
        });
      }
    } else if ((!user.role || user.status === "inactive") && isAdminEmail) {
      // Step 4: Existing user with no role but is a known admin email → auto-upgrade
      user = (await this.userRepo.updateRole(user.orgId, user.id, "admin")) ?? user;
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
