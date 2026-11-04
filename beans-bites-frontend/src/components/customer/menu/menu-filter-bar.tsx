"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Star, Sparkles } from "lucide-react";

export type MenuFilterType = "all" | "veg" | "non-veg" | "bestseller" | "new";

interface MenuFilterBarProps {
  activeFilter: MenuFilterType;
  onFilterChange: (filter: MenuFilterType) => void;
  title?: string;
  itemCount?: number;
  className?: string;
}

export function MenuFilterBar({
  activeFilter,
  onFilterChange,
  title = "Food Menu",
  itemCount,
  className,
}: MenuFilterBarProps) {
  const filters: Array<{
    id: MenuFilterType;
    label: string;
    icon?: React.ReactNode;
  }> = [
    { id: "all", label: "All" },
    {
      id: "veg",
      label: "Veg",
      icon: (
        <span className="w-3.5 h-3.5 inline-flex items-center justify-center border border-emerald-600 rounded-[3px] p-[1.5px] bg-white">
          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
        </span>
      ),
    },
    {
      id: "non-veg",
      label: "Non-Veg",
      icon: (
        <span className="w-3.5 h-3.5 inline-flex items-center justify-center border border-[#DC2626] rounded-[3px] p-[1.5px] bg-white">
          <span className="w-1.5 h-1.5 bg-[#DC2626] rounded-full" />
        </span>
      ),
    },
    {
      id: "bestseller",
      label: "Bestseller",
      icon: <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />,
    },
    {
      id: "new",
      label: "New",
      icon: (
        <span className="text-[10px] font-bold tracking-wider bg-rose-500 text-white px-1.5 py-0.2 rounded-full uppercase leading-none">
          New
        </span>
      ),
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-2",
        className
      )}
    >
      <div className="flex items-baseline gap-2.5">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
        {itemCount !== undefined && (
          <span className="text-xs sm:text-sm font-medium text-gray-400">
            ({itemCount} items)
          </span>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
        {filters.map((f) => {
          const isActive = activeFilter === f.id;

          return (
            <button
              key={f.id}
              onClick={() => onFilterChange(f.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 whitespace-nowrap select-none",
                isActive
                  ? "bg-[#FF5A0A] text-white shadow-sm font-semibold scale-102"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-[#FF5A0A]/60 hover:text-[#FF5A0A] shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
              )}
            >
              {f.icon}
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
