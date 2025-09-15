"use client";
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";

const notifications = Array.from({ length: 6 }).flatMap(() => [
  {
    name: "Payment received",
    description: "Magic UI",
    time: "15m ago",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "User signed up",
    description: "Magic UI",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "New message",
    description: "Magic UI",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "New event",
    description: "Magic UI",
    time: "2m ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
]);

function Notification({ name, description, icon, color, time }) {
  return (
    <figure
      className={cn(
        "relative w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 transition-all duration-200 hover:scale-[103%]",
        "bg-white shadow-sm dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-sm font-medium dark:text-white">
            <span>{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm text-gray-600 dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
}

export function AnimatedListDemo({ className }) {
  return (
    <div
      className={cn(
        "relative flex h-[300px] w-full flex-col overflow-hidden p-2",
        className
      )}
    >
      <AnimatedList>
        {notifications.map((n, i) => (
          <Notification key={i} {...n} />
        ))}
      </AnimatedList>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background" />
    </div>
  );
}
