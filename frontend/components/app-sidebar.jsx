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

const data = {
  user: {
    name: "علی رضایی",
    email: "ali@example.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    { title: "مدیریت", url: "#", icon: IconDashboard },
    { title: "پروفایل من", url: "#", icon: IconUser },
    { title: "مدارک", url: "#", icon: IconFileDescription },
    { title: "انتخاب دانشگاه", url: "#", icon: IconSchool },
    { title: "پیشنهادات AI", url: "#", icon: IconBrain },
    { title: "درخواست‌ها", url: "#", icon: IconFolder },
    { title: "ایمیل‌ها", url: "#", icon: IconMail },
    { title: "نوتیفیکیشن‌ها", url: "#", icon: IconBell },
  ],
  navSecondary: [
    { title: "تنظیمات", url: "#", icon: IconSettings },
    { title: "راهنما / پشتیبانی", url: "#", icon: IconHelp },
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
              <a href="#">
                <span className="text-base font-semibold">سورتینگ‌هت</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="text-right">
        <NavMain items={data.navMain} />
        {data.documents.length > 0 && (
          <NavDocuments items={data.documents} className={"cursor-pointer"} />
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
