import { LayoutDashboard, Users, FileText, Settings } from "lucide-react";

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/(admin)",
    icon: LayoutDashboard,
    permission: "view_dashboard", // Required permission
  },
  {
    title: "Users",
    href: "/(admin)/users",
    icon: Users,
    permission: "manage_users",
  },
  {
    title: "Content",
    href: "/(admin)/content",
    icon: FileText,
    permission: "manage_content",
  },
  {
    title: "Settings",
    href: "/(admin)/settings",
    icon: Settings,
    permission: "view_settings",
  },
];