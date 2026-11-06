"use client";

import * as React from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { CartItem } from "@/types/cart.types";
import { ASSETS } from "@/lib/assets";

interface OrderSummaryCardProps {
  items?: CartItem[];
  totalItemCount?: number;
  subtotal?: number;
  discount?: number;
  discountCode?: string;
  serviceCharge?: number;
  vat?: number;
  totalPaid?: number;
}

export function OrderSummaryCard({
  items,
  totalItemCount = 4,
  subtotal = 1420,
  discount = 284,
  discountCode = "WEEKEND20 - 20%",
  serviceCharge = 57,
  vat = 148,
  totalPaid = 1341,
}: OrderSummaryCardProps) {
  // Reference items matching stitch screenshot
  const displayItems =
    items && items.length > 0
      ? items
      : [
          {
            id: "ord-item-1",
            item: {
              id: "pizza-1",
              name: "Margherita Pizza",
              price: 420,
              imageUrl: ASSETS.food.pizza.margherita,
            },
            quantity: 1,
          },
          {
            id: "ord-item-2",
            item: {
              id: "burger-1",
              name: "Chicken Burger",
              price: 380,
              imageUrl: ASSETS.food.burger.chicken,
            },
            quantity: 2,
          },
          {
            id: "ord-item-3",
            item: {
              id: "latte-1",
              name: "Iced Latte",
              price: 240,
              imageUrl: ASSETS.food.beverages.icedLatte,
            },
            quantity: 1,
          },
        ];

  const calculatedItemsCount =
    items && items.length > 0
      ? items.reduce((acc, ci) => acc + ci.quantity, 0)
      : totalItemCount;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <h2 className="font-extrabold text-gray-900 text-sm sm:text-base tracking-tight">
          Order Summary
        </h2>
        <span className="text-xs font-semibold text-gray-500">
          {calculatedItemsCount} Items
        </span>
      </div>

      {/* Food Items List */}
      <div className="divide-y divide-gray-50">
        {displayItems.map((ci) => {
          const itemTotal = ci.item.price * ci.quantity;

          return (
            <div
              key={ci.id}
              className="py-2.5 sm:py-3 flex items-center justify-between gap-3"
            >
              {/* Left: Thumbnail & Name with quantity */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-2xs">
                  <Image
                    src={ci.item.imageUrl || ASSETS.food.pizza.margherita}
                    alt={ci.item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 text-xs sm:text-[13px] truncate">
                    {ci.item.name}{" "}
                    <span className="text-gray-500 font-semibold">
                      × {ci.quantity}
                    </span>
                  </h3>
                </div>
              </div>

              {/* Right: Item Total Price */}
              <div className="font-extrabold text-gray-900 text-xs sm:text-[13px] font-mono flex-shrink-0">
                {formatPrice(itemTotal)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bill Calculations Breakdown */}
      <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900 font-mono">
            {formatPrice(subtotal)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex items-center justify-between text-[#16A34A]">
            <span>Discount ({discountCode})</span>
            <span className="font-bold font-mono">- {formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-gray-600">
          <span className="inline-flex items-center gap-1">
            <span>Service Charge (5%)</span>
            <span className="w-3.5 h-3.5 rounded-full bg-gray-100 text-gray-400 inline-flex items-center justify-center text-[10px]">
              i
            </span>
          </span>
          <span className="font-semibold text-gray-900 font-mono">
            {formatPrice(serviceCharge)}
          </span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span>VAT (13%)</span>
          <span className="font-semibold text-gray-900 font-mono">
            {formatPrice(vat)}
          </span>
        </div>
      </div>

      {/* Total Paid Capsule */}
      <div className="bg-[#FFF5ED] border border-[#FFE8DC] rounded-xl p-3 sm:p-3.5 flex items-center justify-between mt-3">
        <span className="font-bold text-gray-900 text-sm sm:text-base">
          Total Paid
        </span>
        <span className="font-black text-[#FF5A0A] text-base sm:text-lg font-mono">
          {formatPrice(totalPaid)}
        </span>
      </div>
    </div>
  );
}
