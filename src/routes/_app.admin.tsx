import { createFileRoute } from "@tanstack/react-router";
import { OverviewStats } from "@/components/admin/OverviewStats";
import { OrganizationManagement } from "@/components/admin/OrganizationManagement";
import { UserManagementTable } from "@/components/admin/UserManagementTable";
import { PendingApprovals } from "@/components/admin/PendingApprovals";
import { AuditLogViewer } from "@/components/admin/AuditLogViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, Building2, Clock, FileText } from "lucide-react";

export const Route = createFileRoute("/_app/admin")({
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage organizations, users, and monitor platform activity
        </p>
      </div>

      {/* Overview Statistics */}
      <OverviewStats />

      {/* Main Content Tabs */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            Pending
          </TabsTrigger>
          <TabsTrigger value="organizations" className="gap-2">
            <Building2 className="h-4 w-4" />
            Organizations
          </TabsTrigger>
          <TabsTrigger value="audit" className="gap-2">
            <FileText className="h-4 w-4" />
            Audit Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">User Management</h2>
            <p className="text-sm text-muted-foreground">
              View and manage all platform users
            </p>
          </div>
          <UserManagementTable />
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <PendingApprovals />
        </TabsContent>

        <TabsContent value="organizations" className="space-y-4">
          <OrganizationManagement />
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <AuditLogViewer />
        </TabsContent>
      </Tabs>
    </div>
  );
}
