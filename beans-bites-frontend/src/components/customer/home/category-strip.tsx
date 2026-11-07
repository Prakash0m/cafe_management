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

  // Split categories: "All Items" stays fixed on left, rest run/glide on mobile
  const allCategory = React.useMemo(
    () => categories.find((c) => c.slug === "all") || categories[0],
    [categories]
  );

  const runningCategories = React.useMemo(
    () => categories.filter((c) => c.slug !== "all"),
    [categories]
  );

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

        {/* MOBILE VIEW (< md): Fixed "All Items" on Left + Running Food Categories on Right */}
        <div className="md:hidden flex items-center relative w-full overflow-hidden">
          
          {/* 1. FIXED LEFT BUTTON: "All Items" (Always pinned on left side) */}
          {allCategory && (
            <div className="flex-shrink-0 z-20 bg-white pr-2.5 sm:pr-3 pl-0.5 py-0.5 flex items-center border-r border-gray-100 shadow-[3px_0_10px_rgba(0,0,0,0.04)] relative">
              <CategoryItem
                category={allCategory}
                isSelected={selectedCategory === allCategory.slug}
                onSelect={onSelectCategory}
              />
            </div>
          )}

          {/* 2. RUNNING ITEMS STREAM: Pizza, Burger, Pasta, Momo, etc. (Glides continuously) */}
          <div
            className="flex-1 relative overflow-hidden pl-2.5 sm:pl-3"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onPointerDown={handleTouchStart}
            onPointerUp={handleTouchEnd}
          >
            {/* Left Edge Fade Mask next to fixed All Items divider */}
            <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />

            {/* Running Track with duplicate items for seamless loop */}
            <div
              className="animate-category-glide flex items-center gap-4.5 sm:gap-5 py-0.5"
              style={{
                animationPlayState: isPaused ? "paused" : "running",
              }}
            >
              {/* Set 1: Food Categories */}
              {runningCategories.map((cat, idx) => (
                <CategoryItem
                  key={`run-a-${cat.id}-${idx}`}
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
              {runningCategories.map((cat, idx) => (
                <CategoryItem
                  key={`run-b-${cat.id}-${idx}`}
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
            <div className="absolute right-0 top-0 bottom-0 w-7 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
          </div>

        </div>

      </div>
    </section>
  );
}
