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
  return (
    <section className="w-full bg-white border-b border-gray-100 py-5 sm:py-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start md:justify-between gap-5 sm:gap-6 lg:gap-7 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <CategoryItem
              key={cat.id}
              category={cat}
              isSelected={selectedCategory === cat.slug}
              onSelect={onSelectCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
