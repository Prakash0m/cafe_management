"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ChefHat } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { HeroBenefits } from "./hero-benefits";
import { useOrdersStore } from "@/store/orders.store";

interface HeroSlide {
  id: string;
  image: string;
  badge: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  secondaryButtonHref: string;
  mobilePosition?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    image: ASSETS.hero.slides[0],
    badge: "GOURMET BURGERS • CRISPY SIDES",
    headingLine1: "Delicious Food",
    headingLine2: "Every Moment",
    description:
      "Fresh ingredients. Great taste. A perfect place to eat, drink and relax.",
    primaryButtonText: "Order Now",
    secondaryButtonText: "View Menu",
    secondaryButtonHref: "/menu",
    mobilePosition: "object-[40%_center]",
  },
  {
    id: "slide-2",
    image: ASSETS.hero.slides[1],
    badge: "AUTHENTIC ITALIAN • WOOD-FIRED",
    headingLine1: "Wood-Fired Pizza",
    headingLine2: "Hot & Cheesy",
    description:
      "Crispy stone-baked crust, rich marinara sauce, melted mozzarella and aromatic fresh basil.",
    primaryButtonText: "Order Pizza",
    secondaryButtonText: "Explore Pizzas",
    secondaryButtonHref: "/menu?category=pizza",
    mobilePosition: "object-center",
  },
  {
    id: "slide-3",
    image: ASSETS.hero.slides[2],
    badge: "HIMALAYAN FLAVORS • FRESHLY STEAMED",
    headingLine1: "Steamed Mo:Mo",
    headingLine2: "Bursting Flavor",
    description:
      "Authentic handmade dumplings served with our chef's spicy tomato and sesame dipping sauce.",
    primaryButtonText: "Order Mo:Mo",
    secondaryButtonText: "View Specialties",
    secondaryButtonHref: "/menu?category=momo",
    mobilePosition: "object-[46%_center]",
  },
  {
    id: "slide-4",
    image: ASSETS.hero.slides[3],
    badge: "ARTISAN BREWS • SWEET BITES",
    headingLine1: "Specialty Coffee",
    headingLine2: "Sweet Moments",
    description:
      "Masterfully poured latte art, rich single-origin espresso and decadent chocolate brownies.",
    primaryButtonText: "Order Coffee",
    secondaryButtonText: "View Beverages",
    secondaryButtonHref: "/menu?category=beverages",
    mobilePosition: "object-[52%_center]",
  },
  {
    id: "slide-5",
    image: ASSETS.hero.slides[4],
    badge: "OUR SPECIAL SELECTION • CHEF PICKS",
    headingLine1: "Our Food",
    headingLine2: "Menu",
    description:
      "Explore a wide variety of delicious food, refreshing beverages and delightful desserts.",
    primaryButtonText: "Explore Menu",
    secondaryButtonText: "Order Now",
    secondaryButtonHref: "/menu",
    mobilePosition: "object-center",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const { orders } = useOrdersStore();
  const [mounted, setMounted] = React.useState(false);

  // Touch Swipe Handling for Native-feel mobile swiping
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const liveOrder = mounted
    ? orders.find((o) => o.status === "preparing" || o.status === "ready")
    : null;

  // Auto-play carousel every 5 seconds (paused when hovered or touched)
  React.useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

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
      // Swiped Left -> Next Slide
      handleNext();
    } else if (diff < -45) {
      // Swiped Right -> Previous Slide
      handlePrev();
    }
    setIsPaused(false);
  };

  const handleScrollToPopular = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById("popular-items-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/menu";
    }
  };

  const active = HERO_SLIDES[currentSlide];

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
        aria-label="Mobile Featured Carousel"
      >
        {/* 1. Mobile Food Image Showcase - 16:9 Aspect Ratio with Smooth Crossfade */}
        <div className="relative w-full aspect-[16/9] max-h-56 bg-black overflow-hidden">
          {HERO_SLIDES.map((slide, index) => {
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
                {/* Subtle vignette gradients: soft top shadow & bottom blend */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#180C07] via-transparent to-black/30" />
              </div>
            );
          })}

          {/* Active Live Order Floating Tracker Pill (Top-Left of Image) */}
          {liveOrder && (
            <div className="absolute top-2.5 left-3 z-20">
              <Link
                href={`/orders?id=${liveOrder.id}`}
                className="inline-flex items-center gap-1.5 bg-[#140A05]/90 border border-emerald-500/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[10px] font-semibold shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  Order {liveOrder.displayId} is {liveOrder.status === "preparing" ? "cooking 👨‍🍳" : "ready! 🔔"}
                </span>
                <span className="text-[#FF7A24] font-bold flex items-center gap-0.5 ml-0.5">
                  Track <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </Link>
            </div>
          )}

          {/* Floating Category Badge (Bottom-Left of Image) */}
          <div className="absolute bottom-2.5 left-3 z-20">
            <span className="inline-block bg-[#FF5A0A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md">
              {active.badge}
            </span>
          </div>

          {/* Image Counter Badge (Bottom-Right of Image) */}
          <div className="absolute bottom-2.5 right-3 z-20 bg-black/60 backdrop-blur-sm text-white/90 text-[10px] font-semibold px-2 py-0.5 rounded-full">
            {currentSlide + 1} / {HERO_SLIDES.length}
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
              onClick={handleScrollToPopular}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#FF5A0A] hover:bg-[#E04E07] active:bg-[#C94304] text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <span>{active.primaryButtonText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <Link
              href={active.secondaryButtonHref}
              className="flex-1 inline-flex items-center justify-center border border-white/35 bg-white/5 active:bg-white/15 text-white text-xs font-medium py-2.5 px-3 rounded-xl text-center transition-all"
            >
              {active.secondaryButtonText}
            </Link>
          </div>

          {/* Mobile Pagination Dots */}
          <div className="flex items-center justify-center gap-1.5 pt-1.5 pb-0.5">
            {HERO_SLIDES.map((slide, idx) => (
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
        aria-label="Featured Carousel"
      >
        {/* Background Images with Smooth Crossfade */}
        {HERO_SLIDES.map((slide, index) => {
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

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full py-8 sm:py-10 flex flex-col justify-between h-full min-h-[400px] lg:h-[420px]">
          {/* Dynamic Text Content */}
          <div className="max-w-xl space-y-4 pt-4 transition-all duration-500">
            {liveOrder && (
              <div>
                <Link
                  href={`/orders?id=${liveOrder.id}`}
                  className="inline-flex items-center gap-2 bg-[#1A0E08]/90 hover:bg-[#1A0E08] border border-emerald-500/50 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-[11px] font-semibold shadow-lg transition-all group animate-in fade-in slide-in-from-top-2 duration-300"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>
                    Order {liveOrder.displayId} is {liveOrder.status === "preparing" ? "in the kitchen 👨‍🍳" : "ready! 🔔"}
                  </span>
                  <span className="text-[#FF7A24] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Track <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            )}

            {/* Orange uppercase badge */}
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.18em] text-[#FF7A24] uppercase">
              <span>{active.badge}</span>
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
                onClick={handleScrollToPopular}
                className="inline-flex items-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] active:bg-[#C94304] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 group cursor-pointer"
              >
                <span>{active.primaryButtonText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                href={active.secondaryButtonHref}
                className="inline-flex items-center justify-center border border-white/60 bg-black/20 hover:bg-white/10 active:bg-white/20 text-white text-sm font-medium px-6 py-3 rounded-xl backdrop-blur-sm transition-all"
              >
                {active.secondaryButtonText}
              </Link>
            </div>
          </div>

          {/* Bottom Bar: Benefits + Carousel Dots */}
          <div className="pt-4 pb-2 border-t border-white/10 mt-auto flex items-center justify-between gap-3">
            <HeroBenefits />

            {/* Carousel Pagination Dots */}
            <div className="flex items-center gap-2 z-20">
              {HERO_SLIDES.map((slide, idx) => (
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
