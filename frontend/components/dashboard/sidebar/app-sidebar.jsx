"use client";

import * as React from "react";
import { useEffect } from "react";
import { BookOpen, GraduationCap, House } from "lucide-react";
import { useUserStore } from "@/store/userStore";

import { NavMain } from "@/components/dashboard/sidebar/nav-main";
import { NavUser } from "@/components/dashboard/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarBrand } from "../SidebarBrand";
import QuickStats from "../quickStats";

const navMainData = [
  { title: "خانه", url: "/dashboard", icon: House },
  { title: "پروفایل دانشجویی", url: "/dashboard/profile", icon: GraduationCap },
  { title: "دانشگاه ها", url: "/dashboard/universities", icon: BookOpen },
];

export function AppSidebar({ token, ...props }) {
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
          console.log(data);
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
        {/* فقط وقتی user آماده است رندر کن */}
        {user ? (
          <NavUser user={user} />
        ) : (
          <div className="p-4 text-sm text-muted-foreground">
            در حال بارگذاری...
          </div>
        )}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
