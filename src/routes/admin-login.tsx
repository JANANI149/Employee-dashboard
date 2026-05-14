import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/store/auth";
import { ShieldAlert, Loader2, Shield, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin-login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const { appUser, firebaseUser, loading, error, signInWithEmail } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated - let index route handle the logic
  useEffect(() => {
    if (!loading && firebaseUser) {
      // Redirect to index route which will handle proper routing based on role/status
      navigate({ to: "/" });
    }
  }, [firebaseUser, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }

    setIsSubmitting(true);
    try {
      await signInWithEmail(email, password);
      // Navigation happens in the useEffect above once appUser is set
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-purple-50/30 p-6 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Back to Landing Page - Top Left */}
      <div className="absolute top-6 left-6 z-10">
        <Link to="/landing">
          <Button variant="ghost" className="gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100">
            <ArrowLeft className="h-4 w-4" />
            Back to Landing Page
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-slate-900 blur-lg opacity-20 rounded-full"></div>
            <Shield className="h-8 w-8 text-slate-900 relative" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-slate-900">Bugspace</span>
              <span className="text-purple-600">Pro</span>
            </h1>
            <p className="text-xs text-slate-600 font-medium">Administrator Portal</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <ShieldAlert className="h-6 w-6 text-slate-900" />
            <h2 className="text-2xl font-bold text-slate-900">Admin Access</h2>
          </div>
          
          <p className="text-sm text-slate-600 mb-8 text-center">
            This portal is restricted to system administrators only.
            Enter your credentials to continue.
          </p>

          {/* Error state */}
          {error && (
            <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@bugspace.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || loading}
                required
                className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting || loading}
                  required
                  className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 pr-10 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gap-2 bg-slate-900 hover:bg-slate-800 text-white h-12 shadow-lg shadow-slate-900/20"
              disabled={isSubmitting || loading || !email || !password}
            >
              {isSubmitting || loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Authenticating…
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs text-slate-600 text-center">
              <span className="text-slate-900 font-semibold">Security Notice:</span> All admin access attempts are logged and monitored.
              Unauthorized access is prohibited.
            </p>
          </div>
        </div>

        {/* Back to main login */}
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
            Regular user login →
          </Link>
        </div>
      </div>
    </div>
  );
}
