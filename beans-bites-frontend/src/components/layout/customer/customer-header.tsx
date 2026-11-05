"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, Menu, QrCode } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import { SearchBar } from "./search-bar";
import { useCartStore } from "@/store/cart.store";
import { toast } from "sonner";

export function CustomerHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const totalCartItems = useCartStore((state) => state.getTotalItems());

  // Handle client-side hydration for cart item count to avoid hydration mismatch
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoginClick = () => {
    toast.info("Customer Login", {
      description: "Authentication modal ready for Express.js backend integration.",
      duration: 3500,
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-100/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[64px] sm:h-[72px] flex items-center justify-between gap-2 sm:gap-4">
        {/* LEFT SECTION: Logo & Brand Name */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 group"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0">
            <Image
              src={ASSETS.brand.favicon}
              alt="Beans & Bites Logo"
              width={36}
              height={36}
              priority
              className="object-contain group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-[17px] sm:text-[19px] font-bold text-[#1F140E] leading-tight tracking-tight group-hover:text-[#FF5A0A] transition-colors">
              Beans & Bites
            </span>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#64748B] font-semibold leading-none">
              CAFÉ & RESTAURANT
            </span>
          </div>
        </Link>

        {/* CENTER SECTION: Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center flex-1 max-w-xl">
          <DesktopNavigation />
        </div>

        {/* RIGHT SECTION: Search, Cart Badge, and Login */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Search bar on desktop/tablet */}
          <div className="hidden sm:block w-44 md:w-52 lg:w-56">
            <SearchBar />
          </div>

          {/* Table QR Order Link */}
          <Link
            href="/table/T4"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-gray-700 hover:text-[#FF5A0A] bg-orange-50/80 hover:bg-orange-100 border border-orange-200/70 px-2.5 py-1.5 rounded-lg transition-colors"
            title="Scan or View Table QR Menu"
          >
            <QrCode className="w-3.5 h-3.5 text-[#FF5A0A]" />
            <span className="hidden sm:inline">Table QR</span>
          </Link>

          {/* Cart Icon with Red Quantity Badge */}
          <Link
            href="/cart"
            className="relative p-2 text-gray-700 hover:text-[#FF5A0A] hover:bg-orange-50/60 rounded-lg transition-colors flex items-center justify-center"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-[#FF5A0A] transition-colors" />
            {mounted && totalCartItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#E11D48] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-in zoom-in-50 duration-200">
                {totalCartItems}
              </span>
            )}
          </Link>

          {/* Orange Login Button */}
          <button
            onClick={handleLoginClick}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#FF5A0A] hover:bg-[#E04E07] active:bg-[#C94304] text-white text-xs sm:text-[13px] font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all shadow-sm active:scale-95"
          >
            <User className="w-3.5 h-3.5" />
            <span>Login</span>
          </button>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#FF5A0A] hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenLogin={handleLoginClick}
      />
    </header>
  );
}

