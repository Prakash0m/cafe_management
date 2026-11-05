"use client";

import * as React from "react";
import Image from "next/image";
import { Sparkles, Clock, Flame, CheckCircle2 } from "lucide-react";
import { ASSETS } from "@/lib/assets";

export function OffersHero() {
  // Live Countdown state for weekend promotion timer
  const [timeLeft, setTimeLeft] = React.useState({
    hours: 7,
    minutes: 42,
    seconds: 15,
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => String(num).padStart(2, "0");

  return (
    <section className="relative w-full bg-[#27160F] overflow-hidden border-b border-gray-900/40">
      {/* Background radial gradient glow for warm cafe ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,90,10,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(255,140,50,0.08),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 lg:gap-8">
          {/* Left Text Column */}
          <div className="md:col-span-7 lg:col-span-7 z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/15 text-[#FF8438] text-[11px] font-bold uppercase tracking-wider mb-2.5">
              <Flame className="w-3.5 h-3.5 text-[#FF5A0A]" />
              <span>Exclusive Vouchers & Daily Deals</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-white leading-tight">
              Special Offers & <span className="text-[#FF5A0A] italic font-serif">Deals</span>
            </h1>

            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-gray-300/90 max-w-xl font-normal leading-relaxed">
              Taste more for less! Enjoy handpicked promo codes, weekend specials, and student combo passes with instant 1-click cart activation.
            </p>

            {/* Countdown Badge & Value Guarantees */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-3 justify-center md:justify-start">
              <div className="inline-flex items-center gap-2 bg-black/45 border border-white/15 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-inner">
                <span className="w-2 h-2 rounded-full bg-[#FF5A0A] animate-ping" />
                <span className="text-[11px] font-bold text-orange-200 uppercase tracking-wider">
                  Weekend Flash Deal:
                </span>
                <span className="font-mono text-xs font-black text-white bg-white/10 px-2 py-0.5 rounded">
                  {formatDigit(timeLeft.hours)}h : {formatDigit(timeLeft.minutes)}m : {formatDigit(timeLeft.seconds)}s
                </span>
              </div>

              <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Up to 30% Off</span>
              </span>

              <span className="inline-flex items-center gap-1 text-xs text-gray-300 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>1-Click Cart Apply</span>
              </span>
            </div>
          </div>

          {/* Right Showcase Column (Gourmet Meal Showcase with Cheese/Burger Pull & Fun Doodles) */}
          <div className="md:col-span-5 lg:col-span-5 relative flex items-center justify-center md:justify-end">
            {/* Playful Orange Doodle Rays above the showcase card */}
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

            {/* Showcase Image Card */}
            <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-none h-44 sm:h-52 md:h-56 lg:h-60 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
              <Image
                src={ASSETS.promotions.offersBanner}
                alt="Delicious gourmet cafe meal combo with burgers, fries and drinks"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

              {/* Floating Discount Pill */}
              <div className="absolute bottom-3 left-3 bg-gradient-to-r from-[#FF5A0A] to-[#E04E07] text-white px-3 py-1 rounded-xl text-xs font-black shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SAVE UP TO 30%</span>
              </div>
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
