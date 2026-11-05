"use client";

import * as React from "react";
import Link from "next/link";
import { OffersHero } from "@/components/customer/offers/offers-hero";
import { OffersFilter } from "@/components/customer/offers/offers-filter";
import { OfferCard } from "@/components/customer/offers/offer-card";
import { HowToRedeem } from "@/components/customer/offers/how-to-redeem";
import { MOCK_OFFERS } from "@/data/mock/offers-data";
import { OfferCategory } from "@/types/offers.types";
import { useCartStore } from "@/store/cart.store";
import { ShoppingCart, CheckCircle2, ArrowRight } from "lucide-react";

export default function OffersPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<OfferCategory>("all");
  const { appliedCoupon, items } = useCartStore();

  const counts: Record<OfferCategory, number> = React.useMemo(() => {
    return {
      all: MOCK_OFFERS.length,
      weekend: MOCK_OFFERS.filter((o) => o.category === "weekend").length,
      combos: MOCK_OFFERS.filter((o) => o.category === "combos").length,
      beverages: MOCK_OFFERS.filter((o) => o.category === "beverages").length,
      exclusive: MOCK_OFFERS.filter((o) => o.category === "exclusive").length,
    };
  }, []);

  const filteredOffers = React.useMemo(() => {
    if (selectedCategory === "all") return MOCK_OFFERS;
    return MOCK_OFFERS.filter((o) => o.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FBF7F4] flex flex-col">
      {/* 1. Hero Section with Live Flash Countdown */}
      <OffersHero />

      {/* 2. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
        {/* Currently Applied Voucher Bar (if user already activated a voucher) */}
        {appliedCoupon && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm animate-in fade-in duration-300">
            <div className="flex items-center gap-3 text-emerald-900 text-xs sm:text-sm">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-extrabold block text-emerald-800">
                  Active Voucher: {appliedCoupon.code} ({appliedCoupon.discountPercentage}% OFF)
                </span>
                <span className="text-emerald-700/90 text-xs">
                  {appliedCoupon.description}
                </span>
              </div>
            </div>

            <Link
              href="/cart"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm flex-shrink-0"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>View Cart ({items.length} items)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Section Heading & Category Filter Strip */}
        <div className="space-y-4">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Explore Active Promotions
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Filter by category to find the best dining deals for your meal
            </p>
          </div>

          <OffersFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            counts={counts}
          />
        </div>

        {/* 3. Responsive Grid of Voucher Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {filteredOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        {/* 4. How to Redeem Guide */}
        <HowToRedeem />
      </div>
    </div>
  );
}
