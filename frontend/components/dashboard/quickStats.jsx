"use client";

import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const QuickStats = () => {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>آمار سریع</SidebarGroupLabel>

      {/* Hide content when sidebar is collapsed */}
      <SidebarGroupContent className="group-data-[collapsed=true]:hidden">
        <div className="px-3 py-2 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-gray-100)]">درخواست ها</span>
            <Badge className="px-2 py-0.5 rounded-md bg-[var(--color-teal-100)] text-[var(--color-teal-700)] font-semibold">
              12
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-gray-100)]">میزان موفقیت</span>
            <Badge className="px-2 py-0.5 rounded-md bg-[var(--color-peach-100)] text-[var(--color-peach-700)] font-semibold">
              78%
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--color-gray-100)]">تکمیل پروفایل</span>
            <Badge className="px-2 py-0.5 rounded-md bg-[var(--color-orange-100)] text-[var(--color-orange-700)] font-semibold">
              85%
            </Badge>
          </div>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default QuickStats;
