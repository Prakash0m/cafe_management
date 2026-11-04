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
        "bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)]",
        className
      )}
    >
      <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 px-2 tracking-tight">
        Categories
      </h2>

      <nav className="flex flex-col gap-1 sm:gap-1.5" aria-label="Menu categories">
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
                "w-full flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 select-none group text-left",
                isSelected
                  ? "bg-[#FF5A0A] text-white shadow-sm font-semibold scale-[1.01]"
                  : "text-gray-700 hover:bg-orange-50/70 hover:text-[#FF5A0A]"
              )}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
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
                  <span className="text-base sm:text-lg leading-none flex-shrink-0 drop-shadow-sm">
                    {iconMeta.emoji}
                  </span>
                )}
                <span className="truncate">{cat.name}</span>
              </div>

              {cat.itemCount !== undefined && (
                <span
                  className={cn(
                    "text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 transition-colors",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "text-gray-400 group-hover:text-[#FF5A0A] group-hover:bg-orange-100/60"
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
