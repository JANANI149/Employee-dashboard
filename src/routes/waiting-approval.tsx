import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/store/auth";
import { Clock, ShieldAlert, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/waiting-approval")({
  component: WaitingApprovalPage,
});

function WaitingApprovalPage() {
  const { firebaseUser, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <ShieldAlert className="h-7 w-7 text-purple-500" />
          <h1 className="text-2xl font-semibold tracking-tight text-white">Bugspace Pro</h1>
        </div>

        {/* Card */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 shadow-xl">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-3 text-center">
            Account Pending Approval
          </h2>
          
          <p className="text-slate-400 text-center mb-6">
            Your account is waiting for administrator approval and role assignment.
          </p>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="text-white font-medium">{firebaseUser?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-yellow-500 font-medium">Pending</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-semibold text-white">What happens next?</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">•</span>
                <span>An administrator will review your account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">•</span>
                <span>You'll be assigned an appropriate role</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">•</span>
                <span>You'll receive access to the platform</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-400 text-center">
              You'll be notified via email once your account is approved.
              This usually takes 1-2 business days.
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full gap-2 border-slate-700 text-slate-300 hover:bg-slate-800"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Need help? Contact your organization administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
