"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSidebar, SidebarHeader } from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";

export function SidebarBrand() {
  const { state } = useSidebar();
  const isOpen = state === "expanded";

  return (
    <SidebarHeader className="mb-4 px-4 flex items-center gap-2">
      <Link href="/" aria-label="home">
        <motion.div
          initial={false}
          animate={{ scale: isOpen ? 1 : 0.85 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Logo className="h-8 w-8" />
        </motion.div>
      </Link>
      <motion.span
        className="font-bold text-lg origin-left"
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          width: isOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.25 }}
      >
        سورتینگ هت
      </motion.span>
    </SidebarHeader>
  );
}
