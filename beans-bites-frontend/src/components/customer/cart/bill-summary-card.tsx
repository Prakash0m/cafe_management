"use client";

import * as React from "react";
import { Info } from "lucide-react";
import { useCartStore } from "@/store/cart.store";

interface BillSummaryCardProps {
  showTitle?: boolean;
}

export function BillSummaryCard({ showTitle = true }: BillSummaryCardProps) {
  const {
    getTotalItems,
    getSubtotal,
    getDiscountAmount,
    getServiceCharge,
    getVat,
    getTotalPayable,
    appliedCoupon,
  } = useCartStore();

  const totalItems = getTotalItems();
  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const serviceCharge = getServiceCharge();
  const vat = getVat();
  const totalPayable = getTotalPayable();

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3.5">
      {showTitle && (
        <h3 className="font-bold text-gray-900 text-base sm:text-lg tracking-tight">
          Bill Summary
        </h3>
      )}

      {/* Breakdown Rows */}
      <div className="space-y-2 text-xs sm:text-sm">
        {/* Subtotal */}
        <div className="flex items-center justify-between text-gray-600">
          <span>Subtotal ({totalItems} Items)</span>
          <span className="font-semibold text-gray-900">
            NPR {subtotal.toLocaleString()}
          </span>
        </div>

        {/* Discount */}
        {discount > 0 && appliedCoupon && (
          <div className="flex items-center justify-between text-emerald-600 font-medium">
            <span>
              Discount ({appliedCoupon.code} - {appliedCoupon.discountPercentage}%)
            </span>
            <span>- NPR {discount.toLocaleString()}</span>
          </div>
        )}

        {/* Service Charge */}
        <div className="flex items-center justify-between text-gray-600">
          <div className="flex items-center gap-1">
            <span>Service Charge (5%)</span>
            <span
              title="Standard restaurant dining & hospitality service charge"
              className="text-gray-400 hover:text-gray-600 cursor-help"
            >
              <Info className="w-3.5 h-3.5" />
            </span>
          </div>
          <span className="font-semibold text-gray-900">
            NPR {serviceCharge.toLocaleString()}
          </span>
        </div>

        {/* VAT */}
        <div className="flex items-center justify-between text-gray-600">
          <span>VAT (13%)</span>
          <span className="font-semibold text-gray-900">
            NPR {vat.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Highlight Total Payable Container */}
      <div className="bg-[#FFF8F3] border border-[#FFE8DC] rounded-xl p-3 sm:p-3.5 flex items-center justify-between">
        <span className="font-bold text-gray-900 text-sm sm:text-base">
          Total Payable
        </span>
        <span className="font-extrabold text-[#FF5A0A] text-base sm:text-lg">
          NPR {totalPayable.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

