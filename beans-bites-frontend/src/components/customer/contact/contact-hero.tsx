"use client";

import * as React from "react";
import Link from "next/link";
import { MessageSquare, Phone, ChevronRight } from "lucide-react";

interface ContactHeroProps {
  onOpenLiveChat: () => void;
}

export function ContactHero({ onOpenLiveChat }: ContactHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#180B06] via-[#21110A] to-[#180B06] text-white pt-5 pb-8 sm:pt-12 sm:pb-16 border-b border-orange-950/40 select-none">
      {/* Subtle Warm Amber Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(255,90,10,0.22),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] sm:text-xs text-orange-200/70 mb-3 sm:mb-6">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-orange-400/60" />
          <span className="text-[#FF7A24] font-medium">Contact & Support</span>
        </nav>

        <div className="max-w-3xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-black/40 backdrop-blur-md border border-white/15 px-2.5 sm:px-3 py-1 rounded-full text-[10.5px] sm:text-xs font-semibold mb-2.5 sm:mb-3.5 shadow-sm text-white/95">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-emerald-400 font-bold">Live Support Active</span>
            <span className="text-white/40">•</span>
            <span className="text-gray-200">Replies in &lt; 2 mins</span>
          </div>

          {/* Heading with whitespace-nowrap on 'From You' so it never breaks awkwardly */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            We&apos;d Love to Hear{" "}
            <span className="text-[#FF5A0A] font-serif italic whitespace-nowrap">From You</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-gray-300/90 leading-relaxed font-normal max-w-2xl">
            Have questions about an active order, table reservation, dietary requests, or catering a celebration?
            Connect with our admin team via in-app Live Chat, WhatsApp, or phone.
          </p>

          {/* Action Buttons: Responsive Layout (Full width primary + 2-col secondary on mobile, 1 row on desktop) */}
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
            {/* Primary Live Chat Button */}
            <button
              type="button"
              onClick={onOpenLiveChat}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-orange-950/30 transition-all active:scale-98 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 flex-shrink-0" />
              <span>Start In-System Live Chat</span>
            </button>

            {/* Secondary Buttons: 2 Equal Columns on Mobile, Flex on Desktop */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-3">
              <a
                href="https://wa.me/9779801234567?text=Hello%20Beans%20%26%20Bites%20Cafe%2C%20I%20have%20an%20inquiry%20regarding..."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-98 text-center"
              >
                <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="truncate">WhatsApp</span>
              </a>

              <a
                href="tel:+97714245678"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2.5 rounded-xl border border-white/15 transition-all active:scale-98 text-center"
              >
                <Phone className="w-3.5 h-3.5 text-orange-300 flex-shrink-0" />
                <span className="truncate">Call Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
