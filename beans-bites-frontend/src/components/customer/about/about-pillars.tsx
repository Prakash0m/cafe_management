"use client";

import * as React from "react";
import { Coffee, Flame, Leaf, HeartHandshake } from "lucide-react";

export function AboutPillars() {
  const pillars = [
    {
      id: "coffee",
      title: "Himalayan Single-Origin",
      tagline: "High-Altitude Arabica",
      description:
        "Harvested from shade-grown micro-lots in Nuwakot and Gulmi. Small-batch roasted weekly to unleash complex tasting notes of dark chocolate, honey, and citrus.",
      icon: Coffee,
      highlight: "100% Nepali Beans",
    },
    {
      id: "pizza",
      title: "Wood-Fired Neapolitan",
      tagline: "48-Hour Fermented Dough",
      description:
        "Every pizza crust undergoes a slow 48-hour cold fermentation before baking at 450°C in our stone oven, creating signature leopard-spotted, airy edges.",
      icon: Flame,
      highlight: "Artisan Stone Oven",
    },
    {
      id: "farm",
      title: "Farm-to-Fork Sourcing",
      tagline: "Organic & Fresh Daily",
      description:
        "We partner with local organic farmers for seasonal vegetables, free-range eggs, and pure dairy. No artificial preservatives or frozen pre-mixes.",
      icon: Leaf,
      highlight: "Locally Sourced",
    },
    {
      id: "community",
      title: "A Home for Everyone",
      tagline: "Warm Ambience & Fiber Wi-Fi",
      description:
        "Whether you're finishing remote work, diving into a favorite book, or celebrating over momos with friends, our doors and cozy booths are always welcoming.",
      icon: HeartHandshake,
      highlight: "Community Hub",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#FF5A0A] bg-orange-50 border border-orange-100 px-3 py-1 rounded-full">
            Our Culinary Pillars
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            What Sets Beans & Bites Apart
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            We believe that extraordinary dining isn't about shortcuts; it's about
            honoring the craft, respecting the ingredients, and treating every guest like family.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group bg-[#FBF7F4] hover:bg-white rounded-3xl p-6 sm:p-7 border border-orange-100/80 hover:border-orange-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(255,90,10,0.08)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-[#FF5A0A] text-[#FF5A0A] group-hover:text-white flex items-center justify-center shadow-sm transition-colors duration-300">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-white/80 px-2.5 py-1 rounded-lg border border-gray-100">
                      {pillar.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#FF5A0A] transition-colors">
                    {pillar.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#FF5A0A] block mb-2">
                    {pillar.tagline}
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

