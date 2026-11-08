"use client";

import * as React from "react";
import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import { Sparkles } from "lucide-react";

export function MenuBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#180B06] border-b border-orange-950/40">
      {/* Background Image: Full-bleed fitted background showing the artisan pizza */}
      <div className="absolute inset-0 z-0">
        <Image
          src={ASSETS.menu.bannerPizza}
          alt="Artisan wood-fired pizza"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_right] sm:object-right opacity-65 sm:opacity-75 md:opacity-85 scale-102"
        />

        {/* Cinematic Multi-Layer Gradient Overlays:
            Left side has deep gradient for crystal-clear typography,
            Right side stays open to showcase the delicious pizza & cheese pull */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#180B06] via-[#180B06]/85 to-[#180B06]/20 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#180B06] via-transparent to-[#180B06]/75" />
        {/* Warm cafe amber spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,90,10,0.22),transparent_65%)] pointer-events-none" />
      </div>

      {/* Banner Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        <div className="max-w-xl text-left">
          {/* Subtle Top Pill */}
          <div className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/15 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-white/95 text-[11px] sm:text-xs font-semibold mb-2 sm:mb-2.5 shadow-sm">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF5A0A]" />
            <span>Artisan Kitchen • Fresh & Made to Order</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
            Our Food <span className="text-[#FF5A0A] italic font-serif">Menu</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-gray-200/95 leading-relaxed font-normal drop-shadow max-w-md sm:max-w-lg">
            Explore a wide variety of delicious food, refreshing beverages and delightful desserts.
          </p>
        </div>
      </div>
    </section>
  );
}
