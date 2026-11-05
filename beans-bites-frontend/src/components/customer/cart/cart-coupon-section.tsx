"use client";

import * as React from "react";
import { Tag, Check, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { toast } from "sonner";

export function CartCouponSection() {
  const { appliedCoupon, applyCoupon, removeCoupon } = useCartStore();
  const [couponInput, setCouponInput] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (res.success) {
      toast.success("Coupon Applied", { description: res.message });
      setIsEditing(false);
      setCouponInput("");
    } else {
      toast.error("Invalid Coupon", { description: res.message });
    }
  };

  const handleRemove = () => {
    removeCoupon();
    toast.info("Coupon Removed");
    setIsEditing(false);
    setCouponInput("");
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-2.5">
      {/* Coupon input/display row */}
      <div className="flex items-center justify-between gap-2.5">
        {/* Left Label */}
        <div className="flex items-center gap-1.5 text-gray-800 font-semibold text-xs sm:text-sm flex-shrink-0">
          <Tag className="w-4 h-4 text-[#FF5A0A]" />
          <span>Apply Coupon</span>
        </div>

        {/* Right Input / Pill */}
        {appliedCoupon && !isEditing ? (
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 border border-emerald-300 bg-emerald-50/60 text-emerald-800 font-bold text-xs px-2.5 py-1 rounded-lg">
              <span>{appliedCoupon.code}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="text-xs font-semibold text-[#DC2626] hover:text-red-700 hover:underline px-1 py-1"
            >
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="flex items-center gap-1.5 flex-1 max-w-[220px]">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
              placeholder="e.g. WEEKEND20"
              className="w-full text-xs uppercase font-semibold tracking-wider px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#FF5A0A] bg-gray-50/60"
            />
            <button
              type="submit"
              className="bg-[#FF5A0A] hover:bg-[#E04E07] text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors flex-shrink-0"
            >
              Apply
            </button>
          </form>
        )}
      </div>

      {/* Success banner when coupon is applied */}
      {appliedCoupon && (
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs px-3 py-1.5 rounded-xl font-medium animate-in fade-in duration-200">
          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          <span>{appliedCoupon.description}</span>
        </div>
      )}
    </div>
  );
}
