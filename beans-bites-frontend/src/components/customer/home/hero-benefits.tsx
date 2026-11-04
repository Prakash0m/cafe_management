import * as React from "react";
import { Leaf, ChefHat, Clock, Users } from "lucide-react";

const BENEFITS = [
  {
    id: "fresh-ingredients",
    label: "Fresh Ingredients",
    icon: Leaf,
  },
  {
    id: "quality-food",
    label: "Quality Food",
    icon: ChefHat,
  },
  {
    id: "quick-service",
    label: "Quick Service",
    icon: Clock,
  },
  {
    id: "great-ambience",
    label: "Great Ambience",
    icon: Users,
  },
];

export function HeroBenefits() {
  return (
    <div className="w-full flex items-center justify-start flex-wrap gap-x-6 sm:gap-x-8 gap-y-2 pt-2 text-white/95">
      {BENEFITS.map((b) => {
        const Icon = b.icon;
        return (
          <div
            key={b.id}
            className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium text-white/90"
          >
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/90 flex-shrink-0" />
            <span className="whitespace-nowrap">{b.label}</span>
          </div>
        );
      })}
    </div>
  );
}

