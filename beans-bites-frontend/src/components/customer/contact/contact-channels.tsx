"use client";

import * as React from "react";
import { MessageSquare, Phone, MapPin, ExternalLink, ArrowRight } from "lucide-react";

interface ContactChannelsProps {
  onOpenLiveChat: () => void;
}

export function ContactChannels({ onOpenLiveChat }: ContactChannelsProps) {
  return (
    <section className="py-8 sm:py-12 bg-[#FAF7F4] border-b border-orange-100/60 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#FF5A0A] bg-orange-50 border border-orange-200/80 px-3 py-1 rounded-full inline-block mb-2">
            Instant Communication Channels
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
            Choose How You&apos;d Like to Connect
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. In-System Live Chat */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-[0_2px_12px_rgba(16,185,129,0.06)] hover:shadow-[0_8px_24px_rgba(16,185,129,0.14)] hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/70 text-emerald-600 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10.5px] font-bold border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Now
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">In-System Live Chat</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Chat directly with our Cafe Admin inside this site for live updates on orders, tables, or dietary queries.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenLiveChat}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <span>Chat with Admin</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* 2. WhatsApp Direct */}
          <div className="bg-white rounded-2xl p-5 border border-green-100 shadow-[0_2px_12px_rgba(37,211,102,0.06)] hover:shadow-[0_8px_24px_rgba(37,211,102,0.14)] hover:border-green-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200/70 text-[#25D366] flex items-center justify-center">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.075-1.109-.059-.414-.133-1.02-.348-1.782-.953-.941-.749-1.554-1.688-1.748-2.008-.194-.321-.02-.495.14-.654.144-.144.322-.373.483-.56.16-.188.214-.321.321-.535.107-.214.053-.401-.027-.56-.08-.16-.723-1.742-.991-2.387-.26-.628-.526-.543-.723-.553l-.615-.01c-.214 0-.56.08-.854.401s-1.12 1.096-1.12 2.672c0 1.576 1.147 3.099 1.307 3.313.16.214 2.226 3.4 5.394 4.767.754.325 1.343.519 1.802.665.757.241 1.446.207 1.99.126.608-.09 1.868-.764 2.133-1.502.265-.738.265-1.37.186-1.502-.078-.133-.294-.214-.616-.374z"/>
                  </svg>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-[10.5px] font-bold border border-green-200/60">
                  Mobile Chat
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">WhatsApp Official</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Message our customer care directly on WhatsApp for quick inquiries, menus, or photos.
              </p>
            </div>
            <a
              href="https://wa.me/9779801234567?text=Hi%20Beans%20%26%20Bites%2C%20I%20have%20an%20inquiry%20regarding..."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all active:scale-98"
            >
              <span>Message on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 3. Direct Phone Call */}
          <div className="bg-white rounded-2xl p-5 border border-orange-100 shadow-[0_2px_12px_rgba(255,90,10,0.06)] hover:shadow-[0_8px_24px_rgba(255,90,10,0.14)] hover:border-orange-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200/70 text-[#FF5A0A] flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 text-[10.5px] font-bold border border-orange-200/60">
                  8 AM – 10 PM
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">Direct Phone Support</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Urgent order questions or instant table bookings? Call our front desk staff directly.
              </p>
            </div>
            <a
              href="tel:+97714245678"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all active:scale-98"
            >
              <span>Call +977 1-4245678</span>
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 4. Visit Lakeside Cafe */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-stone-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10.5px] font-bold border border-stone-200">
                  Kathmandu
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">Visit Us In Person</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                Lakeside Avenue, Kathmandu. Experience artisan coffee, cozy booths, and wood-fired pizza in person.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Lakeside+Kathmandu+Nepal"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-black text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all active:scale-98"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
