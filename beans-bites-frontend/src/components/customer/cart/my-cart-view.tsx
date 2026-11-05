"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trash2, ShoppingCart, ArrowRight, RotateCcw } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { ASSETS } from "@/lib/assets";
import { CartItemRow } from "./cart-item-row";
import { CartCouponSection } from "./cart-coupon-section";
import { BillSummaryCard } from "./bill-summary-card";

interface MyCartViewProps {
  onProceedToOrder: () => void;
  onBack?: () => void;
  compact?: boolean;
}

export function MyCartView({
  onProceedToOrder,
  onBack,
  compact = false,
}: MyCartViewProps) {
  const { items, clearCart, resetToDemoItems } = useCartStore();

  const totalItemCount = items.length;

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.06)] p-4 sm:p-6 flex flex-col justify-between max-w-xl mx-auto w-full transition-all">
      {/* Top Bar with Brand Logo */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-100">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <Link
            href="/menu"
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Go back to menu"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        )}

        {/* Center Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0">
            <Image
              src={ASSETS.brand.favicon}
              alt="Beans & Bites"
              width={32}
              height={32}
              priority
              className="object-contain"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif text-[15px] sm:text-[17px] font-bold text-[#1F140E] leading-tight tracking-tight">
              Beans & Bites
            </span>
            <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.18em] text-[#64748B] font-semibold leading-none">
              CAFÉ & RESTAURANT
            </span>
          </div>
        </div>

        <div className="w-8" />
      </div>

      {/* Screen Title & Clear Cart Row */}
      <div className="flex items-center justify-between pt-4 pb-3">
        <div className="flex items-center gap-2">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="text-gray-900 hover:text-[#FF5A0A] transition-colors p-0.5"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
          ) : (
            <Link
              href="/menu"
              className="text-gray-900 hover:text-[#FF5A0A] transition-colors p-0.5"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </Link>
          )}
          <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
            My Cart ({totalItemCount} {totalItemCount === 1 ? "Item" : "Items"})
          </h1>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DC2626] hover:text-red-700 transition-colors py-1 px-1.5 rounded-lg hover:bg-red-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {/* Cart Content or Empty State */}
      {items.length === 0 ? (
        <div className="py-12 sm:py-16 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-[#FF5A0A] flex items-center justify-center mx-auto shadow-sm">
            <ShoppingCart className="w-8 h-8 stroke-[1.8]" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base">Your Cart is Empty</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
              Explore our chef-curated selection of artisan pizzas, juicy burgers, momos, and drinks.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={resetToDemoItems}
              className="inline-flex items-center gap-2 bg-[#FFF8F3] border border-[#FFE8DC] hover:border-[#FF5A0A] text-[#FF5A0A] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Load 3 Reference Items</span>
            </button>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Cart Items List */}
          <div className="space-y-3">
            {items.map((cartItem) => (
              <CartItemRow key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>

          {/* Coupon Code Section */}
          <CartCouponSection />

          {/* Bill Breakdown (without title to match left screen reference) */}
          <BillSummaryCard showTitle={false} />

          {/* Proceed to Place Order Button */}
          <button
            type="button"
            onClick={onProceedToOrder}
            className="w-full bg-gradient-to-r from-[#FF5A0A] to-[#E04E07] hover:from-[#E04E07] hover:to-[#C63E00] active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2.5 text-sm sm:text-base group"
          >
            <ShoppingCart className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span>Proceed to Place Order</span>
            <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}

