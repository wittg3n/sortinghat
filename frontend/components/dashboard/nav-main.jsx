"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  const pathname = usePathname();

  const isActive = (url) => pathname === url;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>مسیرها</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const active = isActive(item.url);
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.url}
                  className={`flex items-center gap-2 px-2 py-1 rounded
    ${
      active
        ? "bg-orange-400 text-gray-900 pointer-events-none"
        : "text-gray-100 hover:bg-gray-700"
    }`}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
