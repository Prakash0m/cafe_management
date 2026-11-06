"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  UtensilsCrossed,
  Tag,
  Info,
  Phone,
  X,
  User,
  ShoppingBag,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ASSETS } from "@/lib/assets";
import { SearchBar } from "./search-bar";
import { useCartStore } from "@/store/cart.store";
import { useOrdersStore } from "@/store/orders.store";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Menu", href: "/menu", icon: UtensilsCrossed },
  { label: "Offers", href: "/offers", icon: Tag },
  { label: "Orders", href: "/orders", icon: ClipboardList },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Phone },
];

export function MobileNavigation({
  isOpen,
  onClose,
  onOpenLogin,
}: MobileNavigationProps) {
  const pathname = usePathname();
  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const { orders } = useOrdersStore();
  const hasLiveOrder = orders.some(
    (o) => o.status === "preparing" || o.status === "ready"
  );

  // Prevent background scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Image
              src={ASSETS.brand.favicon}
              alt="Beans & Bites"
              width={28}
              height={28}
              className="object-contain"
            />
            <div>
              <span className="font-serif font-bold text-gray-900 text-sm tracking-tight block">
                Beans & Bites
              </span>
              <span className="text-[9px] uppercase tracking-wider text-gray-500 font-medium block">
                CAFÉ & RESTAURANT
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Search */}
        <div className="p-4 border-b border-gray-100">
          <SearchBar onSearch={() => onClose()} />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-[#FF5A0A] text-white shadow-sm font-semibold"
                    : "text-gray-700 hover:bg-orange-50 hover:text-[#FF5A0A]"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4",
                    isActive ? "text-white" : "text-gray-500"
                  )}
                />
                <span>{item.label}</span>
                {item.label === "Orders" && hasLiveOrder && (
                  <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live</span>
                  </span>
                )}
              </Link>
            );
          })}

          <Link
            href="/cart"
            onClick={onClose}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-[#FF5A0A] transition-all"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-4 h-4 text-gray-500" />
              <span>Shopping Cart</span>
            </div>
            {totalCartItems > 0 && (
              <span className="bg-[#E11D48] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {totalCartItems}
              </span>
            )}
          </Link>
        </nav>

        {/* Drawer Footer with Login Button */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] text-white font-medium py-2.5 px-4 rounded-xl text-sm transition-colors shadow-sm"
          >
            <User className="w-4 h-4" />
            <span>Login to Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}

