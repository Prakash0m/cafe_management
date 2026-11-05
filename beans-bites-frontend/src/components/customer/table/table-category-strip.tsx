"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableCategoryStripProps {
  categories: Array<{ id: string; name: string; slug: string; emoji: string }>;
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isVegOnly: boolean;
  onToggleVegOnly: () => void;
}

export function TableCategoryStrip({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  isVegOnly,
  onToggleVegOnly,
}: TableCategoryStripProps) {
  return (
    <div className="bg-white border-b border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] sticky top-[57px] z-20 transition-all">
      <div className="max-w-2xl mx-auto px-4 pt-2.5 pb-2 space-y-2">
        {/* Top: Compact Search Bar + Veg Toggle */}
        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search dish or ingredient (e.g. cheese, chicken)..."
              className="w-full bg-gray-50 border border-gray-200/90 rounded-xl pl-8 pr-8 py-1.5 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF5A0A]/20 focus:border-[#FF5A0A] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Veg Only Filter Switch */}
          <button
            type="button"
            onClick={onToggleVegOnly}
            className={cn(
              "flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition-all select-none cursor-pointer",
              isVegOnly
                ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-xs"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
            )}
          >
            <span
              className={cn(
                "w-2.5 h-2.5 rounded-full",
                isVegOnly ? "bg-emerald-600 ring-2 ring-emerald-300" : "bg-gray-300"
              )}
            />
            <span>Veg Only</span>
          </button>
        </div>

        {/* Bottom: Fast Horizontal Scrolling Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 py-0.5 select-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={cn(
                  "flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap active:scale-95 cursor-pointer",
                  isSelected
                    ? "bg-[#FF5A0A] text-white shadow-sm font-bold scale-[1.02]"
                    : "bg-gray-100/90 text-gray-700 hover:bg-orange-50 hover:text-[#FF5A0A]"
                )}
              >
                <span className="text-xs leading-none">{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
