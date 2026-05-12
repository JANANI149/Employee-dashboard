import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/store/auth";
import { ShieldAlert, Chrome, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { appUser, firebaseUser, loading, error, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated - let index route handle the logic
  useEffect(() => {
    if (!loading && firebaseUser) {
      // Redirect to index route which will handle proper routing based on role/status
      navigate({ to: "/" });
    }
  }, [firebaseUser, loading, navigate]);

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
    // Navigation happens in the useEffect above once firebaseUser is set.
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 relative">
      {/* Back to Landing Page - Top Left */}
      <div className="absolute top-6 left-6">
        <Link to="/landing">
          <Button variant="ghost" className="gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            Back to Landing Page
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <ShieldAlert className="h-7 w-7 text-purple-600" />
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            BUGSPACE <span className="text-purple-600">PRO</span>
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-1 text-gray-900">Sign in</h2>
          <p className="text-sm text-gray-600 mb-8">
            Use your organisation Google account to continue.
          </p>

          {/* Error state */}
          {error && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Google Sign-In button */}
          <Button
            className="w-full gap-2 bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Chrome className="h-4 w-4" />
            )}
            {loading ? "Signing in…" : "Continue with Google"}
          </Button>

          <p className="mt-6 text-center text-xs text-gray-500">
            Access is restricted to authorised organisation members.
          </p>
        </div>
      </div>
    </div>
  );
}