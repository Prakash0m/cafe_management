"use client";

import * as React from "react";
import { Check } from "lucide-react";

interface AnimatedOrderSuccessIconProps {
  status?: "placed" | "preparing" | "ready" | "completed" | "cancelled";
  size?: "sm" | "md" | "lg";
  allowReplay?: boolean;
}

export function AnimatedOrderSuccessIcon({
  size = "md",
  allowReplay = true,
}: AnimatedOrderSuccessIconProps) {
  const [isBouncing, setIsBouncing] = React.useState(false);

  const handleReplay = () => {
    if (!allowReplay) return;
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 800);
  };

  const circleDimensions =
    size === "lg"
      ? "w-20 h-20 sm:w-24 sm:h-24"
      : size === "sm"
      ? "w-12 h-12"
      : "w-16 h-16 sm:w-18 sm:h-18";

  const iconDimensions =
    size === "lg"
      ? "w-10 h-10 sm:w-12 sm:h-12"
      : size === "sm"
      ? "w-6 h-6"
      : "w-8 h-8 sm:w-9 sm:h-9";

  return (
    <div
      onClick={handleReplay}
      className={`relative inline-flex items-center justify-center select-none group ${
        allowReplay ? "cursor-pointer" : ""
      }`}
      title={allowReplay ? "Tap to celebrate 🎉" : undefined}
    >
      {/* 1. Subtle Ambient Pulse Ring Wave (Emerald Green) */}
      <span
        className="absolute -inset-2 sm:-inset-2.5 rounded-full bg-[#22C55E]/30 animate-ping opacity-60 pointer-events-none"
        aria-hidden="true"
        style={{ animationDuration: "2.5s" }}
      />

      {/* 2. Celebration Radiating Burst Rays (Exact Match to Stitch Reference Colors) */}
      <div className="absolute inset-0 pointer-events-none -m-5 sm:-m-5.5">
        {/* Top-Left Ray (Orange #F97316) */}
        <span className="absolute top-2 left-2.5 sm:top-2 sm:left-3 w-4 sm:w-4.5 h-1 sm:h-1.5 bg-[#F97316] rounded-full -rotate-45 transform origin-center shadow-xs transition-transform duration-200 group-hover:scale-110" />

        {/* Top Ray (Coral Red #EF4444) */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1 sm:w-1.5 h-3.5 sm:h-4 bg-[#EF4444] rounded-full origin-bottom shadow-xs transition-transform duration-200 group-hover:scale-110" />

        {/* Top-Right Ray (Orange #F97316) */}
        <span className="absolute top-2 right-2.5 sm:top-2 sm:right-3 w-4 sm:w-4.5 h-1 sm:h-1.5 bg-[#F97316] rounded-full rotate-45 transform origin-center shadow-xs transition-transform duration-200 group-hover:scale-110" />

        {/* Bottom-Left Ray (Golden Yellow #EAB308) */}
        <span className="absolute bottom-2 left-2.5 sm:bottom-2 sm:left-3.5 w-3.5 sm:w-4 h-1 sm:h-1.5 bg-[#EAB308] rounded-full rotate-45 transform origin-center shadow-xs transition-transform duration-200 group-hover:scale-110" />

        {/* Bottom-Center Ray (Orange dot #F97316) */}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 sm:w-2 h-2 sm:h-2.5 bg-[#F97316] rounded-full origin-top shadow-xs transition-transform duration-200 group-hover:scale-110" />

        {/* Bottom-Right Ray (Red #EF4444) */}
        <span className="absolute bottom-2 right-2.5 sm:bottom-2 sm:right-3.5 w-3.5 sm:w-4 h-1 sm:h-1.5 bg-[#EF4444] rounded-full -rotate-45 transform origin-center shadow-xs transition-transform duration-200 group-hover:scale-110" />
      </div>

      {/* 3. Central Solid Vibrant Emerald Green Circle with White Checkmark */}
      <div
        className={`${circleDimensions} rounded-full bg-[#22C55E] text-white flex items-center justify-center shadow-lg shadow-green-500/30 relative z-10 transition-transform duration-300 ${
          isBouncing ? "scale-110" : "group-hover:scale-105 active:scale-95"
        }`}
      >
        <Check className={`${iconDimensions} stroke-[3.5] text-white drop-shadow-xs`} />
      </div>

      {/* 4. Subtle Shimmer Sparkle Accent Floating Top-Right */}
      <div className="absolute -top-3 -right-2 text-amber-500 pointer-events-none transition-transform duration-300 group-hover:scale-125">
        <span className="text-xs">✨</span>
      </div>
    </div>
  );
}
