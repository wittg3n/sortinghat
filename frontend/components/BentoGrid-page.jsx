"use client";

import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Meteors } from "@/components/magicui/meteors";
import { Marquee } from "@/components/magicui/marquee";
import { AnimatedBeamDemo } from "@/components/magicui/animated-beam-demo";
import { AnimatedListDemo } from "@/components/magicui/animated-list-demo";

// Fake files list for marquee
const files = [
  { name: "doc1.pdf", body: "Document content preview here..." },
  { name: "logo.svg", body: "Scalable Vector Graphics info..." },
  { name: "keys.gpg", body: "Security keys description..." },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    background: (
      <Marquee pauseOnHover className="absolute inset-0 [--duration:20s]">
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
          >
            <figcaption className="text-sm font-medium dark:text-white">
              {f.name}
            </figcaption>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-3",
    background: (
      <AnimatedListDemo className="absolute inset-0 scale-90 transition-all duration-300 group-hover:scale-95" />
    ),
  },
  {
    Icon: Share2Icon,
    name: "Integrations",
    description: "Supports 100+ integrations and counting.",
    href: "#",
    cta: "Learn more",
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-5",
    background: (
      <AnimatedBeamDemo className="absolute inset-0 scale-90 transition-all duration-300 group-hover:scale-105" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Filter your files by date.",
    href: "#",
    cta: "Learn more",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-5",
    background: (
      <Calendar
        mode="single"
        selected={new Date()}
        className="absolute inset-0 origin-top scale-90 rounded-md border transition-all duration-300 group-hover:scale-95"
      />
    ),
  },
  // 🌌 Meteor card in the CENTER
  {
    Icon: FileTextIcon,
    name: "Meteor Effect",
    description: "Cosmic animation in the center grid.",
    href: "#",
    cta: "Learn more",
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-5",
    background: (
      <div className="absolute inset-0 flex items-center justify-center  rounded-xl overflow-hidden">
        <Meteors number={40} className="scale-125 opacity-90" />
        <div className="z-10 text-center">
          <p className="text-white font-bold text-lg">🌌 Meteor Show</p>
          <p className="text-gray-300 text-sm">Center of attention</p>
        </div>
      </div>
    ),
  },
];

export function BentoCostume() {
  return (
    <BentoGrid className="lg:grid-cols-3 lg:grid-rows-3">
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
