import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ASSETS } from "@/lib/assets";

export function CustomerFooter() {
  return (
    <footer className="bg-[#180F0A] text-gray-300 pt-6 sm:pt-12 pb-20 sm:pb-10 border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Top Brand Row (< md): Compact logo + socials */}
        <div className="md:hidden flex items-center justify-between pb-4 mb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Image
              src={ASSETS.brand.favicon}
              alt="Beans & Bites"
              width={28}
              height={28}
              className="object-contain brightness-110"
            />
            <div>
              <span className="font-serif text-base font-bold text-white tracking-tight block leading-tight">
                Beans & Bites
              </span>
              <span className="text-[7.5px] uppercase tracking-[0.18em] text-[#FF7A24] font-semibold block">
                CAFÉ & RESTAURANT
              </span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#FF5A0A] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#FF5A0A] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#FF5A0A] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Main Grid: 2 Columns on Mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8 pb-5 sm:pb-10 border-b border-white/10">
          {/* Col 1: Brand & About (Hidden on mobile top row, visible on tablet & desktop) */}
          <div className="hidden md:block space-y-4">
            <div className="flex items-center gap-2.5">
              <Image
                src={ASSETS.brand.favicon}
                alt="Beans & Bites"
                width={34}
                height={34}
                className="object-contain brightness-110"
              />
              <div>
                <span className="font-serif text-lg font-bold text-white tracking-tight block">
                  Beans & Bites
                </span>
                <span className="text-[8px] uppercase tracking-[0.2em] text-[#FF7A24] font-semibold block">
                  CAFÉ & RESTAURANT
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Fresh ingredients. Great taste. A cozy place to eat, drink and
              relax with friends and family. Experience artisan coffee and
              delicious dishes crafted with love.
            </p>
            {/* Desktop Socials */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#FF5A0A] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#FF5A0A] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#FF5A0A] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h3 className="text-white text-xs font-bold tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#FF7A24] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-400 hover:text-[#FF7A24] transition-colors">
                  Food Menu
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-gray-400 hover:text-[#FF7A24] transition-colors">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-400 hover:text-[#FF7A24] transition-colors inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>My Orders</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#FF7A24] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Service */}
          <div className="space-y-2">
            <h3 className="text-white text-xs font-bold tracking-wider uppercase">
              Hours
            </h3>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li className="flex items-start gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF7A24] flex-shrink-0 mt-0.5" />
                <span>Mon–Fri: 8AM–10PM</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF7A24] flex-shrink-0 mt-0.5" />
                <span>Sat–Sun: 8AM–11PM</span>
              </li>
              <li className="pt-0.5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Dine-In & Takeaway</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Visit Us & Contact */}
          <div className="col-span-2 md:col-span-1 space-y-2 pt-1 md:pt-0">
            <h3 className="text-white text-xs font-bold tracking-wider uppercase">
              Visit Us
            </h3>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF7A24] flex-shrink-0 mt-0.5" />
                <span>Beans & Bites Cafe, Lakeside Avenue, Kathmandu</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FF7A24] flex-shrink-0" />
                <a href="tel:+97714245678" className="hover:text-white transition-colors">
                  +977 1-4245678 / +977 9801234567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FF7A24] flex-shrink-0" />
                <a href="mailto:hello@beansandbites.com" className="hover:text-white transition-colors">
                  hello@beansandbites.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Om Prakash Sharma Attribution */}
        <div className="pt-3 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2.5 text-xs text-gray-400 text-center sm:text-left">
          <p className="text-[11px] sm:text-xs">
            © {new Date().getFullYear()} Beans & Bites Café & Restaurant. All rights reserved.
          </p>
          <p className="text-[11px] sm:text-xs flex items-center gap-1.5">
            <span>Created by</span>
            <a
              href="https://www.omprakashsharma.info.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF7A24] hover:text-[#FFA366] font-semibold underline underline-offset-4 transition-colors"
            >
              Om Prakash Sharma
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
