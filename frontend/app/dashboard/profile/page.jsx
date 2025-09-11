"use client";
import React from "react";
import { UserIcon } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function ProfilePage() {
  // اشتراک وضعیت کاربر از استور
  const user = useUserStore((state) => state.user);

  const profileCompletion = user?.profile_completion ?? 0;
  const circleVariants = {
    initial: { scale: 1, x: -16, y: -16 },
    hover: { scale: 1.4, x: -10, y: -10 },
  };

  return (
    <main style={{ padding: "2rem" }}>
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-magenta-700 rounded-2xl p-8 text-white relative overflow-hidden"
        initial="initial"
        whileHover="hover" // حالا فرزندها روی هاور واکنش نشان می‌دهند
      >
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/10"
          variants={circleVariants} // به هاور والد واکنش نشان می‌دهد
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <UserIcon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {user?.full_name || "پروفایل خود را تکمیل کنید"}
              </h1>
              <p className="text-purple-100">
                {user?.email || "student@example.com"}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm font-medium">درصد تکمیل پروفایل:</span>
                <Progress
                  value={profileCompletion}
                  className="w-32 h-2 bg-white/20"
                />
                <span className="text-sm font-bold">{profileCompletion}%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
