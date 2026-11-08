"use client";

import * as React from "react";
import Image from "next/image";
import { Heart, Minus, Plus, Star } from "lucide-react";
import { FoodItem } from "@/types/menu.types";
import { formatPrice } from "@/lib/utils";
import { useFavoritesStore } from "@/store/favorites.store";
import { handleAddToCart } from "@/features/cart/cart-actions";
import { toast } from "sonner";

interface FoodCardProps {
  item: FoodItem;
}

export function FoodCard({ item }: FoodCardProps) {
  const [quantity, setQuantity] = React.useState(1);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(item.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  // Client-side mounted state for favorite button icon to avoid hydration mismatch
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const favorited = toggleFavorite(item.id);
    if (favorited) {
      toast.success(`Saved to favorites!`, {
        description: item.name,
        duration: 2000,
      });
    } else {
      toast.info(`Removed from favorites`, {
        description: item.name,
        duration: 2000,
      });
    }
  };

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

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleAddToCart(item, quantity);
    setQuantity(1);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
      {/* Top Media Container */}
      <div className="relative w-full h-32 sm:h-48 overflow-hidden bg-gray-100">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge on Top-Left */}
        {item.badge && (
          <div className="absolute top-2 left-2 z-10">
            {item.badge === "Best Seller" && (
              <span className="inline-flex items-center gap-1 bg-[#E11D48] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md shadow-sm">
                <Star className="w-2.5 h-2.5 fill-white" />
                <span>Best Seller</span>
              </span>
            )}
            {item.badge === "Popular" && (
              <span className="inline-flex items-center gap-1 bg-[#F59E0B] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-md shadow-sm">
                <Star className="w-2.5 h-2.5 fill-white" />
                <span>Popular</span>
              </span>
            )}
          </div>
        )}

        {/* Favorite Heart Button on Top-Right */}
        <button
          onClick={handleFavoriteClick}
          aria-label={mounted && isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-2 right-2 z-10 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 active:scale-90 transition-all cursor-pointer"
        >
          <Heart
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${
              mounted && isFavorite
                ? "fill-[#FF5A0A] text-[#FF5A0A]"
                : "text-white fill-none stroke-[2]"
            }`}
          />
        </button>
      </div>

      {/* Card Content & Details */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between gap-2">
        <div>
          <h3 className="font-bold text-[#111827] text-xs sm:text-[15px] group-hover:text-[#FF5A0A] transition-colors leading-snug line-clamp-1">
            {item.name}
          </h3>
          <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-gray-500 line-clamp-1 sm:line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Sano Sano Ingredients */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="mt-1.5 flex items-center gap-1 text-[10px] text-gray-500 flex-wrap">
              <span className="text-[9px] uppercase font-semibold text-gray-400">
                With:
              </span>
              <span className="text-[10px] text-gray-600 truncate max-w-[130px] sm:max-w-[180px]">
                {item.ingredients.slice(0, 2).join(", ")}
                {item.ingredients.length > 2 && "..."}
              </span>
            </div>
          )}
        </div>

        {/* Bottom Row: Price & Multi-Person Stepper + Add Button */}
        <div className="mt-1 sm:mt-2 pt-2 border-t border-gray-50 flex items-center justify-between gap-1.5 flex-wrap">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-[9px] sm:text-[10px] leading-none">
              Price
            </span>
            <span className="text-xs sm:text-base font-extrabold text-[#FF5A0A] leading-tight font-mono mt-0.5">
              {formatPrice(item.price)}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Stepper ([-] qty [+]) */}
            <div className="flex items-center border border-gray-200 rounded-md bg-gray-50 h-6 sm:h-7 px-0.5">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="w-4 h-full flex items-center justify-center text-gray-500 hover:text-[#FF5A0A] disabled:opacity-30"
              >
                <Minus className="w-2.5 h-2.5" />
              </button>
              <span className="w-4 text-center text-[11px] sm:text-xs font-bold text-gray-800 select-none">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="w-4 h-full flex items-center justify-center text-gray-500 hover:text-[#FF5A0A]"
              >
                <Plus className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Add Button - only adds when clicked! */}
            <button
              onClick={handleAddClick}
              className="inline-flex items-center gap-1 bg-[#FF5A0A] hover:bg-[#E04E07] active:bg-[#C94304] text-white text-[11px] sm:text-xs font-bold px-2 sm:px-3 h-6 sm:h-7 rounded-md shadow-2xs hover:shadow transition-all active:scale-95 cursor-pointer"
            >
              <span>Add</span>
              {quantity > 1 && (
                <span className="bg-white/20 text-white text-[10px] px-1 rounded font-extrabold">
                  {quantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
