"use client";

import * as React from "react";
import Image from "next/image";
import { TicketPercent, Copy, Check } from "lucide-react";
import { Promotion } from "@/types/menu.types";
import { toast } from "sonner";

interface WeekendPromotionProps {
  promotion: Promotion;
}

export function WeekendPromotion({ promotion }: WeekendPromotionProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(promotion.couponCode);
      setCopied(true);
      toast.success(`Coupon code ${promotion.couponCode} copied!`, {
        description: "Apply at checkout for 20% off all pizzas & burgers.",
        duration: 3000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy code to clipboard.");
    }
  };

  return (
    <section className="w-full bg-white pb-10 sm:pb-14 pt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#FF5A0A] via-[#FF6A18] to-[#FF8438] text-white shadow-lg flex flex-col md:flex-row items-center justify-between min-h-[110px] sm:min-h-[120px]">
          {/* Subtle background glow/patterns */}
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 right-40 w-48 h-48 bg-black/10 rounded-full blur-xl pointer-events-none" />

          {/* LEFT SECTION: Icon + Discount Heading */}
          <div className="p-4 sm:p-6 lg:p-7 flex items-center gap-3 sm:gap-4 z-10 w-full md:w-auto">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-inner">
              <TicketPercent className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-white/90 block">
                {promotion.title}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-none">
                  {promotion.discount}
                </span>
                <span className="text-xs sm:text-sm font-medium text-white/95">
                  {promotion.description}
                </span>
              </div>
            </div>
          </div>

          {/* MIDDLE SECTION: Coupon Code Pill & Copy Button */}
          <div className="px-4 pb-4 md:pb-0 md:px-4 z-10 flex flex-col items-start md:items-center justify-center gap-1 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/90 font-medium">
                Use Code:
              </span>
              <button
                onClick={handleCopyCode}
                className="group inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/40 active:scale-95 px-3 py-1.5 rounded-lg backdrop-blur-md text-xs sm:text-sm font-bold tracking-wider text-white transition-all shadow-sm"
                aria-label="Copy coupon code"
              >
                <span>{promotion.couponCode}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-white/80 group-hover:text-white transition-colors" />
                )}
              </button>
            </div>
            <span className="text-[10px] sm:text-[11px] text-white/80 font-normal">
              {promotion.validity}
            </span>
          </div>

          {/* RIGHT SECTION: Pizza Photography */}
          <div className="relative w-full md:w-72 lg:w-80 h-28 sm:h-32 md:h-full min-h-[110px] sm:min-h-[120px] flex-shrink-0 overflow-hidden">
            <Image
              src={promotion.bannerImageUrl}
              alt="Weekend Pizza Special"
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover object-center md:object-right"
            />
            {/* Soft gradient blend for seamless transition on the left of the image */}
            <div className="hidden md:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#FF6A18] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

