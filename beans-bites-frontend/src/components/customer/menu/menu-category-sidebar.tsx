"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FoodCategory } from "@/types/menu.types";

interface MenuCategorySidebarProps {
  categories: FoodCategory[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  className?: string;
}

// Visual icons corresponding to categories
const CATEGORY_ICONS: Record<string, { emoji: string; isGrid?: boolean }> = {
  all: { emoji: "▦", isGrid: true },
  nepali: { emoji: "🍛" },
  momo: { emoji: "🥟" },
  beverages: { emoji: "☕" },
  pizza: { emoji: "🍕" },
  burger: { emoji: "🍔" },
  pasta: { emoji: "🍝" },
  sandwich: { emoji: "🥪" },
  salad: { emoji: "🥗" },
  snacks: { emoji: "🍟" },
  desserts: { emoji: "🍰" },
};

function CategoryPill({
  cat,
  isSelected,
  onSelect,
  isSidebar = false,
}: {
  cat: FoodCategory;
  isSelected: boolean;
  onSelect: (slug: string) => void;
  isSidebar?: boolean;
}) {
  const iconMeta = CATEGORY_ICONS[cat.slug] || { emoji: "🍽️" };

  return (
    <button
      type="button"
      onClick={() => onSelect(cat.slug)}
      className={cn(
        "flex-shrink-0 flex items-center justify-between gap-1.5 sm:gap-2 px-3 py-1.5 sm:py-2 md:py-2.5 rounded-full md:rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 select-none group text-left whitespace-nowrap cursor-pointer",
        isSidebar ? "w-full" : "",
        isSelected
          ? "bg-[#FF5A0A] text-white shadow-sm font-semibold scale-[1.01]"
          : "bg-gray-50 md:bg-transparent text-gray-700 hover:bg-orange-50/70 hover:text-[#FF5A0A]"
      )}
    >
      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
        {iconMeta.isGrid ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "w-4 h-4 flex-shrink-0",
              isSelected ? "text-white" : "text-gray-500 group-hover:text-[#FF5A0A]"
            )}
          >
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
        ) : (
          <span className="text-sm sm:text-base leading-none flex-shrink-0 drop-shadow-xs">
            {iconMeta.emoji}
          </span>
        )}
        <span className="truncate">{cat.name}</span>
      </div>

      {cat.itemCount !== undefined && (
        <span
          className={cn(
            "text-[10px] sm:text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full flex-shrink-0 transition-colors ml-1",
            isSelected
              ? "bg-white/25 text-white"
              : "bg-white md:bg-transparent text-gray-400 group-hover:text-[#FF5A0A] group-hover:bg-orange-100/60"
          )}
        >
          {cat.itemCount}
        </span>
      )}
    </button>
  );
}

export function MenuCategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}: MenuCategorySidebarProps) {
  const [isPaused, setIsPaused] = React.useState(false);
  const pauseTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const allCategory = categories.find((c) => c.slug === "all");
  const runningCategories = categories.filter((c) => c.slug !== "all");

  const handleInteractionStart = () => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
  };

  const handleInteractionEnd = () => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  React.useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  return (
    <aside
      className={cn(
        "bg-white rounded-2xl border border-gray-100 p-2.5 sm:p-3 md:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between mb-2 md:mb-3 px-1 md:px-2">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 tracking-tight">
          Categories
        </h2>
        <span className="text-[11px] text-gray-400 font-medium md:hidden flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Gliding • Tap to select</span>
        </span>
      </div>

      {/* 1. MOBILE VIEW (< md): Fixed Left "All Items" + Slow Running Scroller (bistarai) */}
      <div className="md:hidden flex items-center relative w-full overflow-hidden">
        {/* Pinned Left "All Items" Button */}
        {allCategory && (
          <div className="flex-shrink-0 z-20 bg-white pr-2 pl-0.5 py-0.5 flex items-center border-r border-gray-100 shadow-[2px_0_8px_rgba(0,0,0,0.03)] relative">
            <CategoryPill
              cat={allCategory}
              isSelected={selectedCategory === "all" || selectedCategory === allCategory.slug}
              onSelect={(slug) => {
                onSelectCategory(slug);
                setIsPaused(true);
                if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
                pauseTimerRef.current = setTimeout(() => setIsPaused(false), 2500);
              }}
            />
          </div>
        )}

        {/* Slow Marquee Glide Track (bistarai) */}
        <div
          className="flex-1 relative overflow-hidden pl-2"
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          onPointerDown={handleInteractionStart}
          onPointerUp={handleInteractionEnd}
        >
          {/* Subtle Left Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />

          {/* Running Track with 32s duration for a slow, gentle glide */}
          <div
            className="animate-menu-category-glide flex items-center gap-2 py-0.5"
            style={{
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {/* Set 1 */}
            {runningCategories.map((cat, idx) => (
              <CategoryPill
                key={`run-a-${cat.id}-${idx}`}
                cat={cat}
                isSelected={selectedCategory === cat.slug}
                onSelect={(slug) => {
                  onSelectCategory(slug);
                  setIsPaused(true);
                  if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
                  pauseTimerRef.current = setTimeout(() => setIsPaused(false), 2500);
                }}
              />
            ))}

            {/* Set 2 (Duplicate for Seamless Infinite Loop) */}
            {runningCategories.map((cat, idx) => (
              <CategoryPill
                key={`run-b-${cat.id}-${idx}`}
                cat={cat}
                isSelected={selectedCategory === cat.slug}
                onSelect={(slug) => {
                  onSelectCategory(slug);
                  setIsPaused(true);
                  if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
                  pauseTimerRef.current = setTimeout(() => setIsPaused(false), 2500);
                }}
              />
            ))}
          </div>

          {/* Subtle Right Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
        </div>
      </div>

      {/* 2. DESKTOP VIEW (md: and up): Static Vertical Sidebar */}
      <nav
        className="hidden md:flex md:flex-col gap-1.5"
        aria-label="Menu categories"
      >
        {categories.map((cat) => (
          <CategoryPill
            key={cat.id}
            cat={cat}
            isSidebar
            isSelected={
              selectedCategory === cat.slug ||
              (selectedCategory === "all" && cat.slug === "all")
            }
            onSelect={onSelectCategory}
          />
        ))}
      </nav>
    </aside>
  );
}
