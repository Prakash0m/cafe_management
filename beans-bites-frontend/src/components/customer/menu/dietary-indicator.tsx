"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DietaryIndicatorProps {
  isVeg?: boolean;
  className?: string;
  size?: "sm" | "md";
}

export function DietaryIndicator({
  isVeg,
  className,
  size = "md",
}: DietaryIndicatorProps) {
  if (isVeg === undefined) return null;

  const boxSize = size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5";
  const dotSize = size === "sm" ? "w-1 h-1" : "w-1.5 h-1.5";

  if (isVeg) {
    return (
      <span
        aria-label="Vegetarian"
        title="Vegetarian"
        className={cn(
          boxSize,
          "inline-flex items-center justify-center border border-emerald-600 bg-white rounded-[3px] p-[1.5px] flex-shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
          className
        )}
      >
        <span className={cn(dotSize, "bg-emerald-600 rounded-full")} />
      </span>
    );
  }

  return (
    <span
      aria-label="Non-Vegetarian"
      title="Non-Vegetarian"
      className={cn(
        boxSize,
        "inline-flex items-center justify-center border border-[#DC2626] bg-white rounded-[3px] p-[1.5px] flex-shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
        className
      )}
    >
      <span className={cn(dotSize, "bg-[#DC2626] rounded-full")} />
    </span>
  );
}
