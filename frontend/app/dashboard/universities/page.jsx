"use client";

import AnimatedCard from "@/components/dashboard/AnimatedCard";
import UniversitiesTabsContent from "@/components/dashboard/univesities-TabsContent";
import React from "react";
export default function ProfilePage() {
  const circleVariants = {
    initial: { scale: 1, x: -16, y: -16 },
    hover: { scale: 1.4, x: -10, y: -10 },
  };

  return (
    <main className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <section className="pt-6 px-6">
          <AnimatedCard
            title={"انتخاب ساده دانشگاه"}
            subtitle={
              "به سادگی دانشگاه مورد علاقتو تو کشور مورد علاقت انتخاب کن"
            }
            gradientFrom="#4e6f6f"
            gradientTo="#7AADA0"
            circleVariants={circleVariants}
            className="text-white"
          >
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Safety Schools</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">Target Schools</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span className="text-sm">Reach Schools</span>
              </div>
            </div>
          </AnimatedCard>
        </section>
        <section className="flex">
          <div className="justify-items-center py-4 w-full ">
            <UniversitiesTabsContent />
          </div>
        </section>
      </div>
    </main>
  );
}
