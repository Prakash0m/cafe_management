"use client";

import * as React from "react";
import { Users, Star, Utensils, Coffee, Sparkles, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatItem {
  id: string;
  target: number;
  decimals?: number;
  suffix: string;
  label: string;
  subtext: string;
  theme: "green" | "yellow";
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
    theme: "yellow",
    icon: Star,
  },
  {
    id: "recipes",
    target: 48,
    suffix: "+",
    label: "Artisan Recipes",
    subtext: "Pizzas, burgers, momos & treats",
    theme: "yellow",
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

// Smooth Animated Counter component with ease-out cubic animation
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
    const duration = 1800; // 1.8 seconds smooth roll

    // Ease-out cubic for a fast start and smooth deceleration
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
  const [triggerKey, setTriggerKey] = React.useState(0);

  const handleRerun = () => {
    setTriggerKey((k) => k + 1);
  };

  return (
    <section className="relative py-12 sm:py-16 bg-[#160B06] text-white overflow-hidden select-none border-y border-white/5">
      {/* Ambient Yellow & Green Colored Backlights */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-yellow-500/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Subtle Header with Rerun trigger */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-400">
              Verified Cafe Milestones
            </span>
            <span className="text-white/30">•</span>
            <span className="text-[11px] sm:text-xs font-semibold text-yellow-300">
              Updated Daily
            </span>
          </div>

          <button
            type="button"
            onClick={handleRerun}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-lg cursor-pointer"
            title="Re-run numbers counter"
          >
            <RefreshCw className="w-3 h-3 text-yellow-400 transition-transform active:rotate-180" />
            <span>Replay Numbers</span>
          </button>
        </div>

        {/* 4 Cards Grid with vibrant Yellow & Green accents (2x2 on mobile, 4 in a row on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {STATS_DATA.map((stat) => {
            const Icon = stat.icon;
            const isGreen = stat.theme === "green";

            return (
              <div
                key={stat.id}
                onClick={handleRerun}
                onMouseEnter={handleRerun}
                className={cn(
                  "relative rounded-2xl sm:rounded-3xl p-4 sm:p-7 border backdrop-blur-md flex flex-col items-center text-center transition-all duration-300 group cursor-pointer sm:cursor-default shadow-lg",
                  isGreen
                    ? "bg-gradient-to-b from-[#1C281F]/90 via-[#161F18]/90 to-[#121A14]/90 border-emerald-500/30 hover:border-emerald-400/60 hover:shadow-emerald-500/15"
                    : "bg-gradient-to-b from-[#282312]/90 via-[#211C0E]/90 to-[#17140A]/90 border-yellow-500/30 hover:border-yellow-400/60 hover:shadow-yellow-500/15"
                )}
              >
                {/* Glow ring */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none blur-xl -z-10",
                    isGreen ? "bg-emerald-500/20" : "bg-yellow-500/20"
                  )}
                />

                {/* Top Colored Icon Box */}
                <div
                  className={cn(
                    "w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2.5 sm:mb-4 border shadow-inner transition-transform duration-300 group-hover:scale-110",
                    isGreen
                      ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300 shadow-emerald-500/20"
                      : "bg-yellow-500/20 border-yellow-400/40 text-yellow-300 shadow-yellow-500/20"
                  )}
                >
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.2]" />
                </div>

                {/* Big Running Animated Number */}
                <div
                  className={cn(
                    "text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none font-mono drop-shadow-md",
                    isGreen
                      ? "text-transparent bg-clip-text bg-gradient-to-b from-emerald-200 via-emerald-300 to-green-400"
                      : "text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-amber-300 to-yellow-400"
                  )}
                >
                  <RunningNumber
                    target={stat.target}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                    triggerKey={triggerKey}
                  />
                </div>

                {/* Label in Vibrant Yellow or Green */}
                <span
                  className={cn(
                    "text-[11px] sm:text-sm font-extrabold mt-2 sm:mt-2.5 tracking-wide",
                    isGreen ? "text-emerald-300" : "text-yellow-300"
                  )}
                >
                  {stat.label}
                </span>

                {/* Subtext */}
                <span className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5 sm:mt-1 font-medium line-clamp-1 sm:line-clamp-none">
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
