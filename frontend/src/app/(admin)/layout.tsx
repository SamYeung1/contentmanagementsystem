"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  // Protect the (admin) route
  useEffect(() => {
    const storedUser = localStorage.getItem("cms_user");
    if (!storedUser && !user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null; // Avoid flash of content

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}