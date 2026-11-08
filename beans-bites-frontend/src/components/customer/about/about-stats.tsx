"use client";

import * as React from "react";
import { Users, Star, Utensils, Coffee, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  id: string;
  target: number;
  decimals?: number;
  suffix: string;
  label: string;
  subtext: string;
  theme: "green" | "orange" | "red";
  icon: React.ComponentType<{ className?: string }>;
}

const STATS_DATA: StatItem[] = [
  {
    id: "guests",
    target: 15,
    suffix: "K+",
    label: "Guests Welcomed",
    subtext: "Since our Lakeside opening",
    theme: "green",
    icon: Users,
  },
  {
    id: "rating",
    target: 4.9,
    decimals: 1,
    suffix: " ★",
    label: "Average Guest Score",
    subtext: "Over 650+ verified reviews",
    theme: "orange",
    icon: Star,
  },
  {
    id: "recipes",
    target: 48,
    suffix: "+",
    label: "Artisan Recipes",
    subtext: "Pizzas, burgers, momos & treats",
    theme: "red",
    icon: Utensils,
  },
  {
    id: "coffee",
    target: 100,
    suffix: "%",
    label: "Himalayan Beans",
    subtext: "Fair-trade estate micro-lots",
    theme: "green",
    icon: Coffee,
  },
];

// Smooth Animated Counter component with ease-out cubic deceleration
function RunningNumber({
  target,
  decimals = 0,
  suffix = "",
  triggerKey,
}: {
  target: number;
  decimals?: number;
  suffix?: string;
  triggerKey: number;
}) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;
    const duration = 1500; // 1.5 seconds smooth count-up

    // Ease-out cubic: rapid responsive start and smooth finish
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = easeOutCubic(progress);
      setValue(eased * target);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, triggerKey]);

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

export function AboutStats() {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const [triggerKey, setTriggerKey] = React.useState(0);

  // Trigger smooth count-up on initial load and whenever user scrolls section into view
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTriggerKey((k) => k + 1);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleRerun = () => {
    setTriggerKey((k) => k + 1);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-6 sm:py-8 lg:py-10 bg-white text-gray-900 overflow-hidden select-none border-y border-stone-200/60"
    >
      {/* Subtle Warm Amber, Emerald & Rose Ambient Highlights */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-emerald-100/35 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-orange-100/35 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-rose-100/25 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header with Milestones Badge & Replay Trigger */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 sm:mb-5 pb-2.5 border-b border-gray-100">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 text-[10.5px] sm:text-xs font-bold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Cafe Milestones
            </span>
            <span className="text-gray-300 hidden sm:inline">•</span>
            <span className="inline-flex items-center px-2 py-0.5 sm:py-1 rounded-full bg-orange-50 border border-orange-200/70 text-[#FF5A0A] text-[10.5px] sm:text-xs font-semibold">
              Updated Daily
            </span>
          </div>

          <button
            type="button"
            onClick={handleRerun}
            className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors bg-gray-50 hover:bg-gray-100 border border-gray-200/80 px-2.5 py-1 rounded-lg cursor-pointer shadow-2xs active:scale-95 group"
            title="Replay count animation"
          >
            <RefreshCw className="w-3 h-3 text-[#FF5A0A] transition-transform duration-300 group-hover:rotate-180" />
            <span>Replay Numbers</span>
          </button>
        </div>

        {/* 4 Cards Grid (2x2 on mobile, 4 in a row on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
          {STATS_DATA.map((stat) => {
            const Icon = stat.icon;

            const themeStyles = {
              green: {
                cardBorder: "border-emerald-100/90 hover:border-emerald-300",
                cardHoverShadow: "hover:shadow-[0_8px_24px_rgba(16,185,129,0.10)]",
                cardHoverBg: "hover:bg-emerald-50/20",
                iconBox: "bg-emerald-50 border-emerald-200/80 text-emerald-600 shadow-emerald-500/10",
                number: "text-emerald-600",
              },
              orange: {
                cardBorder: "border-orange-100/90 hover:border-orange-300",
                cardHoverShadow: "hover:shadow-[0_8px_24px_rgba(255,90,10,0.10)]",
                cardHoverBg: "hover:bg-orange-50/20",
                iconBox: "bg-orange-50 border-orange-200/80 text-[#FF5A0A] shadow-orange-500/10",
                number: "text-[#FF5A0A]",
              },
              red: {
                cardBorder: "border-red-100/90 hover:border-red-300",
                cardHoverShadow: "hover:shadow-[0_8px_24px_rgba(239,68,68,0.10)]",
                cardHoverBg: "hover:bg-red-50/20",
                iconBox: "bg-red-50 border-red-200/80 text-red-600 shadow-red-500/10",
                number: "text-red-600",
              },
            }[stat.theme];

            return (
              <div
                key={stat.id}
                onClick={handleRerun}
                onMouseEnter={handleRerun}
                className={cn(
                  "relative rounded-2xl p-3.5 sm:p-5 border bg-white flex flex-col items-center text-center transition-all duration-300 group cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:-translate-y-0.5",
                  themeStyles.cardBorder,
                  themeStyles.cardHoverShadow,
                  themeStyles.cardHoverBg
                )}
              >
                {/* Top Colored Icon Box */}
                <div
                  className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-2 sm:mb-2.5 border shadow-2xs transition-transform duration-300 group-hover:scale-105",
                    themeStyles.iconBox
                  )}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
                </div>

                {/* Big Running Animated Number */}
                <div
                  className={cn(
                    "text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight leading-none font-mono",
                    themeStyles.number
                  )}
                >
                  <RunningNumber
                    target={stat.target}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    triggerKey={triggerKey}
                  />
                </div>

                {/* Label */}
                <span className="text-[12.5px] sm:text-[13.5px] font-bold text-gray-900 mt-1.5 sm:mt-2 tracking-tight leading-snug">
                  {stat.label}
                </span>

                {/* Subtext */}
                <span className="text-[10.5px] sm:text-[11.5px] text-gray-500 mt-0.5 font-normal leading-tight line-clamp-1 sm:line-clamp-none">
                  {stat.subtext}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
