"use client";

import * as React from "react";
import { Check } from "lucide-react";

export function OrderSuccessHero() {
  return (
    <div className="text-center pt-2 sm:pt-4 pb-2">
      {/* Celebration Checkmark with Radiating Confetti Bursts */}
      <div className="relative inline-flex items-center justify-center mb-4 sm:mb-5">
        {/* Celebration burst rays matching Stitch design */}
        <div className="absolute inset-0 pointer-events-none -m-5">
          {/* Top-Left Ray (Orange) */}
          <span className="absolute top-2 left-3 w-4 h-1 bg-[#F97316] rounded-full -rotate-45 transform" />
          {/* Top Ray (Coral/Red) */}
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3.5 bg-[#EF4444] rounded-full" />
          {/* Top-Right Ray (Orange) */}
          <span className="absolute top-2 right-3 w-4 h-1 bg-[#F97316] rounded-full rotate-45 transform" />
          {/* Bottom-Left Ray (Yellow) */}
          <span className="absolute bottom-2 left-3.5 w-3.5 h-1 bg-[#EAB308] rounded-full rotate-45 transform" />
          {/* Bottom-Center Ray (Orange dot) */}
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-2 bg-[#F97316] rounded-full" />
          {/* Bottom-Right Ray (Red) */}
          <span className="absolute bottom-2 right-3.5 w-3.5 h-1 bg-[#EF4444] rounded-full -rotate-45 transform" />
        </div>

        {/* Central Vibrant Green Circle with Crisp White Checkmark */}
        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#22C55E] text-white flex items-center justify-center shadow-lg shadow-green-500/25 relative z-10 animate-in zoom-in-75 duration-300">
          <Check className="w-9 h-9 stroke-[3.5]" />
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-gray-900 tracking-tight leading-tight">
        Order Placed <span className="text-[#16A34A]">Successfully!</span>
      </h1>

      {/* Reassuring Subtitle */}
      <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-2 leading-relaxed font-normal">
        Thank you for your order. We&apos;re preparing your food and will update you shortly.
      </p>
    </div>
  );
}
