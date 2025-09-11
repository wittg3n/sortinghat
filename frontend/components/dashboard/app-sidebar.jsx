"use client";

import * as React from "react";
import { useEffect } from "react";
import { BookOpen, Settings2, GraduationCap, House } from "lucide-react";
import { useUserStore } from "@/store/userStore";

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

const navMainData = [
  { title: "خانه", url: "/dashboard", icon: House },
  { title: "پروفایل دانشجویی", url: "/dashboard/profile", icon: GraduationCap },
  { title: "دانشگاه ها", url: "/dashboard/universities", icon: BookOpen },
  { title: "تنظیمات", url: "/dashboard/settings", icon: Settings2 },
];

export function AppSidebar({ token, ...props }) {
  // subscribe to user state from Zustand
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data); // store user in Zustand
          console.log("this is data from sidebar", data);
        } else {
          console.warn("Failed to fetch user profile, status:", res.status);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUser();
  }, [token, setUser]);

  return (
    <Sidebar collapsible="icon" {...props} side="right" dir="rtl">
      <SidebarBrand />

      <SidebarContent>
        <NavMain items={navMainData} />
        <QuickStats />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={
            user || {
              name: "shadcn",
              email: "m@example.com",
              avatar: "/avatars/shadcn.jpg",
            }
          }
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
