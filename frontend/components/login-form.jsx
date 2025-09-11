"use client";
import { motion } from "framer-motion";

export default function AnimatedGradientSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className="w-64 h-64"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          {/* Animate the gradient stops */}
          <motion.stop
            offset="0%"
            stopColor="#ff0080"
            animate={{ stopColor: ["#ff0080", "#7928ca", "#2af598"] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <motion.stop
            offset="100%"
            stopColor="#7928ca"
            animate={{ stopColor: ["#7928ca", "#2af598", "#ff0080"] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        </linearGradient>
      </defs>

      {/* Apply gradient to shape */}
      <motion.circle cx="100" cy="100" r="80" fill="url(#grad1)" />
    </svg>
  );
}
