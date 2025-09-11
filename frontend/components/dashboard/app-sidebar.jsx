"use client";

import * as React from "react";
import { BookOpen, Settings2, UserRound, House } from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarBrand } from "./SidebarBrand";
import QuickStats from "./quickStats";
// Sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "خانه",
      url: "/dashboard",
      icon: House,
    },
    {
      title: "پروفایل",
      url: "/dashboard/profile",
      icon: UserRound,
    },
    {
      title: "دانشگاه ها",
      url: "/dashboard/universities",
      icon: BookOpen,
    },
    {
      title: "تنظیمات",
      url: "/dashboard/settings",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props} side="right" dir="rtl">
      <SidebarBrand />

      <SidebarContent>
        <NavMain items={data.navMain} />
        <QuickStats />
        {/* Quick Stats Section */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
