"use client";

import * as React from "react";
import { OrderType } from "@/types/cart.types";
import { useCartStore } from "@/store/cart.store";
import { ShoppingBag, ShoppingCart, Bike } from "lucide-react";
import { cn } from "@/lib/utils";

export function OrderTypeSelector() {
  const { orderType, setOrderType } = useCartStore();

  const options: Array<{
    type: OrderType;
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      type: "dine-in",
      label: "Dine-in",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
    {
      type: "takeaway",
      label: "Takeaway",
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      type: "delivery",
      label: "Delivery",
      icon: <Bike className="w-5 h-5" />,
    },
  ];

  return (
    <div className="space-y-2.5">
      <h3 className="font-bold text-gray-900 text-sm sm:text-base tracking-tight">
        Order Type
      </h3>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {options.map((opt) => {
          const isSelected = orderType === opt.type;

          return (
            <button
              key={opt.type}
              type="button"
              onClick={() => setOrderType(opt.type)}
              className={cn(
                "flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl border transition-all duration-150 select-none text-center gap-2",
                isSelected
                  ? "border-[#FF5A0A] bg-[#FFF8F3] text-[#FF5A0A] shadow-sm ring-1 ring-[#FF5A0A]/30"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50/50"
              )}
            >
              <div
                className={cn(
                  "p-1.5 rounded-xl transition-colors",
                  isSelected ? "text-[#FF5A0A]" : "text-gray-500"
                )}
              >
                {opt.icon}
              </div>

              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors",
                    isSelected
                      ? "border-[#FF5A0A] bg-white"
                      : "border-gray-300 bg-transparent"
                  )}
                >
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#FF5A0A]" />
                  )}
                </span>
                <span className="font-bold text-xs sm:text-sm">{opt.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
