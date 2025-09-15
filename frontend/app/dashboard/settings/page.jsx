import React from "react";
import AnimatedCard from "@/components/dashboard/AnimatedCard";

export default function Settings() {
  const circleVariants = {
    initial: { scale: 1, x: -16, y: -16 },
    hover: { scale: 1.4, x: -10, y: -10 },
  };
  return (
    <main className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <section className="pt-6 px-6">
          <AnimatedCard
            title={"تنظیمات"}
            subtitle={
              "به سادگی دانشگاه مورد علاقتو تو کشور مورد علاقت انتخاب کن"
            }
            gradientFrom="#283048"
            gradientTo="#455256"
            circleVariants={circleVariants}
            className="text-white"
          ></AnimatedCard>
        </section>
      </div>
    </main>
  );
}
