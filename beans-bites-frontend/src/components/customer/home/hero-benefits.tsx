import * as React from "react";
import { Leaf, ChefHat, Clock, Users } from "lucide-react";

const BENEFITS = [
  {
    id: "fresh-ingredients",
    label: "Fresh Ingredients",
    mobileLabel: "Fresh",
    icon: Leaf,
  },
  {
    id: "quality-food",
    label: "Quality Food",
    mobileLabel: "Quality",
    icon: ChefHat,
  },
  {
    id: "quick-service",
    label: "Quick Service",
    mobileLabel: "Fast Service",
    icon: Clock,
  },
  {
    id: "great-ambience",
    label: "Great Ambience",
    mobileLabel: "Ambience",
    icon: Users,
  },
];

export function HeroBenefits() {
  return (
    <div className="w-full flex items-center justify-between sm:justify-start gap-2 sm:gap-x-8 text-white/95 py-0.5">
      {BENEFITS.map((b) => {
        const Icon = b.icon;
        return (
          <div
            key={b.id}
            className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-medium text-white/90 flex-shrink-0"
          >
            <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF7A24] sm:text-white/90 flex-shrink-0" />
            <span className="sm:hidden whitespace-nowrap">{b.mobileLabel}</span>
            <span className="hidden sm:inline whitespace-nowrap">{b.label}</span>
          </div>
        );
      })}
    </div>
  );
}

