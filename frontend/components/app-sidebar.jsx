"use client";

import * as React from "react";
import {
  IconDashboard,
  IconUser,
  IconFileDescription,
  IconSchool,
  IconBrain,
  IconFolder,
  IconMail,
  IconBell,
  IconSettings,
  IconHelp,
} from "@tabler/icons-react";
import { Logo } from "@/components/logo";
import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
  user: {
    name: "علی رضایی",
    email: "ali@example.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    { title: "مدیریت", url: "/dashboard/management", icon: IconDashboard },
    { title: "پروفایل من", url: "/dashboard/profile", icon: IconUser },
    { title: "مدارک", url: "/dashboard/docs", icon: IconFileDescription },
    {
      title: "انتخاب دانشگاه",
      url: "/dashboard/universities",
      icon: IconSchool,
    },
    { title: "درخواست‌ها", url: "/dashboard/requests", icon: IconFolder },
  ],
  navSecondary: [
    { title: "تنظیمات", url: "/dashboard/settings", icon: IconSettings },
    { title: "راهنما / پشتیبانی", url: "/dashboard/help", icon: IconHelp },
  ],
  documents: [],
};

const getData = () => {};
export function AppSidebar({ ...props }) {
  return (
    <Sidebar
      collapsible="offcanvas"
      side="right" // 👈 سایدبار در سمت راست
      className="text-right"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 flex-row-reverse justify-end gap-2"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <span className="text-base font-semibold">سورتینگ‌هت</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="text-right">
        <NavMain items={data.navMain} />
        {data.documents.length > 0 && (
          <Link
            href={data.navMain.url}
            className="px-4 py-2 text-sm font-medium"
          >
            <NavDocuments items={data.documents} className={"cursor-pointer"} />
          </Link>
        )}
        <NavSecondary
          items={data.navSecondary}
          className="mt-auto cursor-pointer"
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
