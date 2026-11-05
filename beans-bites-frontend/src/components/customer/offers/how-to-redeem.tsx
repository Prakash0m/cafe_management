"use client";

import * as React from "react";
import Link from "next/link";
import { Utensils, Ticket, Wallet, ArrowRight } from "lucide-react";

export function HowToRedeem() {
  const steps = [
    {
      step: "01",
      title: "Select Your Favorite Food",
      description:
        "Browse our artisan pizzas, burgers, momos, and coffees. Add your favorite dishes to your cart.",
      icon: <Utensils className="w-5 h-5 text-[#FF5A0A]" />,
    },
    {
      step: "02",
      title: "Activate Voucher Code",
      description:
        "Copy your preferred coupon code from this page or click 'Apply Code to Cart' for 1-click activation.",
      icon: <Ticket className="w-5 h-5 text-[#FF5A0A]" />,
    },
    {
      step: "03",
      title: "Instant Savings at Checkout",
      description:
        "Your bill recalculates automatically with 10% to 30% discount applied to your final payable total.",
      icon: <Wallet className="w-5 h-5 text-[#FF5A0A]" />,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#FFF8F3] to-white rounded-3xl border border-[#FFE8DC] p-6 sm:p-10 my-10 shadow-sm">
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <span className="text-xs uppercase font-extrabold tracking-wider text-[#FF5A0A] bg-orange-100 px-3 py-1 rounded-full">
          Simple 3-Step Process
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          How to Redeem Your Offers
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Redeeming promotional vouchers is fast and hassle-free whether dining in,
          ordering takeaway, or requesting delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {steps.map((item) => (
          <div
            key={item.step}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] relative flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shadow-inner">
                  {item.icon}
                </div>
                <span className="font-mono text-2xl font-black text-orange-200">
                  {item.step}
                </span>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg shadow-orange-500/20 transition-all"
        >
          <span>Explore Food Menu Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
