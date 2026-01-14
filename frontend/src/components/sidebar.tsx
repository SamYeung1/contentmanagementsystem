"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { NAV_ITEMS } from "@/config/nav-items";
import { LogOut } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  console.log(user?.roles.flatMap((role)=>
    role.permissions.flatMap((permission)=> permission.action)));
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-xl font-bold">Acme CMS</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {NAV_ITEMS.map((item) => {
          // 🔒 SECURITY: Hide item if user lacks permission
          // if (user && !user.permissions.includes(item.permission)) return null;

          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar}
            alt="User"
            className="h-9 w-9 rounded-full bg-gray-200"
          />
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="truncate text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <button onClick={logout} className="text-gray-500 hover:text-red-600">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}