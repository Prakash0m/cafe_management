"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, Tag, Info, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Menu", href: "/menu", icon: UtensilsCrossed },
  { label: "Offers", href: "/offers", icon: Tag },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Phone },
];

export function DesktopNavigation({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn("hidden md:flex items-center gap-1.5 lg:gap-2.5", className)}>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs lg:text-[13px] font-medium transition-all duration-150 select-none",
              isActive
                ? "bg-[#FF5A0A] text-white shadow-sm font-semibold"
                : "text-gray-700 hover:text-[#FF5A0A] hover:bg-orange-50/60"
            )}
          >
            <Icon
              className={cn(
                "w-3.5 h-3.5",
                isActive ? "text-white" : "text-gray-600 group-hover:text-[#FF5A0A]"
              )}
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

