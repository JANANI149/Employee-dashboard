import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { reportRepository } from "@/repositories/ApiReportRepository";
import type { Report } from "@/types";
import { StatusBadge } from "./StatusBadge";

const placeholder: Report[] = [
  { id: "R-204", title: "Stored XSS in profile bio renderer", programId: "p1", programName: "Web App", severity: "high", status: "Triaged", reporterId: "u-res", reporterName: "Riley Researcher", description: "", createdAt: new Date().toISOString(), orgId: "org-1" },
  { id: "R-203", title: "IDOR on /api/invoices/{id}", programId: "p2", programName: "Mobile API", severity: "critical", status: "New", reporterId: "u-res", reporterName: "Riley Researcher", description: "", createdAt: new Date().toISOString(), orgId: "org-1" },
  { id: "R-202", title: "Open redirect in OAuth callback", programId: "p1", programName: "Web App", severity: "medium", status: "Needs Info", reporterId: "u-res", reporterName: "Riley Researcher", description: "", createdAt: new Date().toISOString(), orgId: "org-1" },
  { id: "R-201", title: "Outdated TLS cipher accepted", programId: "p3", programName: "Internal Tools", severity: "low", status: "Closed", reporterId: "u-res", reporterName: "Riley Researcher", description: "", createdAt: new Date().toISOString(), orgId: "org-1" },
];

export function ReportsTable() {
  const [reports, setReports] = useState<Report[]>([]);
  useEffect(() => {
    reportRepository.list().then(setReports).catch(() => setReports(placeholder));
  }, []);
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-secondary/40 text-muted-foreground">
          <tr>
            <th className="text-left px-4 py-2 font-medium">ID</th>
            <th className="text-left px-4 py-2 font-medium">Title</th>
            <th className="text-left px-4 py-2 font-medium">Program</th>
            <th className="text-left px-4 py-2 font-medium">Severity</th>
            <th className="text-left px-4 py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.id} className="border-t border-border hover:bg-secondary/20">
              <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{r.id}</td>
              <td className="px-4 py-2">
                <Link to="/reports/$reportId" params={{ reportId: r.id }} className="hover:text-primary">
                  {r.title}
                </Link>
              </td>
              <td className="px-4 py-2 text-muted-foreground">{r.programName}</td>
              <td className="px-4 py-2 capitalize">{r.severity}</td>
              <td className="px-4 py-2"><StatusBadge status={r.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
