"use client";

import * as React from "react";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  Flame,
  AlertTriangle,
  Sparkles,
  ChefHat,
  UtensilsCrossed,
  Layers,
  Heart,
} from "lucide-react";
import { FoodItem } from "@/types/menu.types";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface FoodDetailsSheetProps {
  item: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  quantityInCart: number;
  onSaveToCart: (item: FoodItem, quantity: number, notes?: string) => void;
}

export function FoodDetailsSheet({
  item,
  isOpen,
  onClose,
  quantityInCart,
  onSaveToCart,
}: FoodDetailsSheetProps) {
  const [quantity, setQuantity] = React.useState(1);
  const [specialNote, setSpecialNote] = React.useState("");

  React.useEffect(() => {
    if (item) {
      setQuantity(quantityInCart > 0 ? quantityInCart : 1);
      setSpecialNote("");
    }
  }, [item, quantityInCart]);

  // Lock body scroll when sheet is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const handleAdd = () => {
    onSaveToCart(item, quantity, specialNote);
    onClose();
  };

  const totalPrice = item.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-Up Bottom Sheet Card */}
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] sm:max-h-[85vh] flex flex-col overflow-hidden shadow-2xl z-10 animate-in slide-in-from-bottom duration-300">
        {/* Top Sticky Drag Handle & Close Button */}
        <div className="relative bg-white pt-2.5 pb-1 px-4 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2 sm:hidden" />
          <div className="flex items-center gap-2 pt-1 sm:pt-0">
            <span
              className={cn(
                "w-3.5 h-3.5 rounded-[4px] border flex items-center justify-center p-[2px]",
                item.isVeg ? "border-emerald-600" : "border-[#DC2626]"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  item.isVeg ? "bg-emerald-600" : "bg-[#DC2626]"
                )}
              />
            </span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {item.isVeg ? "Vegetarian" : "Non-Vegetarian"}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
            aria-label="Close food details"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Food Photography Header */}
          <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 500px"
              className="object-cover"
            />
            {item.badge && (
              <span className="absolute top-3 left-3 bg-[#FF5A0A] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-lg shadow-sm">
                {item.badge}
              </span>
            )}
            <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-xl">
              {formatPrice(item.price)}
            </div>
          </div>

          {/* Title & Quick Stats */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-tight">
              {item.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
              {item.description}
            </p>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-gray-500 font-medium">
              {item.preparationTime && (
                <span className="inline-flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  <span>Prep: {item.preparationTime}</span>
                </span>
              )}
              {item.calories && (
                <span className="inline-flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>{item.calories} kcal</span>
                </span>
              )}
              {item.portion && (
                <span className="inline-flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                  <Layers className="w-3.5 h-3.5 text-blue-500" />
                  <span>{item.portion}</span>
                </span>
              )}
            </div>
          </div>

          {/* SECTION 1: INGREDIENTS USED (Foods Vitra K K Used Gareko Chha) */}
          <div className="bg-[#FFF9F5] border border-orange-200/80 rounded-2xl p-3.5 sm:p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#FF5A0A] font-bold text-xs sm:text-sm">
                <Sparkles className="w-4 h-4 fill-[#FF5A0A]" />
                <span className="uppercase tracking-wider">
                  Foods Vitra K K Used Gareko Chha (Ingredients)
                </span>
              </div>
              <span className="text-[10px] bg-orange-100 text-[#FF5A0A] font-bold px-2 py-0.5 rounded-full">
                {item.ingredients ? item.ingredients.length : 0} Items
              </span>
            </div>

            {item.ingredients && item.ingredients.length > 0 ? (
              <ul className="space-y-1.5 pt-1">
                {item.ingredients.map((ing, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs sm:text-[13px] text-gray-800 leading-snug"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{ing}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-500 italic">
                Prepared with our chef&apos;s blend of fresh artisan ingredients, pure olive oil, and organic mountain herbs.
              </p>
            )}
          </div>

          {/* SECTION 2: CHEF PREPARATION & ALLERGENS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Chef Kitchen Notes */}
            <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100 space-y-1">
              <div className="flex items-center gap-1.5 text-gray-800 text-xs font-bold">
                <ChefHat className="w-3.5 h-3.5 text-[#FF5A0A]" />
                <span>Kitchen Preparation</span>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                {item.chefNotes ||
                  "Cooked fresh to order by our kitchen team using authentic cafe recipes."}
              </p>
            </div>

            {/* Allergens & Spiciness */}
            <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100 space-y-1.5">
              <div className="flex items-center gap-1.5 text-gray-800 text-xs font-bold">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span>Allergen & Spice Notice</span>
              </div>
              <div className="text-[11px] text-gray-600 leading-relaxed">
                {item.allergens && item.allergens.length > 0 ? (
                  <span className="block font-medium text-amber-900">
                    Contains: {item.allergens.join(", ")}
                  </span>
                ) : (
                  <span>No major common allergens reported.</span>
                )}
                <span className="block text-[10px] text-gray-400 mt-0.5">
                  Spice: {item.spiciness ? item.spiciness.toUpperCase() : "MILD"}
                </span>
              </div>
            </div>
          </div>

          {/* Special Cooking Note for Chef */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-700 block">
              Special Kitchen Instructions (Optional)
            </label>
            <input
              type="text"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="e.g. Less spicy, no onion, extra crispy..."
              maxLength={120}
              className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF5A0A]/20 focus:border-[#FF5A0A]"
            />
          </div>
        </div>

        {/* Bottom Bar: Quantity Selector & Add Button */}
        <div className="bg-white border-t border-gray-100 p-3 sm:p-4 flex items-center gap-3 flex-shrink-0">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-gray-100 rounded-2xl p-1 shadow-inner">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-xl bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center transition-colors shadow-2xs"
              aria-label="Decrease"
            >
              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
            <span className="w-8 text-center font-bold text-sm text-gray-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-xl bg-white hover:bg-gray-50 text-gray-700 flex items-center justify-center transition-colors shadow-2xs"
              aria-label="Increase"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 bg-gradient-to-r from-[#FF5A0A] to-[#E04E07] hover:from-[#E04E07] hover:to-[#C63E00] active:scale-[0.99] text-white font-bold py-3 px-4 rounded-2xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-between text-xs sm:text-sm"
          >
            <span>
              {quantityInCart > 0 ? "Update in Order" : "Add to Order"}
            </span>
            <span className="font-extrabold">{formatPrice(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

