import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userRepository } from "@/repositories/ApiUserRepository";
import type { Role } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export function PendingApprovals() {
  const queryClient = useQueryClient();
  const [selectedRoles, setSelectedRoles] = useState<Record<string, Role>>({});

  const { data: pendingUsers, isLoading } = useQuery({
    queryKey: ["pending-users"],
    queryFn: async () => {
      const allUsers = await userRepository.list();
      // Filter users without roles OR with inactive status
      return allUsers.filter(user => 
        !user.role || 
        user.role === null || 
        user.role === undefined || 
        user.status === 'inactive'
      );
    },
  });

  const approveMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: Role }) => {
      // Update role via API
      const updatedUser = await userRepository.updateRole(userId, role);
      
      // Also update status to active in Firestore
      // This is a workaround - ideally the backend should do this
      return updatedUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-users"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User approved successfully");
    },
    onError: () => {
      toast.error("Failed to approve user");
    },
  });

  const handleApprove = (userId: string) => {
    const role = selectedRoles[userId];
    if (!role) {
      toast.error("Please select a role first");
      return;
    }
    approveMutation.mutate({ userId, role });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Pending Approvals</h2>
          <p className="text-sm text-muted-foreground">
            Users waiting for role assignment
          </p>
        </div>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Assign Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-9 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-9 w-24 ml-auto" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Pending Approvals</h2>
          <p className="text-sm text-muted-foreground">
            Users waiting for role assignment
          </p>
        </div>
        {pendingUsers && pendingUsers.length > 0 && (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            {pendingUsers.length} pending
          </Badge>
        )}
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Assign Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingUsers && pendingUsers.length > 0 ? (
              pendingUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Select
                      value={selectedRoles[user.id] || ""}
                      onValueChange={(role: Role) =>
                        setSelectedRoles({ ...selectedRoles, [user.id]: role })
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select role..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="researcher">Researcher</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(user.id)}
                      disabled={!selectedRoles[user.id] || approveMutation.isPending}
                      className="gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Approve
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No pending approvals
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
