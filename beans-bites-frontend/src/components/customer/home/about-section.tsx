"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Coffee, Flame, Leaf, ArrowRight, Heart } from "lucide-react";
import { ASSETS } from "@/lib/assets";

export function AboutSection() {
  const highlights = [
    {
      title: "100% Himalayan Arabica",
      description: "Ethically sourced shade-grown beans roasted weekly in Kathmandu.",
      icon: Coffee,
    },
    {
      title: "Wood-Fired Stone Oven",
      description: "48-hour slow fermented sourdough pizzas baked at 450°C.",
      icon: Flame,
    },
    {
      title: "Fresh Farm Ingredients",
      description: "Crisp organic produce and pure dairy from local Himalayan cooperatives.",
      icon: Leaf,
    },
  ];

  return (
    <section className="py-14 sm:py-18 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: Dual Image Grid with Badge */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-md">
                <Image
                  src={ASSETS.hero.slides[1]}
                  alt="Stone baked pizza"
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden shadow-md mt-6 sm:mt-8">
                <Image
                  src={ASSETS.hero.slides[3]}
                  alt="Artisan latte coffee"
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-4 left-6 sm:left-10 bg-white border border-orange-100 rounded-2xl p-3.5 sm:p-4 shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF8F3] text-[#FF5A0A] flex items-center justify-center font-black text-lg">
                4.9
              </div>
              <div>
                <span className="text-xs font-bold text-gray-900 block leading-tight">
                  Guest Satisfaction
                </span>
                <span className="text-[11px] text-gray-500">
                  Over 650+ 5-star reviews
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Story Text & Value Propositions */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#FF5A0A] text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 fill-[#FF5A0A]" />
              <span>Our Culinary Journey</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              Where Exceptional Taste <br />
              <span className="text-[#FF5A0A]">Meets Genuine Warmth</span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              At Beans & Bites, we believe that great dining is born from genuine care.
              From slow-fermenting our Neapolitan pizza dough to roasting high-altitude
              Himalayan coffee cherries, every detail is crafted to give you moments of joy and comfort.
            </p>

            {/* 3 Highlights */}
            <div className="space-y-3.5 pt-2">
              {highlights.map((h, i) => {
                const Icon = h.icon;
                return (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#FF5A0A] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                        {h.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        {h.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Link to /about */}
            <div className="pt-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg shadow-orange-500/20 transition-all group"
              >
                <span>Discover Our Full Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

