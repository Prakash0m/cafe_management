"use client";

import * as React from "react";
import { Clock, Flame, ArrowRight, Check } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface DealCountdownProps {
  variant?: "hero" | "banner" | "card";
  dealTitle?: string;
  couponCode?: string;
  className?: string;
}

export function DealCountdown({
  variant = "hero",
  dealTitle = "Weekend Pizza & Burger Feast (20% OFF)",
  couponCode = "WEEKEND20",
  className,
}: DealCountdownProps) {
  const { applyCoupon, appliedCoupon } = useCartStore();

  // Shared realistic countdown timer (e.g. 7h 41m 49s)
  const [timeLeft, setTimeLeft] = React.useState({
    hours: 7,
    minutes: 41,
    seconds: 49,
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
  const isApplied = appliedCoupon?.code === couponCode;

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    const res = applyCoupon(couponCode);
    if (res.success) {
      toast.success(`Coupon ${couponCode} Activated!`, {
        description: res.message,
        action: {
          label: "View Cart",
          onClick: () => {
            window.location.href = "/cart";
          },
        },
      });
    } else {
      toast.error("Could not activate coupon", { description: res.message });
    }
  };

  // 1. HERO VARIANT: Sleek glassmorphism box for Hero Section
  if (variant === "hero") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2.5 sm:gap-3.5 bg-gradient-to-r from-black/85 via-black/75 to-black/70 border border-[#FF5A0A]/50 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl shadow-xl transition-all",
          className
        )}
      >
        <div className="flex items-center gap-2 text-white">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-[#FF5A0A] to-[#E04E07] text-white flex items-center justify-center shadow-md flex-shrink-0 animate-pulse">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          </div>
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-[9.5px] sm:text-[10px] font-black tracking-wider uppercase text-orange-300">
                Deal Ending Soon
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-white/95 truncate max-w-[160px] sm:max-w-[200px]">
              {dealTitle}
            </span>
          </div>
        </div>

        {/* High Contrast Digits */}
        <div className="flex items-center gap-1 font-mono pl-2 sm:pl-3 border-l border-white/20">
          <div className="bg-[#FF5A0A]/20 border border-[#FF5A0A]/40 px-1.5 py-0.5 rounded-md text-center min-w-[28px]">
            <span className="text-xs sm:text-sm font-black text-white block leading-none">
              {formatDigit(timeLeft.hours)}
            </span>
            <span className="text-[7.5px] font-sans font-bold text-orange-200 block uppercase -mt-0.5">
              HRS
            </span>
          </div>
          <span className="text-xs font-black text-[#FF5A0A]">:</span>
          <div className="bg-[#FF5A0A]/20 border border-[#FF5A0A]/40 px-1.5 py-0.5 rounded-md text-center min-w-[28px]">
            <span className="text-xs sm:text-sm font-black text-white block leading-none">
              {formatDigit(timeLeft.minutes)}
            </span>
            <span className="text-[7.5px] font-sans font-bold text-orange-200 block uppercase -mt-0.5">
              MIN
            </span>
          </div>
          <span className="text-xs font-black text-[#FF5A0A]">:</span>
          <div className="bg-gradient-to-br from-[#FF5A0A] to-[#E04E07] px-1.5 py-0.5 rounded-md text-center min-w-[28px] shadow-sm">
            <span className="text-xs sm:text-sm font-black text-white block leading-none">
              {formatDigit(timeLeft.seconds)}
            </span>
            <span className="text-[7.5px] font-sans font-bold text-white/95 block uppercase -mt-0.5">
              SEC
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 2. BANNER VARIANT: Full-width live announcement strip for page
  if (variant === "banner") {
    return (
      <div
        className={cn(
          "bg-gradient-to-r from-[#1C0F08] via-[#2D160C] to-[#1C0F08] text-white rounded-2xl p-3.5 sm:p-4 border border-[#FF5A0A]/35 shadow-lg flex flex-col md:flex-row items-center justify-between gap-3.5",
          className
        )}
      >
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5A0A] to-[#E04E07] flex items-center justify-center text-white flex-shrink-0 shadow-md">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider animate-pulse">
                LIVE DEAL
              </span>
              <span className="text-xs sm:text-sm font-bold text-white">
                {dealTitle}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-300 mt-0.5">
              Use promo code{" "}
              <strong className="text-[#FF7A24] font-mono font-bold tracking-wider">
                {couponCode}
              </strong>{" "}
              at checkout before the countdown timer expires.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Live Countdown Digits */}
          <div className="flex items-center gap-1 font-mono">
            <span className="text-[11px] text-orange-200 font-sans font-bold mr-1 hidden sm:inline">
              Ends In:
            </span>
            <div className="bg-black/60 border border-white/20 px-2 py-1 rounded-lg text-center min-w-[32px]">
              <span className="text-xs sm:text-sm font-black text-white">
                {formatDigit(timeLeft.hours)}h
              </span>
            </div>
            <span className="text-[#FF5A0A] font-bold">:</span>
            <div className="bg-black/60 border border-white/20 px-2 py-1 rounded-lg text-center min-w-[32px]">
              <span className="text-xs sm:text-sm font-black text-white">
                {formatDigit(timeLeft.minutes)}m
              </span>
            </div>
            <span className="text-[#FF5A0A] font-bold">:</span>
            <div className="bg-[#FF5A0A] px-2 py-1 rounded-lg text-center min-w-[32px] shadow-sm">
              <span className="text-xs sm:text-sm font-black text-white">
                {formatDigit(timeLeft.seconds)}s
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleApply}
            className="bg-[#FF5A0A] hover:bg-[#E04E07] active:bg-[#C94304] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md active:scale-95 flex-shrink-0 flex items-center gap-1.5"
          >
            {isApplied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Code Active</span>
              </>
            ) : (
              <>
                <span>Claim Deal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // 3. CARD VARIANT: Compact timer badge for offer cards
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-200/80 text-[#FF5A0A] text-[11px] font-bold",
        className
      )}
    >
      <Clock className="w-3.5 h-3.5 text-[#FF5A0A] animate-pulse flex-shrink-0" />
      <span>
        Ends in:{" "}
        <strong className="font-mono text-gray-900 font-extrabold">
          {formatDigit(timeLeft.hours)}:{formatDigit(timeLeft.minutes)}:
          {formatDigit(timeLeft.seconds)}
        </strong>
      </span>
    </div>
  );
}
