"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User, Menu, ChevronDown, Receipt, ChefHat, ArrowRight, UtensilsCrossed, Sparkles } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import { SearchBar } from "./search-bar";
import { useCartStore } from "@/store/cart.store";
import { useOrdersStore } from "@/store/orders.store";
import { toast } from "sonner";

export function CustomerHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = React.useState(false);
  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const { getActiveOrder, orders } = useOrdersStore();
  const profileRef = React.useRef<HTMLDivElement>(null);

  // Handle client-side hydration for cart item count to avoid hydration mismatch
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close profile dropdown on outside click
  React.useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const activeOrder = mounted ? getActiveOrder() : null;

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

          {/* User Profile Button with Dropdown */}
          <div className="relative hidden sm:block" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="inline-flex items-center gap-1.5 bg-[#FF5A0A] hover:bg-[#E04E07] active:bg-[#C94304] text-white text-xs sm:text-[13px] font-semibold px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Account</span>
              <ChevronDown
                className={`w-3 h-3 text-white/80 transition-transform duration-200 ${
                  isProfileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* User Identity */}
                <div className="p-3 bg-gradient-to-r from-orange-50/80 to-amber-50/40 rounded-xl mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#FF5A0A] text-white font-bold text-sm flex items-center justify-center shadow-xs">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-extrabold text-sm text-gray-900 block truncate">
                        Customer Account
                      </span>
                      <span className="text-[11px] text-gray-500 block truncate">
                        Beans & Bites • Dine-in Guest
                      </span>
                    </div>
                  </div>
                </div>

                {/* Active Order Live Tracker Card */}
                {activeOrder && (
                  <Link
                    href={`/orders?id=${activeOrder.id}`}
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="block p-2.5 bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-xl mb-2 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Live Order • {activeOrder.status.toUpperCase()}</span>
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-900">
                        {activeOrder.displayId}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-700">
                      <span className="truncate max-w-[170px] font-medium">
                        {activeOrder.items[0]?.name || "Dish"}
                        {activeOrder.items.length > 1
                          ? ` +${activeOrder.items.length - 1} more`
                          : ""}
                      </span>
                      <span className="text-[#FF5A0A] font-bold inline-flex items-center gap-0.5 text-[11px] group-hover:translate-x-0.5 transition-transform">
                        Track <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                )}

                {/* Quick Menu Links */}
                <div className="space-y-1">
                  <Link
                    href="/orders"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#FF5A0A] rounded-xl transition-colors"
                  >
                    <Receipt className="w-4 h-4 text-gray-400" />
                    <span>My Orders & Live Tracking</span>
                  </Link>

                  <Link
                    href="/table/T4"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#FF5A0A] rounded-xl transition-colors"
                  >
                    <UtensilsCrossed className="w-4 h-4 text-gray-400" />
                    <span>Table T4 Digital Menu</span>
                  </Link>

                  <Link
                    href="/offers"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#FF5A0A] rounded-xl transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-gray-400" />
                    <span>Special Deals & Coupons</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

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

