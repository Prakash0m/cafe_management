"use client";

import * as React from "react";
import { OfferCategory } from "@/types/offers.types";
import { cn } from "@/lib/utils";
import { Sparkles, Flame, Utensils, Coffee, GraduationCap } from "lucide-react";

interface OffersFilterProps {
  selectedCategory: OfferCategory;
  onSelectCategory: (cat: OfferCategory) => void;
  counts: Record<OfferCategory, number>;
}

export function OffersFilter({
  selectedCategory,
  onSelectCategory,
  counts,
}: OffersFilterProps) {
  const tabs: Array<{
    id: OfferCategory;
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      id: "all",
      label: "All Offers",
      icon: <Sparkles className="w-3.5 h-3.5" />,
    },
    {
      id: "weekend",
      label: "Weekend Specials",
      icon: <Flame className="w-3.5 h-3.5" />,
    },
    {
      id: "combos",
      label: "Combos & Feasts",
      icon: <Utensils className="w-3.5 h-3.5" />,
    },
    {
      id: "beverages",
      label: "Coffee & Drinks",
      icon: <Coffee className="w-3.5 h-3.5" />,
    },
    {
      id: "exclusive",
      label: "Student & Welcome",
      icon: <GraduationCap className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="w-full flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-2">
      <div className="inline-flex items-center gap-1.5 p-1.5 bg-white border border-gray-200/90 rounded-2xl shadow-sm">
        {tabs.map((tab) => {
          const isSelected = selectedCategory === tab.id;
          const count = counts[tab.id] ?? 0;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectCategory(tab.id)}
              className={cn(
                "px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap select-none",
                isSelected
                  ? "bg-[#FF5A0A] text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              <span className={isSelected ? "text-white" : "text-gray-400"}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded-full text-[10px] font-extrabold",
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
