"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Coffee, Heart, Award, Users } from "lucide-react";
import { ASSETS } from "@/lib/assets";

export function AboutHero() {
  const highlights = [
    { label: "Founded in 2021", icon: Sparkles },
    { label: "100% Himalayan Arabica", icon: Coffee },
    { label: "Artisan Wood-Fired Oven", icon: Award },
    { label: "15,000+ Happy Guests", icon: Users },
  ];

  return (
    <section className="relative w-full min-h-[380px] sm:min-h-[400px] lg:h-[420px] bg-[#1E110A] overflow-hidden flex items-center select-none">
      {/* Background Photography with Smooth Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <Image
          src={ASSETS.hero.slides[4]} // Rich dining feast & cafe atmosphere
          alt="Beans & Bites Cafe Story"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_right] sm:object-center brightness-[0.88]"
        />
        {/* Cinematic Gradient Overlays for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#180C07]/95 via-[#180C07]/80 to-transparent sm:w-2/3" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-10 flex flex-col justify-between h-full min-h-[380px] sm:min-h-[400px] lg:h-[420px]">
        {/* Dynamic Text Content */}
        <div className="max-w-xl space-y-3 sm:space-y-4 pt-2 sm:pt-4">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-[#FF7A24] uppercase">
            <Heart className="w-3.5 h-3.5 text-[#FF5A0A] fill-[#FF5A0A]" />
            <span>Our Story & Culinary Passion</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.12] text-white">
            Crafting Memories, <br />
            <span className="text-[#FF5A0A]">One Brew & Bite at a Time</span>
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-200/90 leading-relaxed max-w-md font-normal">
            Born out of a deep love for Himalayan specialty coffee and artisan comfort food,
            Beans & Bites is your neighborhood haven where genuine hospitality meets culinary excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] active:bg-[#C94304] text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all shadow-md active:scale-95 group"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/60 bg-black/20 hover:bg-white/10 active:bg-white/20 text-white text-xs sm:text-sm font-medium px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl backdrop-blur-sm transition-all"
            >
              <span>Visit Us</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Brand Highlights Strip */}
        <div className="pt-6 sm:pt-4 pb-2 border-t border-white/10 mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="w-full flex items-center justify-start flex-wrap gap-x-6 sm:gap-x-8 gap-y-2 text-white/95">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-white/90"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF7A24] flex-shrink-0" />
                  <span className="whitespace-nowrap">{h.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

