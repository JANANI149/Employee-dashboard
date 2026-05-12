import type { IAuditLogRepository } from "../interfaces/IAuditLogRepository.js";
import type { AuditLog } from "../types/index.js";
import admin from "../config/firebase.js";

const db = admin.firestore();
const auditLogsCollection = db.collection("audit_logs");

export class FirestoreAuditLogRepository implements IAuditLogRepository {
  async list(orgId: string): Promise<AuditLog[]> {
    const snapshot = await auditLogsCollection
      .where("orgId", "==", orgId)
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as AuditLog));
  }

  async create(input: Omit<AuditLog, "id">): Promise<AuditLog> {
    const docRef = await auditLogsCollection.add(input);
    return { id: docRef.id, ...input };
  }
}
