"use client";

import * as React from "react";
import Image from "next/image";
import { ASSETS } from "@/lib/assets";

export function MenuBanner() {
  return (
    <section className="relative w-full bg-[#27160F] overflow-hidden border-b border-gray-900/40">
      {/* Background radial gradient glow for warm cafe ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,90,10,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(255,140,50,0.08),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 lg:gap-8">
          {/* Left Text Column */}
          <div className="md:col-span-7 lg:col-span-7 z-10 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white leading-tight">
              Our Food <span className="text-[#FF5A0A] italic font-serif">Menu</span>
            </h1>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-gray-300/90 max-w-xl font-normal leading-relaxed">
              Explore a wide variety of delicious food, refreshing beverages and delightful desserts.
            </p>
          </div>

          {/* Right Showcase Column (Pizza with Cheese Pull & Fun Doodles) */}
          <div className="md:col-span-5 lg:col-span-5 relative flex items-center justify-center md:justify-end">
            {/* Playful Orange Doodle Rays above the pizza */}
            <div className="absolute -top-3 left-1/4 md:left-8 z-20 pointer-events-none text-[#FF5A0A] flex gap-1.5 items-center">
              <svg
                width="34"
                height="24"
                viewBox="0 0 34 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform -rotate-12 opacity-90 drop-shadow-sm"
              >
                <path
                  d="M4 18L10 6"
                  stroke="#FF5A0A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M17 19L17 3"
                  stroke="#FF5A0A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M30 18L24 6"
                  stroke="#FF5A0A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Pizza Image Card */}
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-none h-44 sm:h-52 md:h-56 lg:h-60 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
              <Image
                src={ASSETS.menu.bannerPizza}
                alt="Delicious wood-fired pizza with cheese pull"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Playful Right Doodle Rays */}
            <div className="hidden lg:block absolute -top-1 -right-2 z-20 pointer-events-none text-[#FF5A0A]">
              <svg
                width="32"
                height="24"
                viewBox="0 0 32 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform rotate-12 opacity-90"
              >
                <path
                  d="M5 16L11 6"
                  stroke="#FF5A0A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M16 18L16 3"
                  stroke="#FF5A0A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M27 16L21 6"
                  stroke="#FF5A0A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

