"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  TicketPercent,
  Check,
  CheckCircle2,
  Percent,
  ShieldCheck,
  Utensils,
} from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { useCartStore } from "@/store/cart.store";
import { toast } from "sonner";

interface OfferSlide {
  id: string;
  image: string;
  badge: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  couponCode: string;
  discountBadge: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

const OFFER_SLIDES: OfferSlide[] = [
  {
    id: "offer-slide-1",
    image: ASSETS.hero.slides[0], // Gourmet burger & crispy fries
    badge: "WEEKEND SPECIAL • 20% OFF PIZZAS & BURGERS",
    headingLine1: "Special Offers &",
    headingLine2: "Culinary Discounts",
    description:
      "Taste more for less! Enjoy flat 20% off all artisan pizzas & burgers, plus daily happy hour treats and student passes.",
    couponCode: "WEEKEND20",
    discountBadge: "20% OFF",
    primaryButtonText: "Apply Code WEEKEND20",
    secondaryButtonText: "View All Deals",
  },
  {
    id: "offer-slide-2",
    image: ASSETS.hero.slides[1], // Wood-fired pizza cheese pull
    badge: "AUTHENTIC ITALIAN • WOOD-FIRED SPECIAL",
    headingLine1: "Wood-Fired Pizza",
    headingLine2: "Weekend Feast",
    description:
      "Crispy stone-baked crust, rich marinara sauce, melted mozzarella and aromatic basil with instant 20% savings.",
    couponCode: "WEEKEND20",
    discountBadge: "20% OFF",
    primaryButtonText: "Order Pizza (20% Off)",
    secondaryButtonText: "Explore Pizzas",
  },
  {
    id: "offer-slide-3",
    image: ASSETS.hero.slides[3], // Specialty coffee & chocolate brownie
    badge: "HAPPY HOUR DEALS • DAILY 3 PM - 6 PM",
    headingLine1: "Artisan Coffee",
    headingLine2: "& Dessert Rush",
    description:
      "Recharge your afternoon with 30% off all espresso drinks, iced brews, and chocolate brownies (3:00 PM – 6:00 PM).",
    couponCode: "HAPPYHOUR",
    discountBadge: "30% OFF",
    primaryButtonText: "Apply Code HAPPYHOUR",
    secondaryButtonText: "View Beverages",
  },
  {
    id: "offer-slide-4",
    image: ASSETS.hero.slides[2], // Steamed Mo:Mo
    badge: "KATHMANDU SPECIAL • COMBO FEAST",
    headingLine1: "Himalayan Mo:Mo",
    headingLine2: "Platter Combo",
    description:
      "25% off authentic steamed, fried and kothey momos paired with refreshing iced lattes and fresh lemon sodas.",
    couponCode: "MOMO25",
    discountBadge: "25% OFF",
    primaryButtonText: "Apply Code MOMO25",
    secondaryButtonText: "View Mo:Mo Deals",
  },
  {
    id: "offer-slide-5",
    image: ASSETS.hero.slides[4], // Grand food feast banquet
    badge: "FAMILY & FRIENDS • GROUP SHARING",
    headingLine1: "Grand Feast",
    headingLine2: "Save 30% Off",
    description:
      "Flat 30% discount on family orders above NPR 2,000. Perfect for birthdays, office lunches, and celebrations.",
    couponCode: "FAMILY30",
    discountBadge: "30% OFF",
    primaryButtonText: "Apply Code FAMILY30",
    secondaryButtonText: "Explore Menu",
  },
];

const OFFER_PERKS = [
  { id: "p1", label: "Up to 30% Savings", icon: Percent },
  { id: "p2", label: "Instant 1-Click Cart Apply", icon: TicketPercent },
  { id: "p3", label: "Valid Dine-In & Takeaway", icon: Utensils },
  { id: "p4", label: "Valid Across All Outlets", icon: ShieldCheck },
];

export function OffersHero() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const { applyCoupon, appliedCoupon } = useCartStore();

  // Live countdown timer for the flash deal
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

  // Auto-play carousel every 5 seconds (paused when user hovers)
  React.useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % OFFER_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide(
      (prev) => (prev - 1 + OFFER_SLIDES.length) % OFFER_SLIDES.length
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % OFFER_SLIDES.length);
  };

  const handleApplySlideCoupon = (code: string) => {
    const res = applyCoupon(code);
    if (res.success) {
      toast.success(`Coupon ${code} Activated!`, {
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

  const handleScrollToOffers = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById("offers-grid-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollBy({ top: 350, behavior: "smooth" });
    }
  };

  const active = OFFER_SLIDES[currentSlide];
  const isApplied = appliedCoupon?.code === active.couponCode;

  const formatDigit = (num: number) => String(num).padStart(2, "0");

  return (
    <section
      className="relative w-full min-h-[380px] sm:min-h-[400px] lg:h-[420px] bg-[#1E110A] overflow-hidden flex items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Offers Carousel"
    >
      {/* 5 Background Images with Smooth Crossfade & Auto-rotation */}
      {OFFER_SLIDES.map((slide, index) => {
        const isCurrent = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isCurrent ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden={!isCurrent}
          >
            <Image
              src={slide.image}
              alt={slide.headingLine1}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-[center_right] sm:object-center brightness-[0.93] transform scale-100 transition-transform duration-1000 ease-out"
            />
            {/* Cinematic Gradient Overlays for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#180C07]/95 via-[#180C07]/75 to-transparent sm:w-2/3" />
            <div className="absolute inset-0 bg-black/25" />
          </div>
        );
      })}

      {/* Offers Content Container - Exact same height & responsive constraints as home */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-10 flex flex-col justify-between h-full min-h-[380px] sm:min-h-[400px] lg:h-[420px]">
        {/* Dynamic Text Content with smooth transition */}
        <div className="max-w-xl space-y-2.5 sm:space-y-3 pt-1 sm:pt-2 transition-all duration-500">
          {/* Small orange uppercase badge + Countdown Timer pill */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-[#FF7A24] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#FF7A24]" />
              <span>{active.badge}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/50 border border-white/15 text-[10px] sm:text-[11px] text-white/90 font-mono backdrop-blur-sm">
              <Clock className="w-3 h-3 text-[#FF7A24]" />
              <span>
                Deal Ends:{" "}
                <strong className="text-white">
                  {formatDigit(timeLeft.hours)}h {formatDigit(timeLeft.minutes)}m{" "}
                  {formatDigit(timeLeft.seconds)}s
                </strong>
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.12] text-white">
            {active.headingLine1} <br />
            <span className="text-[#FF5A0A]">{active.headingLine2}</span>
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-200/90 leading-relaxed max-w-md font-normal line-clamp-2">
            {active.description}
          </p>

          {/* CTA Buttons Row */}
          <div className="flex items-center gap-3 sm:gap-4 pt-1">
            <button
              onClick={() => handleApplySlideCoupon(active.couponCode)}
              className="inline-flex items-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] active:bg-[#C94304] text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all shadow-md active:scale-95 group cursor-pointer"
            >
              {isApplied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Code {active.couponCode} Active</span>
                </>
              ) : (
                <>
                  <TicketPercent className="w-4 h-4" />
                  <span>{active.primaryButtonText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            <button
              onClick={handleScrollToOffers}
              className="inline-flex items-center justify-center border border-white/60 bg-black/20 hover:bg-white/10 active:bg-white/20 text-white text-xs sm:text-sm font-medium px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl backdrop-blur-sm transition-all cursor-pointer"
            >
              {active.secondaryButtonText}
            </button>
          </div>
        </div>

        {/* Bottom Bar: Offer Guarantees + Carousel 5-Dots */}
        <div className="pt-4 sm:pt-3 pb-1 border-t border-white/10 mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Guarantees / Perks */}
          <div className="w-full sm:w-auto flex items-center justify-start flex-wrap gap-x-5 sm:gap-x-7 gap-y-1.5 text-white/95">
            {OFFER_PERKS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-white/90"
                >
                  <Icon className="w-3.5 h-3.5 text-white/90 flex-shrink-0" />
                  <span className="whitespace-nowrap">{p.label}</span>
                </div>
              );
            })}
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center gap-2 z-20 self-center sm:self-auto">
            {OFFER_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full h-2 cursor-pointer ${
                  idx === currentSlide
                    ? "w-7 bg-[#FF5A0A] shadow-sm shadow-[#FF5A0A]/50"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Prev / Next Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-70 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-70 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
}
