import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { 
  ShieldAlert, 
  Lock, 
  Users, 
  FileText, 
  Activity, 
  Zap,
  CheckCircle2,
  ArrowRight,
  Shield,
  Database,
  GitBranch
} from "lucide-react";

export const Route = createFileRoute("/landing")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-7 w-7 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">
                BUGSPACE <span className="text-purple-600">PRO</span>
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
              <a href="#" className="hover:text-gray-900">Platform</a>
              <a href="#" className="hover:text-gray-900">Features</a>
              <a href="#" className="hover:text-gray-900">Solutions</a>
              <a href="#" className="hover:text-gray-900">Resources</a>
              <a href="#" className="hover:text-gray-900">Pricing</a>
              <a href="#" className="hover:text-gray-900">About Us</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                  Login
                </Button>
              </Link>
              <Link to="/admin-login">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
                  <Shield className="h-4 w-4" />
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-sm font-medium">
              <ShieldAlert className="h-4 w-4" />
              Enterprise Vulnerability Management Platform
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
                Secure Today.
                <br />
                Stronger Tomorrow.
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Bugspace Pro.
                </span>
              </h1>
              <p className="text-base text-gray-600 max-w-xl">
                Streamline vulnerability discovery, triage, and remediation with complete visibility, role-based access, and audit-ready workflows — built for modern security teams.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
                  <Shield className="h-5 w-5" />
                  Login to Platform
                </Button>
              </Link>
              <Link to="/admin-login">
                <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 gap-2">
                  <Shield className="h-5 w-5" />
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
              {/* Mock Dashboard Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">BUGSPACE <span className="text-purple-600">PRO</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Mock Stats */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">24</div>
                  <div className="text-xs text-gray-500">Total Programs</div>
                  <div className="text-xs text-green-600">+8% this month</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">156</div>
                  <div className="text-xs text-gray-500">Open Reports</div>
                  <div className="text-xs text-green-600">+9% this month</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">23</div>
                  <div className="text-xs text-gray-500">Critical Issues</div>
                  <div className="text-xs text-red-600">↑ 15% this month</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">87</div>
                  <div className="text-xs text-gray-500">Researchers</div>
                  <div className="text-xs text-green-600">+8% this month</div>
                </div>
              </div>

              {/* Mock Chart */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold text-gray-900">Reports by Severity</h3>
                  <h3 className="text-xs font-semibold text-gray-900">Vulnerability Reports</h3>
                </div>
                <div className="h-24 flex items-end justify-between gap-2">
                  <div className="flex-1 bg-red-500 rounded-t" style={{height: '75%'}}></div>
                  <div className="flex-1 bg-orange-500 rounded-t" style={{height: '60%'}}></div>
                  <div className="flex-1 bg-yellow-500 rounded-t" style={{height: '45%'}}></div>
                  <div className="flex-1 bg-blue-500 rounded-t" style={{height: '30%'}}></div>
                  <div className="flex-1 bg-purple-500 rounded-t" style={{height: '85%'}}></div>
                  <div className="flex-1 bg-purple-600 rounded-t" style={{height: '95%'}}></div>
                </div>
              </div>

              {/* Mock Activity */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-900 mb-2">Recent Activity</h3>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-gray-600 flex-1">SQL injection reported in Banking API</span>
                  <span className="text-gray-400">2m ago</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-gray-600 flex-1">XSS vulnerability identified in Dashboard</span>
                  <span className="text-gray-400">15m ago</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span className="text-gray-600 flex-1">Sensitive data exposed in user profile</span>
                  <span className="text-gray-400">1h ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-24 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Security
          </h2>
          <p className="text-gray-600 text-lg">
            Powerful features built for enterprise security teams
          </p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Shield className="h-6 w-6 text-purple-600" />}
            title="Role-Based Access"
            description="Granular permissions for admins, managers, employees, and researchers."
          />
          <FeatureCard
            icon={<FileText className="h-6 w-6 text-purple-600" />}
            title="Audit Ready"
            description="Immutable audit logs for every action with full traceability and compliance."
          />
          <FeatureCard
            icon={<GitBranch className="h-6 w-6 text-purple-600" />}
            title="End-to-End Workflows"
            description="From vulnerability submission to triage and remediation—all in one platform."
          />
          <FeatureCard
            icon={<Database className="h-6 w-6 text-purple-600" />}
            title="Multi-Tenant Architecture"
            description="Isolated, secure, and scalable for organizations of any size."
          />
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="container mx-auto px-6 py-16 bg-white">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
            TRUSTED BY SECURITY-FIRST COMPANIES
          </p>
        </div>
        <div className="flex items-center justify-center gap-12 flex-wrap opacity-40 grayscale">
          <div className="text-2xl font-bold text-gray-400">TESLA</div>
          <div className="text-2xl font-bold text-gray-400">Microsoft</div>
          <div className="text-2xl font-bold text-gray-400">airtel</div>
          <div className="text-2xl font-bold text-gray-400">PAYTM</div>
          <div className="text-2xl font-bold text-gray-400">CRED</div>
          <div className="text-2xl font-bold text-gray-400">zomato</div>
          <div className="text-2xl font-bold text-gray-400">Razorpay</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24 bg-gray-50">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Secure Your Organization?
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Join leading enterprises using Bugspace Pro to manage their vulnerability disclosure programs.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 gap-2">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldAlert className="h-6 w-6 text-purple-600" />
                <span className="font-bold text-gray-900">
                  BUGSPACE <span className="text-purple-600">PRO</span>
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Enterprise vulnerability management platform for modern security teams.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-gray-900">Features</a></li>
                <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="hover:text-gray-900">Security</a></li>
                <li><a href="#" className="hover:text-gray-900">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms</a></li>
                <li><a href="#" className="hover:text-gray-900">Security</a></li>
                <li><a href="#" className="hover:text-gray-900">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-600 text-sm">
            © 2024 Bugspace Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-lg transition-all">
      <div className="mb-4 w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
