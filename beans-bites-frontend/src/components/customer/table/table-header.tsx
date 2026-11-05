"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, ShieldCheck } from "lucide-react";
import { ASSETS } from "@/lib/assets";

interface TableHeaderProps {
  tableNumber: string;
  totalCartItems: number;
}

export function TableHeader({
  tableNumber,
  totalCartItems,
}: TableHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-2xs transition-all">
      <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Brand Logo & Scanned Table Identity */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center p-1 flex-shrink-0 shadow-2xs">
            <Image
              src={ASSETS.brand.favicon}
              alt="Beans & Bites"
              width={26}
              height={26}
              priority
              className="object-contain"
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <h1 className="font-extrabold text-gray-900 text-sm sm:text-base truncate tracking-tight">
                {tableNumber}
              </h1>
            </div>
            <span className="text-[10px] text-gray-500 font-semibold block truncate">
              Dine-In • Live Digital Menu
            </span>
          </div>
        </div>

        {/* Right: Verified Dine-In & Direct Cart Shortcut */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden sm:inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[11px] font-bold px-2 py-1 rounded-xl">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Table Connected</span>
          </div>

          <Link
            href="/cart?step=checkout"
            className="relative p-2 rounded-xl bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-[#FF5A0A] border border-gray-200/80 transition-colors flex items-center justify-center"
            aria-label="View Order"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF5A0A] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {totalCartItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
