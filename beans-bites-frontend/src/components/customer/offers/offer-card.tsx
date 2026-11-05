"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Tag,
  Copy,
  Check,
  ShoppingCart,
  Clock,
  Info,
  ChevronDown,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { OfferDeal } from "@/types/offers.types";
import { useCartStore } from "@/store/cart.store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface OfferCardProps {
  offer: OfferDeal;
}

export function OfferCard({ offer }: OfferCardProps) {
  const { appliedCoupon, applyCoupon } = useCartStore();
  const [copied, setCopied] = React.useState(false);
  const [showTerms, setShowTerms] = React.useState(false);

  const isCurrentApplied = appliedCoupon?.code === offer.couponCode;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(offer.couponCode);
      setCopied(true);
      toast.success(`Copied "${offer.couponCode}"!`, {
        description: `Apply at checkout for ${offer.discountDisplay}.`,
      });
      setTimeout(() => setCopied(false), 2200);
    } catch {
      toast.error("Failed to copy code to clipboard");
    }
  };

  const handleApplyToCart = () => {
    const res = applyCoupon(offer.couponCode);
    if (res.success) {
      toast.success(`Coupon ${offer.couponCode} Activated!`, {
        description: res.message,
        action: {
          label: "View Cart",
          onClick: () => {
            window.location.href = "/cart";
          },
        },
      });
    } else {
      toast.error("Could not apply coupon", { description: res.message });
    }
  };

  const getBadgeStyle = () => {
    switch (offer.badgeType) {
      case "hot":
        return "bg-gradient-to-r from-red-600 to-[#FF5A0A] text-white";
      case "limited":
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white";
      case "bestseller":
        return "bg-gradient-to-r from-orange-600 to-amber-600 text-white";
      case "new":
        return "bg-gradient-to-r from-emerald-600 to-teal-600 text-white";
      case "exclusive":
      default:
        return "bg-gradient-to-r from-purple-600 to-indigo-600 text-white";
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl border border-gray-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(255,90,10,0.12)] hover:border-orange-200 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Media & Discount Overlay */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-gray-100">
        <Image
          src={offer.imageUrl}
          alt={offer.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1",
              getBadgeStyle()
            )}
          >
            <Sparkles className="w-3 h-3" />
            <span>{offer.badge}</span>
          </span>

          {offer.featured && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-gray-900 backdrop-blur-md shadow">
              ⭐ Featured
            </span>
          )}
        </div>

        {/* Big Discount Callout on Bottom Left of Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10 text-white">
          <div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-white drop-shadow-md">
              {offer.discountDisplay}
            </div>
            <p className="text-xs font-semibold text-white/90 mt-1 line-clamp-1 drop-shadow">
              {offer.tagline}
            </p>
          </div>
          {offer.minOrder && (
            <div className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 text-right">
              <span className="text-[10px] text-white/80 block uppercase tracking-wider">
                Min. Spend
              </span>
              <span className="text-xs font-bold text-white">
                NPR {offer.minOrder}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Voucher Cutout Notches (Left & Right ticket indentations) */}
      <div className="relative w-full h-0">
        <div className="absolute -left-3.5 -top-3.5 w-7 h-7 rounded-full bg-[#FBF7F4] border-r border-gray-100 z-10 shadow-inner" />
        <div className="absolute -right-3.5 -top-3.5 w-7 h-7 rounded-full bg-[#FBF7F4] border-l border-gray-100 z-10 shadow-inner" />
        <div className="border-b-2 border-dashed border-gray-200 w-full" />
      </div>

      {/* Body Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-[#FF5A0A] transition-colors line-clamp-1">
            {offer.title}
          </h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed line-clamp-2">
            {offer.description}
          </p>

          {/* Validity & Applicability row */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-gray-500 font-medium">
            <span className="inline-flex items-center gap-1 bg-orange-50 text-[#FF5A0A] px-2 py-0.5 rounded-md font-semibold">
              <Clock className="w-3 h-3" />
              <span>{offer.validity}</span>
            </span>
            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
              <Tag className="w-3 h-3 text-gray-400" />
              <span>{offer.applicableItemsText}</span>
            </span>
          </div>
        </div>

        {/* Voucher Code Box */}
        <div className="bg-[#FFF8F3] border border-[#FFE8DC] rounded-2xl p-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block">
              Promo Code
            </span>
            <span className="font-mono text-base font-extrabold text-[#FF5A0A] tracking-wider truncate block">
              {offer.couponCode}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#FFD0B8] hover:border-[#FF5A0A] text-xs font-bold text-gray-800 transition-all active:scale-95 shadow-sm"
            aria-label={`Copy code ${offer.couponCode}`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span className="text-emerald-700 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#FF5A0A]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons Row */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleApplyToCart}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98",
                isCurrentApplied
                  ? "bg-emerald-600 text-white shadow-emerald-500/20"
                  : "bg-gradient-to-r from-[#FF5A0A] to-[#E04E07] hover:from-[#E04E07] hover:to-[#C63E00] text-white shadow-orange-500/20"
              )}
            >
              {isCurrentApplied ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Applied in Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Apply Code to Cart</span>
                </>
              )}
            </button>

            <Link
              href="/menu"
              className="py-2.5 px-3.5 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1"
              title="Browse Applicable Food Items"
            >
              <span>Order</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Terms & Conditions accordion trigger */}
          <div>
            <button
              type="button"
              onClick={() => setShowTerms(!showTerms)}
              className="w-full flex items-center justify-between text-[11px] font-semibold text-gray-500 hover:text-gray-900 transition-colors pt-1"
            >
              <span className="inline-flex items-center gap-1">
                <Info className="w-3 h-3 text-gray-400" />
                <span>Terms & Conditions</span>
              </span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-200",
                  showTerms && "rotate-180 text-gray-800"
                )}
              />
            </button>

            {showTerms && (
              <div className="mt-2 p-2.5 bg-gray-50/90 rounded-xl border border-gray-100 text-[11px] text-gray-600 space-y-1 animate-in fade-in duration-200">
                {offer.terms.map((term, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#FF5A0A] font-bold">•</span>
                    <span>{term}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
