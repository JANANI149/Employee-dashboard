import type { IUserRepository } from "../interfaces/IUserRepository.js";
import type { User, Role } from "../types/index.js";

// Shared seed data — exported so other modules can inspect/extend in tests.
const db: User[] = [
  {
    id: "u-admin",
    name: "Alex Admin",
    email: "admin@bugspace.io",
    role: "admin",
    orgId: "org-1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u-manager",
    name: "Morgan Manager",
    email: "manager@bugspace.io",
    role: "manager",
    orgId: "org-1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u-researcher",
    name: "Riley Researcher",
    email: "researcher@bugspace.io",
    role: "researcher",
    orgId: "org-1",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u-employee",
    name: "Evan Employee",
    email: "employee@bugspace.io",
    role: "employee",
    orgId: "org-1",
    createdAt: new Date().toISOString(),
  },
];

export class InMemoryUserRepository implements IUserRepository {
  async listByOrg(orgId: string) {
    return db.filter((u) => u.orgId === orgId);
  }

  async getById(id: string) {
    return db.find((u) => u.id === id) ?? null;
  }

  async getByEmail(email: string) {
    return db.find((u) => u.email === email) ?? null;
  }

  async updateRole(orgId: string, userId: string, role: Role) {
    const user = db.find((u) => u.id === userId && u.orgId === orgId);
    if (!user) return null;
    user.role = role;
    return user;
  }

  async create(input: Omit<User, "id" | "createdAt"> & { id?: string }) {
    const user: User = {
      ...input,
      id: input.id ?? `u-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    db.push(user);
    return user;
  }
}
