"use client";

import * as React from "react";
import Image from "next/image";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import { CartItem } from "@/types/cart.types";
import { useCartStore } from "@/store/cart.store";
import { useFavoritesStore } from "@/store/favorites.store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CartItemRowProps {
  cartItem: CartItem;
}

export function CartItemRow({ cartItem }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const isFav = isFavorite(cartItem.item.id);

  const handleDecrement = () => {
    if (cartItem.quantity > 1) {
      updateQuantity(cartItem.item.id, cartItem.quantity - 1);
    } else {
      removeItem(cartItem.item.id);
      toast.info(`Removed ${cartItem.item.name} from cart`);
    }
  };

  const handleIncrement = () => {
    updateQuantity(cartItem.item.id, cartItem.quantity + 1);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(cartItem.item.id);
    if (!isFav) {
      toast.success("Saved to Favorites", {
        description: `${cartItem.item.name} added to your wishlist.`,
      });
    }
  };

  const lineTotal = cartItem.item.price * cartItem.quantity;

  return (
    <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-orange-100 transition-all">
      <div className="flex gap-3 sm:gap-4 items-start">
        {/* Food Thumbnail */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100/80 shadow-sm">
          <Image
            src={cartItem.item.imageUrl}
            alt={cartItem.item.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        {/* Info & Controls */}
        <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug tracking-tight truncate">
                {cartItem.item.name}
              </h3>
              <button
                type="button"
                onClick={handleToggleFavorite}
                aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
                className="text-gray-400 hover:text-[#E11D48] transition-colors p-0.5"
              >
                <Heart
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isFav ? "fill-[#E11D48] text-[#E11D48]" : "text-gray-400"
                  )}
                />
              </button>
            </div>

            <p className="text-xs text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">
              {cartItem.item.description}
            </p>
          </div>

          {/* Pricing & Stepper Row */}
          <div className="flex items-center justify-between gap-2 pt-2 mt-1">
            {/* Unit Price */}
            <span className="text-xs sm:text-sm font-bold text-[#FF5A0A]">
              NPR {cartItem.item.price}
            </span>

            {/* Stepper */}
            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/70 h-7 sm:h-8 px-1">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-[#FF5A0A] transition-colors"
                aria-label="Decrease quantity"
              >
                {cartItem.quantity === 1 ? (
                  <Trash2 className="w-3 h-3 text-rose-500" />
                ) : (
                  <Minus className="w-3 h-3" />
                )}
              </button>
              <span className="w-6 text-center text-xs font-bold text-gray-800 select-none">
                {cartItem.quantity}
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

            {/* Line Item Total */}
            <span className="text-xs sm:text-sm font-bold text-[#FF5A0A] text-right min-w-[65px]">
              NPR {lineTotal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
