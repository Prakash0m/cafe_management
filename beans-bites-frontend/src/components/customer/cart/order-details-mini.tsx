"use client";

import * as React from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart.store";

export function OrderDetailsMini() {
  const { items } = useCartStore();

  return (
    <div className="space-y-2.5">
      <h3 className="font-bold text-gray-900 text-sm sm:text-base tracking-tight">
        Order Details
      </h3>

      <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] divide-y divide-gray-100">
        {items.map((cartItem) => {
          const itemTotal = cartItem.item.price * cartItem.quantity;

          return (
            <div
              key={cartItem.id}
              className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                  <Image
                    src={cartItem.item.imageUrl}
                    alt={cartItem.item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                    {cartItem.item.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                    NPR {cartItem.item.price} × {cartItem.quantity}
                  </p>
                </div>
              </div>

              <span className="font-bold text-gray-900 text-xs sm:text-sm flex-shrink-0">
                NPR {itemTotal.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

