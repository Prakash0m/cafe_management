"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Sparkles, SlidersHorizontal, QrCode, ShieldCheck } from "lucide-react";
import { ASSETS } from "@/lib/assets";

interface TableHeaderProps {
  tableNumber: string;
  onOpenQrModal: () => void;
  onOpenStaffModal?: () => void;
}

export function TableHeader({
  tableNumber,
  onOpenQrModal,
  onOpenStaffModal,
}: TableHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Left: Back Arrow + Table Identity */}
        <div className="flex items-center gap-2.5 min-w-0">
          <Link
            href="/"
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-orange-50 text-gray-700 hover:text-[#FF5A0A] flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2 min-w-0">
            <div className="relative w-7 h-7 flex-shrink-0">
              <Image
                src={ASSETS.brand.favicon}
                alt="Beans & Bites"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <h1 className="font-bold text-gray-900 text-sm sm:text-base truncate tracking-tight">
                  {tableNumber}
                </h1>
              </div>
              <span className="text-[10px] text-gray-500 font-medium block truncate">
                Dine-In • Digital QR Menu
              </span>
            </div>
          </div>
        </div>

        {/* Right: QR Code Action & Staff Backend Sync */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {onOpenStaffModal && (
            <button
              type="button"
              onClick={onOpenStaffModal}
              className="inline-flex items-center gap-1 bg-orange-50 hover:bg-orange-100 text-[#FF5A0A] text-[11px] font-bold px-2.5 py-1.5 rounded-xl border border-orange-200/80 transition-colors shadow-xs"
              title="Edit ingredients via Backend API"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span className="hidden sm:inline">Backend API</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenQrModal}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-1 text-[11px] font-semibold transition-colors"
            title="View Table QR Code"
          >
            <QrCode className="w-4 h-4 text-[#FF5A0A]" />
            <span className="hidden sm:inline">QR Code</span>
          </button>
        </div>
      </div>
    </header>
  );
}
