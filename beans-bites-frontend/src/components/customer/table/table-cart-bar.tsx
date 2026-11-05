"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface TableCartBarProps {
  totalItems: number;
  totalPayable: number;
  tableNumber: string;
}

export function TableCartBar({
  totalItems,
  totalPayable,
  tableNumber,
}: TableCartBarProps) {
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-0 right-0 z-40 px-4 pointer-events-none animate-in slide-in-from-bottom-5 duration-300">
      <div className="max-w-xl mx-auto pointer-events-auto">
        <Link
          href="/cart?step=checkout"
          className="w-full bg-[#1A0E08] hover:bg-black text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl flex items-center justify-between border border-white/10 group transition-all active:scale-[0.99]"
        >
          {/* Left: Cart Info & Table Badge */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-[#FF5A0A] flex items-center justify-center text-white flex-shrink-0 shadow-md">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-white text-[#FF5A0A] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base text-white">
                  {formatPrice(totalPayable)}
                </span>
                <span className="text-[11px] text-gray-400 font-medium">
                  ({totalItems} {totalItems === 1 ? "dish" : "dishes"})
                </span>
              </div>
              <span className="text-[10px] text-orange-300 font-semibold block">
                Ordering for {tableNumber}
              </span>
            </div>
          </div>

          {/* Right: Checkout Button Action */}
          <div className="inline-flex items-center gap-1.5 bg-[#FF5A0A] group-hover:bg-[#E04E07] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-sm">
            <span>View Order</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}

