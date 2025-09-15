"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4 w-full", className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground flex w-full items-center justify-between rounded-xl p-[3px] shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground " +
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring " +
          "dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/100 " +
          "text-foreground dark:text-muted-foreground flex-1 inline-flex items-center justify-center " +
          "gap-1.5 rounded-lg border border-transparent px-4 py-2 text-sm font-medium " +
          "whitespace-nowrap transition-all duration-300 focus-visible:ring-[3px] " +
          "focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 " +
          "data-[state=active]:shadow-md [&_svg]:pointer-events-none [&_svg]:shrink-0 " +
          "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      dir="rtl"
      data-slot="tabs-content"
      className={cn("flex-1 outline-none w-full", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
