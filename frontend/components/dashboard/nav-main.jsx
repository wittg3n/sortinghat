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
        ? "text-white font-bold animation-duration-initial transition-all delay-100"
        : "text-gray-400 hover:text-gray-200 "
    }`}
                >
                  {item.icon && (
                    <item.icon
                      strokeWidth={active ? 4 : 2}
                      className={
                        active
                          ? "text-white animation-duration-initial transition-all delay-100"
                          : "text-gray-400 group-hover:text-gray-200 animation-duration-initial transition-all delay-100"
                      }
                    />
                  )}
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
