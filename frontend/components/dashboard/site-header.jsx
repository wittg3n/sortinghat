"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
  MiniCalendarNavigation,
} from "@/components/ui/kibo-ui/mini-calendar";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
export function SiteHeader() {
  const pathname = usePathname();
  var path = "";
  switch (pathname) {
    case "/dashboard":
      path = "خانه";
      break;
    case "/dashboard/profile":
      path = "پروفایل";
      break;
    case "/dashboard/universities":
      path = "دانشگاه ها";
      break;
    case "/dashboard/settings":
      path = "تنظیمات";
      break;
    default:
      console.log("err in sit-header component");
      break;
  }
  console.log(pathname);
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) min-h-20">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 ">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <MiniCalendar className="ml-4 hidden md:block border-0 ">
          <div className="flex items-center gap-4">
            <MiniCalendarNavigation asChild direction="next">
              <Button size="icon" variant="outline">
                <ArrowRightIcon className="size-4" />
              </Button>
            </MiniCalendarNavigation>
            <MiniCalendarDays className="gap-2">
              {(date) => (
                <MiniCalendarDay date={date} key={date.toISOString()} />
              )}
            </MiniCalendarDays>
            <MiniCalendarNavigation asChild direction="prev">
              <Button size="icon" variant="outline">
                <ArrowLeftIcon className="size-4" />
              </Button>
            </MiniCalendarNavigation>
          </div>
        </MiniCalendar>
        <div className="ml-auto flex items-center gap-2"></div>
      </div>
    </header>
  );
}
