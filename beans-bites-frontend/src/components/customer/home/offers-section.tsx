"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Tag } from "lucide-react";
import { MOCK_OFFERS } from "@/data/mock/offers-data";
import { OfferCard } from "@/components/customer/offers/offer-card";

export function OffersSection() {
  // Show top 3 featured offers on homepage
  const featuredOffers = MOCK_OFFERS.slice(0, 3);

  return (
    <section className="w-full bg-[#FBF7F4] py-12 sm:py-16 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#FF5A0A] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Special Offers & Vouchers</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Culinary Deals & Discounts
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
              Enjoy handcrafted food and specialty coffee with exclusive savings.
              Copy coupon codes or activate them directly to your order with one tap.
            </p>
          </div>

          <Link
            href="/offers"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#FF5A0A] hover:text-[#E04E07] bg-white border border-orange-200 hover:border-[#FF5A0A] px-4 py-2.5 rounded-xl transition-all shadow-sm flex-shrink-0 group"
          >
            <Tag className="w-4 h-4" />
            <span>View All 6 Offers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Featured Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {featuredOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}

