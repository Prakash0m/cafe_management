import * as React from "react";
import { FoodItem } from "@/types/menu.types";
import { FoodCard } from "./food-card";

interface FoodGridProps {
  items: FoodItem[];
  isLoading?: boolean;
}

export function FoodGrid({ items, isLoading = false }: FoodGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 space-y-2.5 sm:space-y-3 animate-pulse"
          >
            <div className="w-full h-32 sm:h-44 bg-gray-200 rounded-xl" />
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-2.5 sm:h-3 bg-gray-200 rounded w-5/6" />
            <div className="flex justify-between items-center pt-2">
              <div className="h-4 sm:h-5 bg-gray-200 rounded w-1/4" />
              <div className="h-6 sm:h-8 bg-gray-200 rounded-lg w-12 sm:w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="w-full py-12 text-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
        <p className="text-gray-500 text-sm font-medium">
          No food items found matching your selection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
      {items.map((item) => (
        <FoodCard key={item.id} item={item} />
      ))}
    </div>
  );
}

