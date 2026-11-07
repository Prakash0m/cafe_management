"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { ASSETS } from "@/lib/assets";

export function CustomerFooter() {
  return (
    <footer className="bg-gradient-to-b from-[#1A0E08] via-[#140A05] to-[#0D0502] text-gray-300 pt-10 sm:pt-14 pb-28 sm:pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-48 bg-[#FF5A0A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-48 bg-[#FF7A24]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP BRAND & QUICK ACTIONS BANNER */}
        <div className="pb-7 mb-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-white/10 p-1.5 flex items-center justify-center border border-white/10 shadow-inner flex-shrink-0">
              <Image
                src={ASSETS.brand.favicon}
                alt="Beans & Bites"
                width={36}
                height={36}
                className="object-contain brightness-110"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-bold text-white tracking-tight">
                  Beans & Bites
                </span>
                <span className="bg-[#FF5A0A]/20 text-[#FF7A24] text-[9px] font-bold px-2 py-0.5 rounded-full border border-orange-500/30 uppercase tracking-wider">
                  Café & Dining
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-medium">
                Artisan Coffee • Wood-Fired Pizza • Himalayan Dumplings
              </p>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href="tel:+97714245678"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF7A24]" />
              <span>Call Us</span>
            </a>
            <a
              href="https://maps.google.com/?q=Kathmandu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all active:scale-95"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FF7A24]" />
              <span>Directions</span>
            </a>
            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FF5A0A] hover:bg-[#E04E07] text-xs font-semibold text-white shadow-md transition-all active:scale-95"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Col 1: About & Story */}
          <div className="space-y-4">
            <h3 className="text-white text-xs font-bold tracking-[0.16em] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A0A]" />
              <span>Our Story</span>
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every cup is brewed from single-origin high-altitude beans, and our
              pizzas are hand-stretched and baked in authentic 450°C stone ovens.
              Crafted fresh for your daily delight.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#FF5A0A] border border-white/10 hover:border-transparent flex items-center justify-center text-gray-300 hover:text-white transition-all hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#FF5A0A] border border-white/10 hover:border-transparent flex items-center justify-center text-gray-300 hover:text-white transition-all hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#FF5A0A] border border-white/10 hover:border-transparent flex items-center justify-center text-gray-300 hover:text-white transition-all hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2-column on mobile) */}
          <div className="space-y-4">
            <h3 className="text-white text-xs font-bold tracking-[0.16em] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A0A]" />
              <span>Explore</span>
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-[#FF7A24] transition-colors block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#FF7A24] transition-colors block">
                  Food Menu
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-[#FF7A24] transition-colors block">
                  Discounts & Deals
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FF7A24] transition-colors block">
                  About Kitchen
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="hover:text-[#FF7A24] transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Track Orders</span>
                </Link>
              </li>
              <li>
                <Link href="/table/T4" className="hover:text-[#FF7A24] transition-colors block">
                  Table QR Menu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF7A24] transition-colors block">
                  Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Live Status */}
          <div className="space-y-4">
            <h3 className="text-white text-xs font-bold tracking-[0.16em] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Hours & Service</span>
            </h3>
            <div className="space-y-2.5 text-xs text-gray-300">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between text-white font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF7A24]" />
                    <span>Mon – Fri</span>
                  </span>
                  <span className="text-xs text-gray-300">8:00 AM – 10:00 PM</span>
                </div>
                <div className="flex items-center justify-between text-white font-medium pt-1.5 border-t border-white/5">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#FF7A24]" />
                    <span>Sat – Sun</span>
                  </span>
                  <span className="text-xs text-gray-300">8:00 AM – 11:00 PM</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1.5 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Kitchen Open for Dine-In & Takeaway</span>
              </div>
            </div>
          </div>

          {/* Col 4: Visit & Direct Contact Card */}
          <div className="space-y-4">
            <h3 className="text-white text-xs font-bold tracking-[0.16em] uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A0A]" />
              <span>Visit & Contact</span>
            </h3>
            <div className="space-y-2 text-xs">
              <a
                href="https://maps.google.com/?q=Kathmandu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all text-gray-300 hover:text-white group"
              >
                <MapPin className="w-4 h-4 text-[#FF7A24] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-snug">
                  Beans & Bites Cafe, Lakeside Avenue, Kathmandu, Nepal
                </span>
              </a>

              <a
                href="tel:+97714245678"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all text-gray-300 hover:text-white group"
              >
                <Phone className="w-4 h-4 text-[#FF7A24] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>+977 1-4245678 / +977 9801234567</span>
              </a>

              <a
                href="mailto:hello@beansandbites.com"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 transition-all text-gray-300 hover:text-white group"
              >
                <Mail className="w-4 h-4 text-[#FF7A24] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>hello@beansandbites.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM ATTRIBUTION BAR */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="text-center sm:text-left text-[11px] sm:text-xs">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">Beans & Bites</span> Café & Restaurant. All rights reserved.
          </p>

          {/* Polished Creator Attribution Card */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-end text-[11px] sm:text-xs">
            <span className="text-gray-400">Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF5A0A] fill-[#FF5A0A] animate-pulse" />
            <span className="text-gray-400">by</span>
            <a
              href="https://www.omprakashsharma.info.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-[#FF5A0A]/50 text-white hover:text-[#FF7A24] px-3 py-1 rounded-xl font-semibold text-xs transition-all shadow-xs active:scale-95 group"
            >
              <span>Om Prakash Sharma</span>
              <ExternalLink className="w-3 h-3 text-[#FF7A24] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
