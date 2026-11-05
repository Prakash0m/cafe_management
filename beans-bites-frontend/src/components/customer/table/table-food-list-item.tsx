"use client";

import * as React from "react";
import Image from "next/image";
import { Plus, Minus, Star, ChevronRight, Sparkles } from "lucide-react";
import { FoodItem } from "@/types/menu.types";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TableFoodListItemProps {
  item: FoodItem;
  quantityInCart: number;
  onSelect: (item: FoodItem) => void;
  onAddToCart: (item: FoodItem, e: React.MouseEvent) => void;
  onUpdateQuantity: (itemId: string, newQty: number, e: React.MouseEvent) => void;
}

export function TableFoodListItem({
  item,
  quantityInCart,
  onSelect,
  onAddToCart,
  onUpdateQuantity,
}: TableFoodListItemProps) {
  // Extract top 2 ingredients for a clean mini-preview
  const previewIngredients = item.ingredients && item.ingredients.length > 0
    ? item.ingredients.slice(0, 3).map(ing => ing.split("(")[0].trim()).join(", ")
    : null;

  return (
    <div
      onClick={() => onSelect(item)}
      className="group relative bg-white rounded-2xl border border-gray-100 p-3 sm:p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-orange-200 transition-all flex items-center justify-between gap-3 cursor-pointer select-none active:scale-[0.99]"
    >
      {/* Left: Food Thumbnail */}
      <div className="relative w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="84px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Veg / Non-Veg Indicator */}
        <span
          className={cn(
            "absolute top-1.5 left-1.5 w-4 h-4 rounded-[4px] border flex items-center justify-center p-[2px] bg-white shadow-xs",
            item.isVeg ? "border-emerald-600" : "border-[#DC2626]"
          )}
        >
          <span
            className={cn(
              "w-2 h-2 rounded-full",
              item.isVeg ? "bg-emerald-600" : "bg-[#DC2626]"
            )}
          />
        </span>

        {/* Bestseller Mini Badge */}
        {item.badge && (
          <span className="absolute bottom-1 right-1 bg-black/75 backdrop-blur-xs text-white text-[8px] font-bold px-1.5 py-0.5 rounded leading-none">
            {item.badge.includes("Best") ? "Top" : "★"}
          </span>
        )}
      </div>

      {/* Middle: Dish Name, Price & Ingredients Tag */}
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-1.5">
          <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight group-hover:text-[#FF5A0A] transition-colors truncate">
            {item.name}
          </h3>
          {item.rating && (
            <span className="inline-flex items-center text-[10px] font-bold text-amber-500 bg-amber-50 px-1.5 py-0.2 rounded-md">
              <Star className="w-2.5 h-2.5 fill-amber-400 stroke-none mr-0.5" />
              {item.rating}
            </span>
          )}
        </div>

        {/* Price & Prep time */}
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-[#FF5A0A] text-sm sm:text-[15px]">
            {formatPrice(item.price)}
          </span>
          {item.preparationTime && (
            <span className="text-[10px] text-gray-400 font-medium">
              • {item.preparationTime}
            </span>
          )}
        </div>

        {/* Ingredients Quick Snippet (Foods Vitra K K Chha) */}
        {previewIngredients ? (
          <p className="text-[11px] text-gray-500 mt-1 line-clamp-1 leading-tight flex items-center gap-1">
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">With:</span>
            <span className="truncate">{previewIngredients}</span>
          </p>
        ) : (
          <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">
            {item.description}
          </p>
        )}

        {/* Subtle Tap Action Hint */}
        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-orange-600 mt-1 hover:underline">
          <span>See ingredients & details</span>
          <ChevronRight className="w-3 h-3" />
        </span>
      </div>

      {/* Right: + Add Button or Stepper */}
      <div
        className="flex-shrink-0 flex items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {quantityInCart > 0 ? (
          <div className="inline-flex items-center bg-[#FF5A0A] text-white rounded-xl shadow-xs overflow-hidden">
            <button
              type="button"
              onClick={(e) => onUpdateQuantity(item.id, quantityInCart - 1, e)}
              className="p-2 hover:bg-[#E04E07] active:bg-[#C94304] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
            <span className="font-bold text-xs px-2 min-w-[20px] text-center">
              {quantityInCart}
            </span>
            <button
              type="button"
              onClick={(e) => onUpdateQuantity(item.id, quantityInCart + 1, e)}
              className="p-2 hover:bg-[#E04E07] active:bg-[#C94304] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={(e) => onAddToCart(item, e)}
            className="inline-flex items-center gap-1 bg-[#FFF5EF] hover:bg-[#FF5A0A] text-[#FF5A0A] hover:text-white border border-[#FF5A0A]/30 hover:border-transparent font-bold text-xs px-3 py-2 rounded-xl transition-all shadow-2xs active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add</span>
          </button>
        )}
      </div>
    </div>
  );
}
