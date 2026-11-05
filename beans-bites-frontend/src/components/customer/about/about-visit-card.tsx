"use client";

import * as React from "react";
import Link from "next/link";
import { MapPin, Clock, Phone, Mail, ArrowRight, Utensils, Wifi, Coffee } from "lucide-react";

export function AboutVisitCard() {
  return (
    <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#1E110A] to-[#2D160C] text-white p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl border border-orange-500/20">
          {/* Subtle ambient light circles */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#FF5A0A]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Info & Greeting */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF7A24] bg-white/10 px-3 py-1 rounded-full border border-white/15">
                We'd Love to Welcome You
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Drop By for Coffee, <br />
                <span className="text-[#FF5A0A]">Stay for the Experience</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl font-normal">
                Whether you’re catching up with old friends, having a solo reading afternoon,
                or craving wood-fired pizza after a long day, Beans & Bites is ready to serve you.
              </p>

              {/* Amenity Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-xs font-medium text-white/90">
                  <Wifi className="w-3.5 h-3.5 text-[#FF7A24]" />
                  <span>Free Fiber Wi-Fi</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-xs font-medium text-white/90">
                  <Utensils className="w-3.5 h-3.5 text-[#FF7A24]" />
                  <span>Dine-In Table Service</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-xs font-medium text-white/90">
                  <Coffee className="w-3.5 h-3.5 text-[#FF7A24]" />
                  <span>Fresh Takeaway</span>
                </span>
              </div>
            </div>

            {/* Right: Hours & Location Box */}
            <div className="lg:col-span-5 bg-white/10 border border-white/15 rounded-2xl p-5 sm:p-6 backdrop-blur-md space-y-4">
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FF5A0A]/20 text-[#FF7A24] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 block uppercase tracking-wider">
                      Location
                    </span>
                    <span className="font-semibold text-white">
                      Lakeside Avenue, Ward 4, Kathmandu, Nepal
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FF5A0A]/20 text-[#FF7A24] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 block uppercase tracking-wider">
                      Opening Hours
                    </span>
                    <span className="font-semibold text-white">
                      Mon – Sun: 7:30 AM – 10:30 PM (Kitchen closes at 10 PM)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FF5A0A]/20 text-[#FF7A24] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 block uppercase tracking-wider">
                      Contact & Bookings
                    </span>
                    <span className="font-semibold text-white">
                      +977-1-4234567 • hello@beansandbites.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <Link
                  href="/menu"
                  className="w-full sm:w-auto flex-1 text-center bg-[#FF5A0A] hover:bg-[#E04E07] text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Explore Menu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto flex-1 text-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-all"
                >
                  <span>Table Reservation</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

