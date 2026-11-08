"use client";

import * as React from "react";
import { MessageSquare, PhoneCall, MapPin, ExternalLink, ArrowRight } from "lucide-react";

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
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Our guest relations and kitchen support team are available 7 days a week.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. In-System Live Chat */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-orange-100 shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(255,90,10,0.10)] hover:border-orange-200 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Top Header: Icon + Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/70 text-[#FF5A0A] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200/60 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Now
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-extrabold text-gray-900 tracking-tight">In-System Live Chat</h3>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                Chat directly with our Cafe Admin inside the app for live updates on orders, tables, or dietary queries.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenLiveChat}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] text-white text-xs sm:text-[13px] font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <span>Chat Live with Admin</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* 2. Official WhatsApp */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-100 shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.12)] hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Top Header: Icon + Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200/70 text-[#25D366] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 fill-[#25D366]" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200/70 shadow-2xs">
                  Official WhatsApp
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-extrabold text-gray-900 tracking-tight">WhatsApp Direct</h3>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                Message our customer care directly on WhatsApp for instant replies, food photos, and special requests.
              </p>
            </div>

            <a
              href="https://wa.me/9779801234567?text=Hi%20Beans%20%26%20Bites%20Cafe%2C%20I%20have%20an%20inquiry%20regarding..."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-[13px] font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all active:scale-98"
            >
              <span>Chat on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 3. Direct Phone Support */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-stone-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Top Header: Icon + Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-stone-100 border border-stone-200 text-stone-800 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <PhoneCall className="w-5 h-5 text-stone-700" />
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-[11px] font-bold border border-stone-200 shadow-2xs">
                  8 AM – 10 PM
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-extrabold text-gray-900 tracking-tight">Direct Phone Support</h3>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                Urgent order questions or instant table bookings? Call our front desk staff directly.
              </p>
            </div>

            <a
              href="tel:+97714245678"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-black text-white text-xs sm:text-[13px] font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all active:scale-98"
            >
              <span>Call Front Desk</span>
              <PhoneCall className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 4. Visit Lakeside Cafe */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-stone-300 transition-all duration-300 flex flex-col justify-between group">
            <div>
              {/* Top Header: Icon + Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-100 text-[#FF5A0A] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-orange-50 text-orange-800 text-[11px] font-bold border border-orange-200 shadow-2xs">
                  Kathmandu
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-extrabold text-gray-900 tracking-tight">Visit Us In Person</h3>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                Lakeside Avenue, Kathmandu. Experience artisan coffee, cozy booths, and wood-fired pizza in person.
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=Lakeside+Kathmandu+Nepal"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs sm:text-[13px] font-bold py-2.5 px-4 rounded-xl border border-stone-200 transition-all active:scale-98"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
