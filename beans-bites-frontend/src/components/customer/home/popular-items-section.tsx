"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FoodItem } from "@/types/menu.types";
import { FoodGrid } from "./food-grid";

interface PopularItemsSectionProps {
  items: FoodItem[];
  isLoading?: boolean;
}

export function PopularItemsSection({
  items,
  isLoading = false,
}: PopularItemsSectionProps) {
  return (
    <section
      id="popular-items-section"
      className="w-full bg-white py-6 sm:py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        {/* Section Header */}
        <div className="flex items-end justify-between border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight">
              Popular Items
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Our most loved dishes, freshly prepared for you.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#FF5A0A] hover:text-[#E04E07] transition-colors group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Food Items Grid */}
        <FoodGrid items={items} isLoading={isLoading} />
      </div>
    </section>
  );
}

