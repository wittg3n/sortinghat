"use client";
import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

const Circle = forwardRef(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
      className
    )}
  >
    {children}
  </div>
));
Circle.displayName = "Circle";

export function AnimatedBeamDemo({ className }) {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const centerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-[300px] w-full items-center justify-center overflow-hidden p-10",
        className
      )}
    >
      <div className="flex w-full max-w-md items-center justify-between">
        <Circle ref={leftRef}>🔗</Circle>
        <Circle ref={centerRef} className="size-16">
          🤖
        </Circle>
        <Circle ref={rightRef}>⚡</Circle>
      </div>

      {/* Beams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={leftRef}
        toRef={centerRef}
        curvature={-50}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={rightRef}
        toRef={centerRef}
        curvature={50}
        reverse
      />
    </div>
  );
}
