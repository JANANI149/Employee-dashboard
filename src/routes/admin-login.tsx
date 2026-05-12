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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6 relative">
      {/* Back to Landing Page - Top Left */}
      <div className="absolute top-6 left-6">
        <Link to="/landing">
          <Button variant="ghost" className="gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Back to Landing Page
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Shield className="h-8 w-8 text-purple-600" />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              BUGSPACE <span className="text-purple-600">PRO</span>
            </h1>
            <p className="text-xs text-purple-600 font-medium">Administrator Access</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white border border-purple-200 rounded-xl p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-6 justify-center">
            <ShieldAlert className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Admin Sign In</h2>
          </div>
          
          <p className="text-sm text-gray-600 mb-8 text-center">
            This portal is restricted to system administrators only.
            Enter your admin credentials to continue.
          </p>

          {/* Error state */}
          {error && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || loading}
                required
                className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting || loading}
                  required
                  className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
              className="w-full gap-2 bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isSubmitting || loading || !email || !password}
            >
              {isSubmitting || loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating…
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <span className="text-purple-600 font-medium">Security Notice:</span> All admin access attempts are logged and monitored.
              Unauthorized access is prohibited.
            </p>
          </div>
        </div>

        {/* Back to main login */}
        <div className="mt-6 text-center">
          <a href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Regular user login →
          </a>
        </div>
      </div>
    </div>
  );
}
