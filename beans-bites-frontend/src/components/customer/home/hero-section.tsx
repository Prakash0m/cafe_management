"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { HeroBenefits } from "./hero-benefits";

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
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Auto-play carousel every 5 seconds (paused when hovered)
  React.useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
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
    <section
      className="relative w-full min-h-[380px] sm:min-h-[400px] lg:h-[420px] bg-[#1E110A] overflow-hidden flex items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Carousel"
    >
      {/* 4 Background Images with Smooth Crossfade */}
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
              className="object-cover object-[center_right] sm:object-center brightness-[0.93] transform scale-100 transition-transform duration-1000 ease-out"
            />
            {/* Cinematic Gradient Overlays for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#180C07]/95 via-[#180C07]/75 to-transparent sm:w-2/3" />
            <div className="absolute inset-0 bg-black/25" />
          </div>
        );
      })}

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-10 flex flex-col justify-between h-full min-h-[380px] sm:min-h-[400px] lg:h-[420px]">
        {/* Dynamic Text Content with smooth transition */}
        <div className="max-w-xl space-y-3 sm:space-y-4 pt-2 sm:pt-4 transition-all duration-500">
          {/* Small orange uppercase badge */}
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-[#FF7A24] uppercase">
            <span>{active.badge}</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.12] text-white">
            {active.headingLine1} <br />
            <span className="text-[#FF5A0A]">{active.headingLine2}</span>
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-200/90 leading-relaxed max-w-md font-normal">
            {active.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            <button
              onClick={handleScrollToPopular}
              className="inline-flex items-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] active:bg-[#C94304] text-white text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all shadow-md active:scale-95 group cursor-pointer"
            >
              <span>{active.primaryButtonText}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <Link
              href={active.secondaryButtonHref}
              className="inline-flex items-center justify-center border border-white/60 bg-black/20 hover:bg-white/10 active:bg-white/20 text-white text-xs sm:text-sm font-medium px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl backdrop-blur-sm transition-all"
            >
              {active.secondaryButtonText}
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Benefits + Carousel 4-Dots */}
        <div className="pt-6 sm:pt-4 pb-2 border-t border-white/10 mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <HeroBenefits />

          {/* Carousel Pagination Dots */}
          <div className="flex items-center gap-2 z-20 self-center sm:self-auto">
            {HERO_SLIDES.map((slide, idx) => (
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
