import { LayoutDashboard, Users, FileText, Settings } from "lucide-react";

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    permission: "view_dashboard", // Required permission
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
    permission: "manage_users",
  },
  {
    title: "Content",
    href: "/content",
    icon: FileText,
    permission: "manage_content",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    permission: "view_settings",
  },
];