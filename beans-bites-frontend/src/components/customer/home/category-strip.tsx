"use client";

import * as React from "react";
import { FoodCategory } from "@/types/menu.types";
import { CategoryItem } from "./category-item";

interface CategoryStripProps {
  categories: FoodCategory[];
  selectedCategory?: string;
  onSelectCategory?: (slug: string) => void;
}

export function CategoryStrip({
  categories,
  selectedCategory = "all",
  onSelectCategory,
}: CategoryStripProps) {
  const [isPaused, setIsPaused] = React.useState(false);
  const pauseTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = () => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2200);
  };

  React.useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  return (
    <section className="w-full bg-white border-b border-gray-100 py-3.5 sm:py-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] select-none relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* DESKTOP VIEW (md and up): Clean, static, justified 10-item row */}
        <div className="hidden md:flex items-center justify-between gap-5 lg:gap-7">
          {categories.map((cat) => (
            <CategoryItem
              key={cat.id}
              category={cat}
              isSelected={selectedCategory === cat.slug}
              onSelect={onSelectCategory}
            />
          ))}
        </div>

        {/* MOBILE VIEW (< md): Continuous Infinite Running Category Marquee ("Running Items") */}
        <div
          className="md:hidden relative w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onPointerDown={handleTouchStart}
          onPointerUp={handleTouchEnd}
        >
          {/* Left Gradient Edge Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />

          {/* Running Track */}
          <div
            className="animate-category-glide flex items-center gap-5 sm:gap-6 py-1"
            style={{
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {/* Set 1: Original Category Items */}
            {categories.map((cat, idx) => (
              <CategoryItem
                key={`cat-a-${cat.id}-${idx}`}
                category={cat}
                isSelected={selectedCategory === cat.slug}
                onSelect={(slug) => {
                  onSelectCategory?.(slug);
                  setIsPaused(true);
                  if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
                  pauseTimerRef.current = setTimeout(() => setIsPaused(false), 2500);
                }}
              />
            ))}

            {/* Set 2: Duplicate Set for Seamless Infinite Loop */}
            {categories.map((cat, idx) => (
              <CategoryItem
                key={`cat-b-${cat.id}-${idx}`}
                category={cat}
                isSelected={selectedCategory === cat.slug}
                onSelect={(slug) => {
                  onSelectCategory?.(slug);
                  setIsPaused(true);
                  if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
                  pauseTimerRef.current = setTimeout(() => setIsPaused(false), 2500);
                }}
              />
            ))}
          </div>

          {/* Right Gradient Edge Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
        </div>

      </div>
    </section>
  );
}
