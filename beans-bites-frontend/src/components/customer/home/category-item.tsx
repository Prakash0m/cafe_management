"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FoodCategory } from "@/types/menu.types";

interface CategoryItemProps {
  category: FoodCategory;
  isSelected?: boolean;
  onSelect?: (slug: string) => void;
}

export function CategoryItem({
  category,
  isSelected = false,
  onSelect,
}: CategoryItemProps) {
  const isAll = category.slug === "all";

  const handleClick = (e: React.MouseEvent) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(category.slug);
    }
  };

  return (
    <Link
      href={isAll ? "/menu" : `/menu?category=${category.slug}`}
      onClick={handleClick}
      className="group flex flex-col items-center gap-2 flex-shrink-0 transition-transform active:scale-95 select-none"
    >
      {/* High-Resolution Circular Category Container */}
      <div
        className={cn(
          "w-14 h-14 sm:w-16 sm:h-16 lg:w-[68px] lg:h-[68px] rounded-full flex items-center justify-center transition-all duration-200 relative bg-white",
          isSelected
            ? "border-2 border-[#FF5A0A] shadow-[0_2px_12px_rgba(255,90,10,0.22)]"
            : "border border-gray-100/90 shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:border-[#FF5A0A]/50 hover:shadow-md hover:-translate-y-0.5"
        )}
      >
        {isAll ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF5A0A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-110 duration-200"
          >
            <rect x="3.5" y="3.5" width="7" height="7" rx="1.8" />
            <rect x="13.5" y="3.5" width="7" height="7" rx="1.8" />
            <rect x="3.5" y="13.5" width="7" height="7" rx="1.8" />
            <rect x="13.5" y="13.5" width="7" height="7" rx="1.8" />
          </svg>
        ) : (
          <div className="relative w-full h-full p-0.5 rounded-full overflow-hidden">
            <Image
              src={category.iconUrl}
              alt={category.name}
              fill
              sizes="(max-width: 640px) 56px, 68px"
              priority={category.slug === "pizza" || category.slug === "burger"}
              className="object-cover rounded-full group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}
      </div>

      {/* Category Name */}
      <span
        className={cn(
          "text-xs sm:text-[13px] font-semibold tracking-tight transition-colors duration-200",
          isSelected
            ? "text-[#FF5A0A] font-bold"
            : "text-[#1F2937] group-hover:text-[#FF5A0A]"
        )}
      >
        {category.name}
      </span>
    </Link>
  );
}
