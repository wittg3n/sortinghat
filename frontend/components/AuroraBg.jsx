"use client";
import { motion } from "framer-motion";

export function AuroraBg({ children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-900 overflow-hidden">
      {/* animated aurora layers */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-50%] bg-[radial-gradient(circle_at_20%_80%,#6366f1_0%,transparent_50%)] opacity-30"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-50%] bg-[radial-gradient(circle_at_80%_20%,#8b5cf6_0%,transparent_50%)] opacity-30"
      />

      {/* content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
