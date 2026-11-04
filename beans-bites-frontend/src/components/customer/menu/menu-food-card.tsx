"use client";

import * as React from "react";
import Image from "next/image";
import { Heart, Minus, Plus, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { FoodItem } from "@/types/menu.types";
import { DietaryIndicator } from "./dietary-indicator";
import { useCartStore } from "@/store/cart.store";
import { useFavoritesStore } from "@/store/favorites.store";
import { toast } from "sonner";

interface MenuFoodCardProps {
  item: FoodItem;
  className?: string;
}

export function MenuFoodCard({ item, className }: MenuFoodCardProps) {
  const [quantity, setQuantity] = React.useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const isFav = isFavorite(item.id);

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((prev) => Math.min(prev + 1, 99));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(item, quantity);
    toast.success("Added to Cart", {
      description: `${quantity}x ${item.name} added to your order (NPR ${item.price * quantity}).`,
      duration: 2500,
    });
    setQuantity(1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item.id);
    if (!isFav) {
      toast.success("Added to Favorites", {
        description: `${item.name} saved to your wishlist.`,
        duration: 2000,
      });
    }
  };

  // Badge styling
  const isBestseller =
    item.badge === "Bestseller" || item.badge === "Best Seller";
  const isPopular = item.badge === "Popular";
  const isNew = item.badge === "New";

  return (
    <article
      className={cn(
        "group bg-white rounded-2xl border border-gray-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col overflow-hidden",
        className
      )}
    >
      {/* Top Image Showcase */}
      <div className="relative w-full aspect-[16/11] bg-gray-50 overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-106 transition-transform duration-300 ease-out"
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />

        {/* Top-Left Badge */}
        {item.badge && (
          <div className="absolute top-2.5 left-2.5 z-10">
            {isBestseller && (
              <span className="inline-flex items-center gap-1 bg-[#DC2626] text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
                <Star className="w-2.5 h-2.5 fill-current" />
                <span>Bestseller</span>
              </span>
            )}
            {isPopular && (
              <span className="inline-flex items-center gap-1 bg-[#F59E0B] text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
                <Star className="w-2.5 h-2.5 fill-current" />
                <span>Popular</span>
              </span>
            )}
            {isNew && (
              <span className="inline-flex items-center gap-1 bg-[#EC4899] text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full shadow-sm tracking-wide">
                <Star className="w-2.5 h-2.5 fill-current" />
                <span>New</span>
              </span>
            )}
          </div>
        )}

        {/* Top-Right Favorite Heart */}
        <button
          onClick={handleToggleFavorite}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/25 backdrop-blur-md flex items-center justify-center hover:bg-black/40 text-white transition-all active:scale-90"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isFav
                ? "fill-[#E11D48] text-[#E11D48]"
                : "text-white/90 hover:text-white"
            )}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Title Row with Veg/Non-Veg Icon */}
          <div className="flex items-center justify-between gap-1.5">
            <h3 className="font-bold text-[#111827] text-sm sm:text-[15px] leading-snug tracking-tight truncate group-hover:text-[#FF5A0A] transition-colors">
              {item.name}
            </h3>
            <DietaryIndicator isVeg={item.isVeg} />
          </div>

          {/* Description */}
          <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed min-h-[32px]">
            {item.description}
          </p>
        </div>

        {/* Price & Bottom Actions Row */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-gray-100/80">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-[10px] font-medium text-gray-400 leading-none">
              Price
            </span>
            <span className="text-sm sm:text-base font-bold text-[#FF5A0A] leading-tight">
              NPR {item.price}
            </span>
          </div>

          {/* Stepper + Add Button */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/70 h-7 sm:h-8 px-1">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-[#FF5A0A] disabled:opacity-30 disabled:hover:text-gray-600 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-5 text-center text-xs font-bold text-gray-800 select-none">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-[#FF5A0A] transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="bg-[#FF5A0A] hover:bg-[#E04E07] active:bg-[#C94304] text-white text-xs sm:text-[13px] font-semibold px-3 sm:px-3.5 h-7 sm:h-8 rounded-lg shadow-sm transition-all active:scale-95 flex items-center justify-center"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
