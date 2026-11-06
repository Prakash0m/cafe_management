"use client";

import * as React from "react";
import { ClipboardCheck, UtensilsCrossed } from "lucide-react";

interface OrderMetaBannerProps {
  orderId?: string;
  orderType?: string;
  tableNumber?: string;
}

export function OrderMetaBanner({
  orderId = "#BB1048",
  orderType = "Dine-in",
  tableNumber = "T4",
}: OrderMetaBannerProps) {
  // Normalize table display (e.g. "Table T4 (4 Seats)" -> "T4")
  const cleanTable = tableNumber.replace(/^Table\s+/i, "").split(" ")[0] || "T4";

  return (
    <div className="bg-[#EBFBF0] border border-[#CEF5D6] rounded-2xl p-3.5 sm:p-4 my-5 sm:my-6 shadow-2xs">
      <div className="grid grid-cols-3 divide-x divide-[#B7EFC4]/80 text-center sm:text-left">
        {/* Item 1: Order ID */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 px-2 sm:px-4">
          <div className="w-9 h-9 rounded-xl bg-white border border-[#B7EFC4] text-[#16A34A] flex items-center justify-center flex-shrink-0 shadow-2xs">
            <ClipboardCheck className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-semibold text-gray-500 block leading-tight">
              Order ID
            </span>
            <span className="font-extrabold text-gray-900 text-sm sm:text-base font-mono tracking-tight block truncate">
              {orderId}
            </span>
          </div>
        </div>

        {/* Item 2: Order Type */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 px-2 sm:px-4">
          <div className="w-9 h-9 rounded-xl bg-white border border-[#B7EFC4] text-[#16A34A] flex items-center justify-center flex-shrink-0 shadow-2xs">
            <UtensilsCrossed className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-semibold text-gray-500 block leading-tight">
              Order Type
            </span>
            <span className="font-extrabold text-gray-900 text-sm sm:text-base tracking-tight block truncate capitalize">
              {orderType}
            </span>
          </div>
        </div>

        {/* Item 3: Table Number */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 px-2 sm:px-4">
          <div className="w-9 h-9 rounded-xl bg-white border border-[#B7EFC4] text-[#16A34A] flex items-center justify-center flex-shrink-0 shadow-2xs">
            {/* Custom Table Icon */}
            <svg
              className="w-5 h-5 stroke-[2.2] fill-none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <rect x="3" y="6" width="18" height="4" rx="1.5" />
              <path d="M6 10v10M18 10v10M3 14h18" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-semibold text-gray-500 block leading-tight">
              Table
            </span>
            <span className="font-extrabold text-gray-900 text-sm sm:text-base tracking-tight block truncate">
              {cleanTable}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
