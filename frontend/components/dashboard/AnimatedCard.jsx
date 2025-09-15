"use client";

import { motion } from "framer-motion";
import React from "react";

export default function AnimatedCard({
  title,
  subtitle,
  icon,
  gradientFrom,
  gradientTo,
  circleVariants,
  children,
  className = "",
}) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl p-8  ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
      }}
      initial="initial"
      whileHover="hover"
    >
      {/* Animated circle */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/10"
        variants={circleVariants}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-6">
          {icon && (
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            {subtitle && <p className="text-white/70">{subtitle}</p>}
          </div>
        </div>

        {children && <div className="mt-4">{children}</div>}
      </div>
    </motion.div>
  );
}
