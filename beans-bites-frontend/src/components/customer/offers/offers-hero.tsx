"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { HeroBenefits } from "@/components/customer/home/hero-benefits";
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
  primaryButtonText: string;
  secondaryButtonText: string;
}

const OFFER_SLIDES: OfferSlide[] = [
  {
    id: "offer-slide-1",
    image: ASSETS.hero.slides[0], // Gourmet burger & crispy fries
    badge: "WEEKEND SPECIAL • 20% OFF",
    headingLine1: "Special Offers &",
    headingLine2: "Culinary Discounts",
    description:
      "Fresh ingredients. Great taste. Enjoy flat 20% off all artisan pizzas & burgers with code WEEKEND20.",
    couponCode: "WEEKEND20",
    primaryButtonText: "Apply Code WEEKEND20",
    secondaryButtonText: "View All Deals",
  },
  {
    id: "offer-slide-2",
    image: ASSETS.hero.slides[1], // Wood-fired pizza cheese pull
    badge: "AUTHENTIC ITALIAN • WOOD-FIRED",
    headingLine1: "Wood-Fired Pizza",
    headingLine2: "Weekend Feast",
    description:
      "Crispy stone-baked crust, rich marinara sauce, melted mozzarella and aromatic fresh basil.",
    couponCode: "WEEKEND20",
    primaryButtonText: "Order Pizza (20% Off)",
    secondaryButtonText: "Explore Pizzas",
  },
  {
    id: "offer-slide-3",
    image: ASSETS.hero.slides[3], // Specialty coffee & chocolate brownie
    badge: "HAPPY HOUR • 3 PM – 6 PM",
    headingLine1: "Artisan Coffee",
    headingLine2: "& Sweet Bites",
    description:
      "Masterfully poured latte art, rich single-origin espresso and decadent chocolate brownies at 30% off.",
    couponCode: "HAPPYHOUR",
    primaryButtonText: "Apply Code HAPPYHOUR",
    secondaryButtonText: "View Beverages",
  },
  {
    id: "offer-slide-4",
    image: ASSETS.hero.slides[2], // Steamed Mo:Mo
    badge: "HIMALAYAN FLAVORS • FRESHLY STEAMED",
    headingLine1: "Steamed Mo:Mo",
    headingLine2: "Combo Platter",
    description:
      "Authentic handmade dumplings served with our chef's spicy tomato and sesame dipping sauce at 25% off.",
    couponCode: "MOMO25",
    primaryButtonText: "Apply Code MOMO25",
    secondaryButtonText: "View Mo:Mo Deals",
  },
  {
    id: "offer-slide-5",
    image: ASSETS.hero.slides[4], // Grand feast banquet
    badge: "FAMILY & FRIENDS • GROUP SHARING",
    headingLine1: "Grand Feast",
    headingLine2: "Save 30% Off",
    description:
      "Flat 30% discount on large family feasts above NPR 2,000. Perfect for birthdays and celebrations.",
    couponCode: "FAMILY30",
    primaryButtonText: "Apply Code FAMILY30",
    secondaryButtonText: "Explore Menu",
  },
];

export function OffersHero() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const { applyCoupon } = useCartStore();

  // Clean, realistic live countdown timer
  const [timeLeft, setTimeLeft] = React.useState({
    hours: 7,
    minutes: 41,
    seconds: 41,
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => String(num).padStart(2, "0");

  // Auto-play carousel every 5 seconds (paused when user hovers)
  React.useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % OFFER_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide(
      (prev) => (prev - 1 + OFFER_SLIDES.length) % OFFER_SLIDES.length
    );
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % OFFER_SLIDES.length);
  };

  // Touch Swipe Handling for Native-feel mobile swiping
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setIsPaused(false);
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

  return (
    <div className="w-full">
      {/* ========================================================
          MOBILE VIEW (< sm): App Banner Card with Dedicated 16:9 
          Food Image Showcase (Zero Cropping, Fully Visible, Bright)
          ======================================================== */}
      <section
        className="sm:hidden relative w-full bg-[#180C07] overflow-hidden select-none touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-label="Mobile Offers Carousel"
      >
        {/* 1. Mobile Food Image Showcase - 16:9 Aspect Ratio with Smooth Crossfade */}
        <div className="relative w-full aspect-[16/9] max-h-56 bg-black overflow-hidden">
          {OFFER_SLIDES.map((slide, index) => {
            const isCurrent = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  isCurrent ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
                }`}
                aria-hidden={!isCurrent}
              >
                <Image
                  src={slide.image}
                  alt={slide.headingLine1}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center brightness-[1.03] contrast-[1.04]"
                />
                {/* Subtle vignette gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#180C07] via-transparent to-black/30" />
              </div>
            );
          })}

          {/* Floating Category Badge with Live Countdown (Top-Left of Image) */}
          <div className="absolute top-2.5 left-3 z-20">
            <span className="inline-flex items-center gap-1.5 bg-[#140A05]/90 border border-orange-500/50 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[10px] font-semibold shadow-md">
              <Clock className="w-3 h-3 text-[#FF5A0A]" />
              <span>
                Ends in{" "}
                <strong className="text-white font-mono font-bold">
                  {formatDigit(timeLeft.hours)}:{formatDigit(timeLeft.minutes)}:{formatDigit(timeLeft.seconds)}
                </strong>
              </span>
            </span>
          </div>

          {/* Floating Deal Badge (Bottom-Left of Image) */}
          <div className="absolute bottom-2.5 left-3 z-20">
            <span className="inline-block bg-[#FF5A0A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
              {active.badge}
            </span>
          </div>

          {/* Image Counter Badge (Bottom-Right of Image) */}
          <div className="absolute bottom-2.5 right-3 z-20 bg-black/60 backdrop-blur-sm text-white/90 text-[10px] font-semibold px-2 py-0.5 rounded-full">
            {currentSlide + 1} / {OFFER_SLIDES.length}
          </div>
        </div>

        {/* 2. Mobile Content Card (Title, Description, Buttons, Dots) */}
        <div className="px-4 pt-3 pb-3 space-y-2.5 bg-[#180C07]">
          {/* Main Heading */}
          <h1 className="text-xl font-extrabold tracking-tight leading-snug text-white">
            {active.headingLine1}{" "}
            <span className="text-[#FF5A0A]">{active.headingLine2}</span>
          </h1>

          {/* Description */}
          <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
            {active.description}
          </p>

          {/* Touch-Friendly Action Buttons */}
          <div className="flex items-center gap-2 pt-0.5">
            <button
              onClick={() => handleApplySlideCoupon(active.couponCode)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#FF5A0A] hover:bg-[#E04E07] active:bg-[#C94304] text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>{active.primaryButtonText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleScrollToOffers}
              className="flex-1 inline-flex items-center justify-center border border-white/35 bg-white/5 active:bg-white/15 text-white text-xs font-medium py-2.5 px-3 rounded-xl text-center transition-all cursor-pointer"
            >
              {active.secondaryButtonText}
            </button>
          </div>

          {/* Mobile Pagination Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-1.5 pb-0.5">
            {OFFER_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="p-1 cursor-pointer flex items-center justify-center"
              >
                <span
                  className={`block transition-all duration-300 rounded-full h-1.5 ${
                    idx === currentSlide
                      ? "w-6 bg-[#FF5A0A] shadow-sm shadow-[#FF5A0A]/50"
                      : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          DESKTOP & TABLET VIEW (>= sm): Full-Bleed Stitch Banner
          ======================================================== */}
      <section
        className="hidden sm:flex relative w-full min-h-[400px] lg:h-[420px] bg-[#1E110A] overflow-hidden items-center select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Offers Carousel"
      >
        {/* Background Images with Smooth Crossfade */}
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
                className="object-cover object-center brightness-[0.93] transform scale-100 transition-transform duration-1000 ease-out"
              />
              {/* Cinematic Gradient Overlays for High Legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#180C07]/95 via-[#180C07]/75 to-transparent w-2/3" />
              <div className="absolute inset-0 bg-black/25" />
            </div>
          );
        })}

        {/* Offers Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-8 sm:py-10 flex flex-col justify-between h-full min-h-[400px] lg:h-[420px]">
          {/* Dynamic Text Content */}
          <div className="max-w-xl space-y-4 pt-4 transition-all duration-500">
            {/* Small orange uppercase badge with simple clean timer */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold tracking-[0.18em] text-[#FF7A24] uppercase">
              <span>{active.badge}</span>
              <span className="text-white/30">•</span>
              <span className="inline-flex items-center gap-1.5 text-white/90 normal-case font-medium tracking-normal text-xs">
                <Clock className="w-3.5 h-3.5 text-[#FF5A0A]" />
                <span>
                  Ends in{" "}
                  <strong className="text-white font-mono font-bold">
                    {formatDigit(timeLeft.hours)}h {formatDigit(timeLeft.minutes)}m{" "}
                    {formatDigit(timeLeft.seconds)}s
                  </strong>
                </span>
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.12] text-white">
              {active.headingLine1} <br />
              <span className="text-[#FF5A0A]">{active.headingLine2}</span>
            </h1>

            {/* Description */}
            <p className="text-sm text-gray-200/90 leading-relaxed max-w-md font-normal">
              {active.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => handleApplySlideCoupon(active.couponCode)}
                className="inline-flex items-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] active:bg-[#C94304] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 group cursor-pointer"
              >
                <span>{active.primaryButtonText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleScrollToOffers}
                className="inline-flex items-center justify-center border border-white/60 bg-black/20 hover:bg-white/10 active:bg-white/20 text-white text-sm font-medium px-6 py-3 rounded-xl backdrop-blur-sm transition-all cursor-pointer"
              >
                {active.secondaryButtonText}
              </button>
            </div>
          </div>

          {/* Bottom Bar: Benefits + Carousel 5-Dots */}
          <div className="pt-4 pb-2 border-t border-white/10 mt-auto flex items-center justify-between gap-3">
            <HeroBenefits />

            {/* Carousel Pagination Dots */}
            <div className="flex items-center gap-2 z-20">
              {OFFER_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="p-1.5 cursor-pointer flex items-center justify-center"
                >
                  <span
                    className={`block transition-all duration-300 rounded-full h-2 ${
                      idx === currentSlide
                        ? "w-7 bg-[#FF5A0A] shadow-sm shadow-[#FF5A0A]/50"
                        : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Prev / Next Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-70 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-70 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </section>

      {/* Mobile Benefits Bar - Clean native app trust strip */}
      <div className="sm:hidden bg-[#140A05] border-y border-white/10 px-4 py-2.5">
        <HeroBenefits />
      </div>
    </div>
  );
}
