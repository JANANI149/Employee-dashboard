import { createFileRoute } from "@tanstack/react-router";
import { DashboardCards } from "../components/DashboardCards";
import { ReportsTable } from "../components/ReportsTable";

export const Route = createFileRoute("/_app/employee")({
  component: EmployeeDashboard,
});

function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Employee Dashboard</h1>
        <p className="text-sm text-muted-foreground">Read-only view of reports</p>
      </div>
      <DashboardCards />
      <ReportsTable />
    </div>
  );
}
