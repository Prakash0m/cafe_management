"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice, getTotalItems } =
    useCartStore();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Shopping Cart ({getTotalItems()})
          </h1>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-rose-500 hover:text-rose-700 font-medium flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h2 className="text-base font-semibold text-gray-800">Your cart is empty</h2>
          <p className="text-xs text-gray-500 mt-1 mb-5">
            Add delicious pizzas, burgers, momo, and drinks from our menu.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Homepage</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="divide-y divide-gray-100 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {items.map((cartItem) => (
              <div
                key={cartItem.id}
                className="p-4 sm:p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={cartItem.item.imageUrl}
                      alt={cartItem.item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                      {cartItem.item.name}
                    </h3>
                    <p className="text-xs text-[#FF5A0A] font-bold mt-0.5">
                      {formatPrice(cartItem.item.price)} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-6">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <button
                      onClick={() =>
                        updateQuantity(cartItem.item.id, cartItem.quantity - 1)
                      }
                      className="p-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-gray-800">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(cartItem.item.id, cartItem.quantity + 1)
                      }
                      className="p-1.5 text-gray-600 hover:bg-gray-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="font-bold text-sm sm:text-base text-gray-900 min-w-[70px] text-right">
                    {formatPrice(cartItem.item.price * cartItem.quantity)}
                  </span>

                  <button
                    onClick={() => removeItem(cartItem.item.id)}
                    className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold block">
                Total Amount
              </span>
              <span className="text-2xl font-black text-[#FF5A0A]">
                {formatPrice(getTotalPrice())}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                href="/"
                className="w-1/2 sm:w-auto text-center px-4 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium hover:bg-white transition-colors"
              >
                Add More Items
              </Link>
              <button
                onClick={() =>
                  alert("Order Checkout flow will connect with Express.js Backend in the next step!")
                }
                className="w-1/2 sm:w-auto bg-[#FF5A0A] hover:bg-[#E04E07] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

