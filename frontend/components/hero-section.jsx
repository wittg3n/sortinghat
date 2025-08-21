import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { HeroHeader } from "./header";

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring", bounce: 0.3, duration: 1.5 },
    },
  },
};

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <section>
          <div className="relative pt-24 md:pt-36 text-center">
            {/* لینک معرفی */}
            <AnimatedGroup variants={transitionVariants}>
              <Link
                href="#features"
                className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
              >
                <span className="text-foreground text-sm">
                  معرفی قابلیت‌های هوش مصنوعی
                </span>
                <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>
                <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                  <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                    <span className="flex size-6">
                      <ArrowRight className="m-auto size-3" />
                    </span>
                    <span className="flex size-6">
                      <ArrowRight className="m-auto size-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedGroup>

            {/* تیتر اصلی */}
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h1"
              className="mt-8 text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]"
            >
              SortingHat، ابزار هوشمند مرتب‌سازی شما
            </TextEffect>

            {/* توضیح کوتاه */}
            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.5}
              as="p"
              className="mx-auto mt-8 max-w-2xl text-balance text-lg "
            >
              با SortingHat، داده‌ها و محتواهای خود را به آسانی دسته‌بندی کنید،
              کارآمدتر عمل کنید و تجربه‌ای مدرن و حرفه‌ای برای تیم و کاربران خود
              ایجاد کنید.
            </TextEffect>

            {/* دکمه‌ها */}
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.75 },
                  },
                },
                ...transitionVariants,
              }}
              className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
            >
              <div
                key={1}
                className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
              >
                <Button asChild size="lg" className="rounded-xl px-5 text-base">
                  <Link href="#get-started">
                    <span className="text-nowrap">شروع به کار</span>
                  </Link>
                </Button>
              </div>
              <Button
                key={2}
                asChild
                size="lg"
                variant="ghost"
                className="h-10.5 rounded-xl px-5"
              >
                <Link href="#request-demo">
                  <span className="text-nowrap">درخواست دموی رایگان</span>
                </Link>
              </Button>
            </AnimatedGroup>

            {/* تصویر اپ */}
            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
              <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                <Image
                  className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                  src="/mail2.png"
                  alt="صفحه اپلیکیشن"
                  width="2700"
                  height="1440"
                />
                <Image
                  className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden"
                  src="/mail2-light.png"
                  alt="صفحه اپلیکیشن"
                  width="2700"
                  height="1440"
                />
              </div>
            </div>
          </div>
        </section>

        {/* بخش مشتریان */}
        <section className="bg-background pb-16 pt-16 md:pb-32">
          <div className="group relative m-auto max-w-5xl px-6">
            <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
              <Link
                href="/"
                className="block text-sm duration-150 hover:opacity-75"
              >
                <span>مشتریان ما</span>
                <ChevronRight className="ml-1 inline-block size-3" />
              </Link>
            </div>
            <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
              {/* لوگو مشتریان */}
              <div className="flex">
                <img
                  className="mx-auto h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/nvidia.svg"
                  alt="لوگوی Nvidia"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/column.svg"
                  alt="لوگوی Column"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-4 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/github.svg"
                  alt="لوگوی GitHub"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-5 w-fit dark:invert"
                  src="https://html.tailus.io/blocks/customers/nike.svg"
                  alt="لوگوی Nike"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
