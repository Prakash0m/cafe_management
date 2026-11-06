"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  UtensilsCrossed,
  Tag,
  ClipboardList,
  ShoppingCart,
} from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { useOrdersStore } from "@/store/orders.store";
import { cn } from "@/lib/utils";

interface TabItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isOrders?: boolean;
  isCart?: boolean;
}

const TABS: TabItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Menu", href: "/menu", icon: UtensilsCrossed },
  { label: "Offers", href: "/offers", icon: Tag },
  { label: "Orders", href: "/orders", icon: ClipboardList, isOrders: true },
  { label: "Cart", href: "/cart", icon: ShoppingCart, isCart: true },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const totalCartItems = useCartStore((state) => state.getTotalItems());
  const { orders } = useOrdersStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Hide on table view pages because table view has its own dedicated floating cart bar
  if (pathname.startsWith("/table/")) {
    return null;
  }

  const hasLiveOrder =
    mounted &&
    orders.some((o) => o.status === "preparing" || o.status === "ready");

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 transition-all">
      <nav className="flex items-center justify-around max-w-md mx-auto" aria-label="Mobile Navigation">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-150 active:scale-90 select-none",
                isActive
                  ? "text-[#FF5A0A]"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              {/* Icon Container with Badge / Pulse indicator */}
              <div className="relative">
                <Icon
                  className={cn(
                    "w-5 h-5 transition-transform duration-150",
                    isActive ? "stroke-[2.5] scale-110" : "stroke-[2]"
                  )}
                />

                {/* Live Order Indicator Dot */}
                {tab.isOrders && hasLiveOrder && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
                )}

                {/* Cart Quantity Badge */}
                {tab.isCart && mounted && totalCartItems > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#FF5A0A] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {totalCartItems}
                  </span>
                )}
              </div>

              {/* Tab Label */}
              <span
                className={cn(
                  "text-[10px] font-medium tracking-tight mt-0.5 leading-none",
                  isActive ? "font-bold text-[#FF5A0A]" : "text-gray-500"
                )}
              >
                {tab.label}
              </span>

              {/* Active Pill Indicator at Bottom */}
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#FF5A0A] mt-1" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
