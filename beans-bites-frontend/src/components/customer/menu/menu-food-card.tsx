"use client";

import * as React from "react";
import Image from "next/image";
import { Heart, Minus, Plus, Star, Sparkles, X, Clock, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import { FoodItem } from "@/types/menu.types";
import { DietaryIndicator } from "./dietary-indicator";
import { useCartStore } from "@/store/cart.store";
import { useFavoritesStore } from "@/store/favorites.store";
import { toast } from "sonner";

interface MenuFoodCardProps {
  item: FoodItem;
  className?: string;
  viewMode?: "grid" | "list";
}

export function MenuFoodCard({ item, className, viewMode = "grid" }: MenuFoodCardProps) {
  // Local quantity selection (multi-person ordering: 1, 2, 3, 4+ items)
  // Cart is NOT modified until the user explicitly clicks the "Add" button!
  const [quantity, setQuantity] = React.useState(1);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const cartItem = useCartStore((state) =>
    state.items.find((ci) => ci.item.id === item.id)
  );
  const inCartQuantity = cartItem?.quantity || 0;

  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isFav = isFavorite(item.id);

  // Stepper handlers - strictly adjust local counter, DO NOT touch cart
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

  // Add to Cart handler - adds all selected items at once!
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(item, quantity);
    const totalPrice = item.price * quantity;
    toast.success("Added to Cart!", {
      description: `${quantity}x ${item.name} added to your order (NPR ${totalPrice.toLocaleString()}).`,
      duration: 2500,
      action: {
        label: "View Cart",
        onClick: () => {
          window.location.href = "/cart";
        },
      },
    });
    // Reset local counter back to 1 for the next selection
    setQuantity(1);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item.id);
    if (!isFav) {
      toast.success("Saved to Favorites", {
        description: `${item.name} saved to your wishlist.`,
        duration: 2000,
      });
    }
  };

  // Badge styling
  const isBestseller = item.badge === "Bestseller" || item.badge === "Best Seller";
  const isPopular = item.badge === "Popular";
  const isNew = item.badge === "New";
  const isChefSpecial = item.badge === "Chef Special";

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. MOBILE LIST-VIEW LAYOUT (ALWAYS active on < sm, or when viewMode===list) */}
      {/* ========================================================================= */}
      <article
        className={cn(
          "group bg-white rounded-2xl border border-gray-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 p-3 sm:p-3.5 relative overflow-hidden",
          viewMode === "list"
            ? "flex items-start gap-3 sm:gap-4"
            : "flex sm:hidden items-start gap-3",
          className
        )}
      >
        {/* Left Column: Dish Details & Ingredients */}
        <div className="flex-1 min-w-0 pr-1 flex flex-col justify-between self-stretch">
          <div>
            {/* Top Meta Line: Veg/Non-Veg + Badges + Rating */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <DietaryIndicator isVeg={item.isVeg} />

              {item.badge && (
                <span
                  className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-none shadow-2xs",
                    isBestseller && "bg-red-50 text-red-600 border border-red-200/70",
                    isPopular && "bg-amber-50 text-amber-700 border border-amber-200/70",
                    isNew && "bg-pink-50 text-pink-600 border border-pink-200/70",
                    isChefSpecial && "bg-purple-50 text-purple-700 border border-purple-200/70"
                  )}
                >
                  {item.badge}
                </span>
              )}

              {item.rating && (
                <span className="text-[10.5px] text-gray-500 font-semibold flex items-center gap-0.5 ml-auto">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{item.rating}</span>
                </span>
              )}
            </div>

            {/* Dish Title */}
            <h3
              onClick={() => setShowDetailsModal(true)}
              className="font-bold text-gray-900 text-sm sm:text-[15px] leading-snug line-clamp-1 group-hover:text-[#FF5A0A] transition-colors mt-1 cursor-pointer"
            >
              {item.name}
            </h3>

            {/* Price Row + In-Cart Indicator */}
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm sm:text-[15px] font-extrabold text-[#FF5A0A]">
                NPR {item.price}
              </span>
              {inCartQuantity > 0 && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200/70">
                  {inCartQuantity} in cart
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">
              {item.description}
            </p>

            {/* Sano Sano ma K K Used Garaiko Xa (Ingredients Chips) */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div className="mt-2 pt-1.5 border-t border-gray-100">
                <div className="flex items-center gap-1 text-[9.5px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-2.5 h-2.5 text-orange-500" />
                  <span>Made with:</span>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  {item.ingredients.slice(0, 3).map((ing, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center text-[9.5px] sm:text-[10px] font-medium text-gray-600 bg-orange-50/60 px-1.5 py-0.5 rounded border border-orange-100/50 leading-tight"
                    >
                      {ing}
                    </span>
                  ))}
                  {item.ingredients.length > 3 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDetailsModal(true);
                      }}
                      className="inline-flex items-center text-[9.5px] sm:text-[10px] font-bold text-[#FF5A0A] hover:underline px-1 py-0.5"
                    >
                      +{item.ingredients.length - 3} more
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Thumbnail + Stepper + Add Button */}
        <div className="w-24 sm:w-28 flex-shrink-0 flex flex-col items-center">
          {/* Thumbnail Image */}
          <div
            onClick={() => setShowDetailsModal(true)}
            className="relative w-24 h-20 sm:w-28 sm:h-24 rounded-xl overflow-hidden bg-gray-100 shadow-xs border border-gray-100 cursor-pointer group-hover:scale-[1.02] transition-transform"
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes="112px"
              className="object-cover"
            />
            {/* Heart Favorite Button */}
            <button
              type="button"
              onClick={handleToggleFavorite}
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 active:scale-90 transition-all cursor-pointer"
            >
              <Heart
                className={cn(
                  "w-3.5 h-3.5 transition-colors",
                  isFav ? "fill-rose-500 text-rose-500" : "text-white"
                )}
              />
            </button>
          </div>

          {/* Stepper + Add Button */}
          <div className="w-full mt-2 flex flex-col gap-1.5">
            {/* Quantity Stepper ([-] 1, 2, 3, 4 [+] ) */}
            <div className="flex items-center justify-between border border-gray-200 rounded-lg bg-gray-50 h-7 px-1 w-full shadow-2xs">
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="w-5 h-full flex items-center justify-center text-gray-500 hover:text-[#FF5A0A] disabled:opacity-30 disabled:hover:text-gray-400 active:scale-90 transition-all cursor-pointer"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-bold text-gray-800 select-none">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                aria-label="Increase quantity"
                className="w-5 h-full flex items-center justify-center text-gray-500 hover:text-[#FF5A0A] active:scale-90 transition-all cursor-pointer"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Add Button - only adds when clicked! */}
            <button
              type="button"
              data-action="add-to-cart"
              onClick={handleAddToCart}
              aria-label={quantity > 1 ? `Add ${quantity} items to cart` : "Add to cart"}
              className="w-full bg-[#FF5A0A] hover:bg-[#E04E07] active:bg-[#C94304] text-white text-xs font-bold py-1.5 rounded-lg shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Add</span>
              {quantity > 1 && (
                <span className="bg-white/25 text-white text-[11px] px-1 py-0.2 rounded font-extrabold">
                  {quantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </article>

      {/* ========================================================================= */}
      {/* 2. DESKTOP GRID CARD LAYOUT (Active on sm+ screens when viewMode === "grid") */}
      {/* ========================================================================= */}
      {viewMode === "grid" && (
        <article
          className={cn(
            "group bg-white rounded-2xl border border-gray-100/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex-col overflow-hidden hidden sm:flex",
            className
          )}
        >
          {/* Top Image Showcase */}
          <div
            onClick={() => setShowDetailsModal(true)}
            className="relative w-full aspect-[16/11] bg-gray-50 overflow-hidden cursor-pointer"
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            />

            {/* Subtle Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />

            {/* Top-Left Badge */}
            {item.badge && (
              <div className="absolute top-2.5 left-2.5 z-10">
                {isBestseller && (
                  <span className="inline-flex items-center gap-1 bg-[#DC2626] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <span>Bestseller</span>
                  </span>
                )}
                {isPopular && (
                  <span className="inline-flex items-center gap-1 bg-[#F59E0B] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <span>Popular</span>
                  </span>
                )}
                {isNew && (
                  <span className="inline-flex items-center gap-1 bg-[#EC4899] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <span>New</span>
                  </span>
                )}
                {isChefSpecial && (
                  <span className="inline-flex items-center gap-1 bg-[#8B5CF6] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    <span>Chef Special</span>
                  </span>
                )}
              </div>
            )}

            {/* Top-Right Favorite Heart */}
            <button
              onClick={handleToggleFavorite}
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-black/25 backdrop-blur-md flex items-center justify-center hover:bg-black/40 text-white transition-all active:scale-90"
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-colors",
                  isFav ? "fill-[#E11D48] text-[#E11D48]" : "text-white/90 hover:text-white"
                )}
              />
            </button>
          </div>

          {/* Card Content */}
          <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
            <div>
              {/* Title Row with Veg/Non-Veg Icon */}
              <div className="flex items-center justify-between gap-1.5">
                <h3
                  onClick={() => setShowDetailsModal(true)}
                  className="font-bold text-[#111827] text-sm sm:text-[15px] leading-snug tracking-tight truncate group-hover:text-[#FF5A0A] transition-colors cursor-pointer"
                >
                  {item.name}
                </h3>
                <DietaryIndicator isVeg={item.isVeg} />
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed min-h-[32px]">
                {item.description}
              </p>

              {/* Sano Sano ma K K Used Garaiko Xa (Ingredients) */}
              {item.ingredients && item.ingredients.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    <Sparkles className="w-2.5 h-2.5 text-orange-500" />
                    <span>Used Ingredients:</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1">
                    {item.ingredients.slice(0, 3).map((ing, i) => (
                      <span
                        key={i}
                        className="text-[10.5px] text-gray-600 bg-orange-50/60 border border-orange-100/60 px-1.5 py-0.5 rounded-md leading-tight"
                      >
                        {ing}
                      </span>
                    ))}
                    {item.ingredients.length > 3 && (
                      <button
                        type="button"
                        onClick={() => setShowDetailsModal(true)}
                        className="text-[10.5px] text-[#FF5A0A] font-bold hover:underline px-1 py-0.5"
                      >
                        +{item.ingredients.length - 3} more
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Price & Bottom Actions Row */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100/80">
              {/* Price & In-Cart count */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-medium text-gray-400 leading-none">
                    Price
                  </span>
                  {inCartQuantity > 0 && (
                    <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200/70">
                      {inCartQuantity} in cart
                    </span>
                  )}
                </div>
                <span className="text-sm sm:text-base font-bold text-[#FF5A0A] leading-tight">
                  NPR {item.price}
                </span>
              </div>

              {/* Stepper + Add Button */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/80 h-7 sm:h-8 px-1">
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

                {/* Add Button - only adds on click! */}
                <button
                  type="button"
                  data-action="add-to-cart"
                  onClick={handleAddToCart}
                  aria-label={quantity > 1 ? `Add ${quantity} items to cart` : "Add to cart"}
                  className="bg-[#FF5A0A] hover:bg-[#E04E07] active:bg-[#C94304] text-white text-xs sm:text-[13px] font-bold px-3 sm:px-3.5 h-7 sm:h-8 rounded-lg shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Add</span>
                  {quantity > 1 && (
                    <span className="bg-white/25 px-1.5 py-0.2 rounded text-[11px] font-extrabold">
                      {quantity}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* ========================================================================= */}
      {/* 3. INGREDIENTS & CULINARY DETAILS QUICK-MODAL */}
      {/* ========================================================================= */}
      {showDetailsModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative w-full h-44 sm:h-52 bg-gray-100">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, 448px"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <DietaryIndicator isVeg={item.isVeg} />
                {item.badge && (
                  <span className="bg-[#FF5A0A] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  <span className="text-base font-extrabold text-[#FF5A0A]">
                    NPR {item.price}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Prep time & Portion */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                {item.preparationTime && (
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    <span>Prep: {item.preparationTime}</span>
                  </div>
                )}
                {item.portion && (
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Utensils className="w-3.5 h-3.5 text-orange-500" />
                    <span className="truncate">{item.portion}</span>
                  </div>
                )}
              </div>

              {/* Used Ingredients Details */}
              {item.ingredients && item.ingredients.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                    <span>Ingredients Used in Preparation</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {item.ingredients.map((ing, i) => (
                      <li
                        key={i}
                        className="text-xs text-gray-700 flex items-start gap-2 bg-orange-50/40 px-2.5 py-1.5 rounded-lg border border-orange-100/60"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A0A] mt-1.5 flex-shrink-0" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Allergens warning */}
              {item.allergens && item.allergens.length > 0 && (
                <div className="text-xs bg-amber-50/80 border border-amber-200/70 p-2.5 rounded-xl text-amber-800">
                  <span className="font-bold">Allergen Notice: </span>
                  <span>Contains {item.allergens.join(", ")}.</span>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
              {/* Stepper inside modal */}
              <div className="flex items-center border border-gray-200 rounded-lg bg-white h-9 px-2 shadow-2xs">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="w-7 h-full flex items-center justify-center text-gray-600 hover:text-[#FF5A0A] disabled:opacity-30"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-sm font-bold text-gray-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-7 h-full flex items-center justify-center text-gray-600 hover:text-[#FF5A0A]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Modal Add to Cart Button */}
              <button
                type="button"
                data-action="add-to-cart"
                onClick={(e) => {
                  handleAddToCart(e);
                  setShowDetailsModal(false);
                }}
                className="flex-1 bg-[#FF5A0A] hover:bg-[#E04E07] text-white font-bold py-2 px-4 rounded-xl shadow-sm text-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <span>Add {quantity > 1 ? `${quantity} Items` : "to Order"}</span>
                <span>•</span>
                <span>NPR {(item.price * quantity).toLocaleString()}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
