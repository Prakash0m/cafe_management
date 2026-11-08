"use client";

import * as React from "react";
import Link from "next/link";
import { MessageSquare, Phone, ChevronRight } from "lucide-react";

interface ContactHeroProps {
  onOpenLiveChat: () => void;
}

export function ContactHero({ onOpenLiveChat }: ContactHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#180B06] via-[#21110A] to-[#180B06] text-white pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-orange-950/40 select-none">
      {/* Subtle Warm Amber Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(255,90,10,0.22),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-orange-200/70 mb-4 sm:mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-orange-400/60" />
          <span className="text-[#FF7A24] font-medium">Contact & Support</span>
        </nav>

        <div className="max-w-3xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold mb-3.5 shadow-sm text-white/95">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">Live Support Active</span>
            <span className="text-white/40">•</span>
            <span>Typically replies in under 2 mins</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            We&apos;d Love to Hear <span className="text-[#FF5A0A] font-serif italic">From You</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-2.5 sm:mt-3 text-sm sm:text-base text-gray-300/90 leading-relaxed font-normal max-w-2xl">
            Have questions about an active order, table reservation, dietary requests, or catering a celebration?
            Connect with our admin team via in-app Live Chat, WhatsApp, or phone.
          </p>

          {/* Fast Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              type="button"
              onClick={onOpenLiveChat}
              className="inline-flex items-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-orange-950/30 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Start In-System Live Chat</span>
            </button>

            <a
              href="https://wa.me/9779801234567?text=Hello%20Beans%20%26%20Bites%20Cafe%2C%20I%20have%20an%20inquiry%20regarding..."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-950/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.075-1.109-.059-.414-.133-1.02-.348-1.782-.953-.941-.749-1.554-1.688-1.748-2.008-.194-.321-.02-.495.14-.654.144-.144.322-.373.483-.56.16-.188.214-.321.321-.535.107-.214.053-.401-.027-.56-.08-.16-.723-1.742-.991-2.387-.26-.628-.526-.543-.723-.553l-.615-.01c-.214 0-.56.08-.854.401s-1.12 1.096-1.12 2.672c0 1.576 1.147 3.099 1.307 3.313.16.214 2.226 3.4 5.394 4.767.754.325 1.343.519 1.802.665.757.241 1.446.207 1.99.126.608-.09 1.868-.764 2.133-1.502.265-.738.265-1.37.186-1.502-.078-.133-.294-.214-.616-.374z"/>
              </svg>
              <span>WhatsApp Direct</span>
            </a>

            <a
              href="tel:+97714245678"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/15 transition-all active:scale-95"
            >
              <Phone className="w-4 h-4 text-orange-300" />
              <span>+977 1-4245678</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
