"use client";

import * as React from "react";
import { Users, Star, Utensils, Coffee, Award } from "lucide-react";

export function AboutStats() {
  const stats = [
    {
      value: "15K+",
      label: "Guests Welcomed",
      subtext: "Since our Lakeside opening",
      icon: Users,
    },
    {
      value: "4.9 ★",
      label: "Average Guest Score",
      subtext: "Over 650+ verified reviews",
      icon: Star,
    },
    {
      value: "48+",
      label: "Artisan Recipes",
      subtext: "Pizzas, burgers, momos & treats",
      icon: Utensils,
    },
    {
      value: "100%",
      label: "Himalayan Beans",
      subtext: "Fair-trade estate micro-lots",
      icon: Coffee,
    },
  ];

  return (
    <section className="py-10 bg-gradient-to-r from-[#1C0F08] via-[#2A150B] to-[#1C0F08] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center text-center group hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FF5A0A]/20 text-[#FF7A24] flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-none">
                  {s.value}
                </span>
                <span className="text-xs sm:text-sm font-bold text-orange-200 mt-1">
                  {s.label}
                </span>
                <span className="text-[11px] text-gray-400 mt-0.5">
                  {s.subtext}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
