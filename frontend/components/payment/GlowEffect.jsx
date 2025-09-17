// ---------------- GlowEffect.jsx ----------------
"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function GlowEffect({
  className,
  style,
  colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F"],
  mode = "rotate",
  blur = "medium",
  transition,
  scale = 1,
  duration = 5,
}) {
  const BASE_TRANSITION = { repeat: Infinity, duration, ease: "linear" };

  const animations = {
    rotate: {
      background: [
        `conic-gradient(from 0deg at 50% 50%, ${colors.join(", ")})`,
        `conic-gradient(from 360deg at 50% 50%, ${colors.join(", ")})`,
      ],
      transition: transition ?? BASE_TRANSITION,
    },
    static: { background: `linear-gradient(to right, ${colors.join(", ")})` },
  };

  const blurMap = {
    softest: "blur-sm",
    soft: "blur",
    medium: "blur-md",
    strong: "blur-lg",
    stronger: "blur-xl",
    strongest: "blur-2xl",
    none: "blur-none",
  };

  const blurClass =
    typeof blur === "number" ? `blur-[${blur}px]` : blurMap[blur];

  return (
    <motion.div
      style={{ ...style, "--scale": scale, willChange: "transform" }}
      animate={animations[mode]}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full scale-[var(--scale)] transform-gpu",
        blurClass,
        className
      )}
    />
  );
}
