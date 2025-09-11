"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function SectionCard() {
  // تعریف variants برای دایره
  const circleVariants = {
    initial: { scale: 1, x: -16, y: -16 },
    hover: { scale: 1.4, x: -10, y: -10 },
  };

  return (
    <div className="w-full pl-5 pr-5">
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-secondary/80 to-secondary/100 p-8 text-gray-800"
        whileHover="hover" // این باعث می‌شود children که variants دارند هم واکنش نشان دهند
        initial="initial"
      >
        {/* دایره پس‌زمینه */}
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/10"
          variants={circleVariants}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        />

        {/* محتوا */}
        <div className="relative z-10">
          <h1 className="mb-2 text-3xl font-bold">به سورتینگ‌هت خوش آمدید</h1>
          <p className="mb-6 text-blue-100">
            دستیار هوش مصنوعی شما برای اپلای دانشگاه آماده است تا بهترین
            دانشگاه‌ها را به شما پیشنهاد دهد.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/profile">
              <Button className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                تکمیل پروفایل
              </Button>
            </Link>
            <Link href="/universities">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/20"
              >
                مشاهده پیشنهادها
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
