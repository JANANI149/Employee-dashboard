import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employee/profile")({
  component: ProfilePage,
});

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-sm border p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* AVATAR */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center text-4xl font-bold shadow-lg">
              A
            </div>

            {/* USER INFO */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-700">
              John
              </h1>

              <p className="text-lg text-purple-600 font-medium mt-1">
                Security Analyst
              </p>

              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                <span>EMP-2026-001</span>
                <span>•</span>
                <span>Security Department</span>
                <span>•</span>
                <span>analyst@bugspace.com</span>
              </div>
            </div>

            {/* STATUS */}
            <div>
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                Active Employee
              </span>
            </div>
          </div>
        </div>

        {/* GRID SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* BASIC INFO */}
          <div className="bg-white rounded-3xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Basic Information
            </h2>

            <div className="space-y-5">
              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">
                  Full Name
                </span>

                <span className="font-medium">
                  John
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">
                  Employee ID
                </span>

                <span className="font-medium">
                  EMP-2026-001
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">
                  Role
                </span>

                <span className="font-medium">
                  Security Analyst
                </span>
              </div>

              <div className="flex justify-between border-b pb-3">
                <span className="text-gray-500">
                  Department
                </span>

                <span className="font-medium">
                  Security
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Email
                </span>

                <span className="font-medium">
                  analyst@bugspace.com
                </span>
              </div>
            </div>
          </div>

          {/* ACCOUNT SETTINGS */}
          <div className="bg-white rounded-3xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Account Settings
            </h2>

            <div className="space-y-4">
              <button className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-3 rounded-xl font-medium">
                Change Password
              </button>

              <button className="w-full border border-gray-200 hover:bg-gray-100 transition py-3 rounded-xl font-medium">
                Update Email
              </button>

              <button className="w-full border border-gray-200 hover:bg-gray-100 transition py-3 rounded-xl font-medium">
                Enable 2FA Authentication
              </button>
            </div>

            <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-100">
              <p className="text-green-700 font-medium">
                Security Status: Protected
              </p>

              <p className="text-sm text-green-600 mt-1">
                Your account security is healthy.
              </p>
            </div>
          </div>

          {/* WORK STATS */}
          <div className="bg-white rounded-3xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Work Statistics
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-2xl p-5">
                <h3 className="text-gray-500 text-sm">
                  Reports Triaged
                </h3>

                <p className="text-3xl font-bold text-purple-700 mt-2">
                  124
                </p>
              </div>

              <div className="bg-green-50 rounded-2xl p-5">
                <h3 className="text-gray-500 text-sm">
                  Reports Resolved
                </h3>

                <p className="text-3xl font-bold text-green-700 mt-2">
                  89
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-5">
                <h3 className="text-gray-500 text-sm">
                  Avg Response Time
                </h3>

                <p className="text-3xl font-bold text-blue-700 mt-2">
                  4h
                </p>
              </div>

              <div className="bg-orange-50 rounded-2xl p-5">
                <h3 className="text-gray-500 text-sm">
                  Active Programs
                </h3>

                <p className="text-3xl font-bold text-orange-700 mt-2">
                  5
                </p>
              </div>
            </div>
          </div>

          {/* ACTIVITY LOG */}
          <div className="bg-white rounded-3xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Activity Log
            </h2>

            <div className="space-y-4">
              <div className="border-l-4 border-purple-500 pl-4">
                <p className="font-medium">
                  Last Login
                </p>

                <p className="text-sm text-gray-500">
                  Today • 10:45 AM
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <p className="font-medium">
                  Triaged Report #182
                </p>

                <p className="text-sm text-gray-500">
                  2 hours ago
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-medium">
                  Updated Report #203
                </p>

                <p className="text-sm text-gray-500">
                  Yesterday
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-4">
                <p className="font-medium">
                  Assigned to Program 123
                </p>

                <p className="text-sm text-gray-500">
                  3 days ago
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PREFERENCES */}
        <div className="bg-white rounded-3xl shadow-sm border p-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Preferences
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <label className="flex items-center justify-between border rounded-2xl p-4 cursor-pointer hover:bg-gray-50">
              <div>
                <p className="font-medium">
                  Email Notifications
                </p>

                <p className="text-sm text-gray-500">
                  Receive alerts via email
                </p>
              </div>

              <input type="checkbox" defaultChecked />
            </label>

            <label className="flex items-center justify-between border rounded-2xl p-4 cursor-pointer hover:bg-gray-50">
              <div>
                <p className="font-medium">
                  Dark Theme
                </p>

                <p className="text-sm text-gray-500">
                  Enable dark interface
                </p>
              </div>

              <input type="checkbox" />
            </label>

            <label className="flex items-center justify-between border rounded-2xl p-4 cursor-pointer hover:bg-gray-50">
              <div>
                <p className="font-medium">
                  Real-Time Alerts
                </p>

                <p className="text-sm text-gray-500">
                  Instant triage notifications
                </p>
              </div>

              <input type="checkbox" defaultChecked />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}