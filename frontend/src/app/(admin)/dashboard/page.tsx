"use client";

import { useAuth } from "@/context/auth-context";
import { JSX } from 'react';

export default function DashboardPage(): JSX.Element {
  const { user } = useAuth();

  // Double check permission inside the page content
  const canDelete = user?.permissions.includes("delete_content");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Add User
        </button>
      </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-6 py-3 font-medium">Name</th>
            <th className="px-6 py-3 font-medium">Role</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium text-right">Actions</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
          {/* Mock Row */}
          <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 font-medium">John Doe</td>
            <td className="px-6 py-4">Editor</td>
            <td className="px-6 py-4 text-green-600">Active</td>
            <td className="px-6 py-4 text-right">
              <button className="text-blue-600 hover:underline mr-3">Edit</button>

              {/* 🔒 CONDITIONAL RENDER: Only Admins see delete */}
              {canDelete && (
                <button className="text-red-600 hover:underline">Delete</button>
              )}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}