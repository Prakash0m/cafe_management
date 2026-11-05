"use client";

import * as React from "react";
import Image from "next/image";
import { Sparkles, Clock, Flame, TicketPercent, CheckCircle2 } from "lucide-react";
import { ASSETS } from "@/lib/assets";

export function OffersHero() {
  // Live Countdown state for weekend promotion timer (counts down 7h 45m 20s)
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
    <section className="relative w-full bg-[#1F140E] text-white overflow-hidden py-12 sm:py-16">
      {/* Ambient background glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FF5A0A]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Background pizza/food imagery watermark */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 opacity-15 pointer-events-none overflow-hidden">
        <Image
          src={ASSETS.hero.food}
          alt="Artisan Cafe Food"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F140E] via-[#1F140E]/80 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-3xl space-y-4">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#FF8438] text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#FF5A0A]" />
            <span>Exclusive Restaurant Vouchers & Daily Deals</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Special Offers & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A0A] via-[#FF8438] to-amber-300">
              Culinary Discounts
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
            Taste more for less! Enjoy handpicked promo codes, weekend specials,
            and student combo passes. Apply vouchers instantly to your cart with a single click.
          </p>

          {/* Live Flash Sale Countdown Banner */}
          <div className="pt-2 sm:pt-4">
            <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3 bg-gradient-to-r from-[#FF5A0A]/25 via-orange-900/40 to-black/40 border border-[#FF5A0A]/40 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2 text-white">
                <span className="w-8 h-8 rounded-xl bg-[#FF5A0A] text-white flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider block text-orange-200">
                    Flash Deal Countdown
                  </span>
                  <span className="text-xs text-white/90">
                    Weekend 20% Discount Ends In:
                  </span>
                </div>
              </div>

              {/* Digits Stepper */}
              <div className="flex items-center gap-1.5 self-start sm:self-center font-mono">
                <div className="bg-black/60 border border-white/20 px-2 py-1 rounded-lg text-sm sm:text-base font-black text-white min-w-[34px] text-center">
                  {formatDigit(timeLeft.hours)}
                  <span className="text-[9px] block text-gray-400 font-sans -mt-1 font-semibold">
                    HRS
                  </span>
                </div>
                <span className="text-base font-bold text-[#FF5A0A]">:</span>
                <div className="bg-black/60 border border-white/20 px-2 py-1 rounded-lg text-sm sm:text-base font-black text-white min-w-[34px] text-center">
                  {formatDigit(timeLeft.minutes)}
                  <span className="text-[9px] block text-gray-400 font-sans -mt-1 font-semibold">
                    MIN
                  </span>
                </div>
                <span className="text-base font-bold text-[#FF5A0A]">:</span>
                <div className="bg-black/60 border border-white/20 px-2 py-1 rounded-lg text-sm sm:text-base font-black text-[#FF5A0A] min-w-[34px] text-center">
                  {formatDigit(timeLeft.seconds)}
                  <span className="text-[9px] block text-gray-400 font-sans -mt-1 font-semibold">
                    SEC
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick value badges */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-gray-300">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Up to 30% Savings</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant 1-Click Cart Apply</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Dine-In, Takeaway & Delivery</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
