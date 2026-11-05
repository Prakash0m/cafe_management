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
  pizza: { emoji: "🍕" },
  burger: { emoji: "🍔" },
  pasta: { emoji: "🍝" },
  momo: { emoji: "🥟" },
  sandwich: { emoji: "🥪" },
  salad: { emoji: "🥗" },
  snacks: { emoji: "🍟" },
  desserts: { emoji: "🍰" },
  beverages: { emoji: "☕" },
};

export function MenuCategorySidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  className,
}: MenuCategorySidebarProps) {
  return (
    <aside
      className={cn(
        "bg-white rounded-2xl border border-gray-100 p-2.5 sm:p-3 md:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2 md:mb-3 px-1 md:px-2">
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 tracking-tight">
          Categories
        </h2>
        <span className="text-[11px] text-gray-400 font-medium md:hidden">
          Scroll to explore →
        </span>
      </div>

      <nav
        className="flex md:flex-col flex-row overflow-x-auto md:overflow-visible no-scrollbar gap-1.5 sm:gap-2 md:gap-1.5 pb-1 md:pb-0 -mx-1 px-1 md:mx-0 md:px-0"
        aria-label="Menu categories"
      >
        {categories.map((cat) => {
          const isSelected =
            selectedCategory === cat.slug ||
            (selectedCategory === "all" && cat.slug === "all");
          const iconMeta = CATEGORY_ICONS[cat.slug] || { emoji: "🍽️" };

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={cn(
                "flex-shrink-0 md:w-full flex items-center justify-between gap-2 px-3 py-1.5 sm:py-2 md:py-2.5 rounded-full md:rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 select-none group text-left whitespace-nowrap",
                isSelected
                  ? "bg-[#FF5A0A] text-white shadow-sm font-semibold scale-[1.01]"
                  : "bg-gray-50 md:bg-transparent text-gray-700 hover:bg-orange-50/70 hover:text-[#FF5A0A]"
              )}
            >
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                {iconMeta.isGrid ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(
                      "w-4 h-4 sm:w-4.5 sm:h-4.5 flex-shrink-0",
                      isSelected ? "text-white" : "text-gray-500 group-hover:text-[#FF5A0A]"
                    )}
                  >
                    <rect x="3" y="3" width="7" height="7" rx="1.5" />
                    <rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    <rect x="14" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                ) : (
                  <span className="text-sm sm:text-base md:text-lg leading-none flex-shrink-0 drop-shadow-sm">
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
        })}
      </nav>
    </aside>
  );
}

