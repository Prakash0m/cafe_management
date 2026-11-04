import { HomepageData, Promotion } from "@/types/menu.types";
import { MOCK_CATEGORIES } from "./categories";
import { MOCK_POPULAR_ITEMS } from "./food-items";
import { ASSETS } from "@/lib/assets";

export const MOCK_PROMOTION: Promotion = {
  id: "promo-weekend-special",
  title: "Weekend Special",
  discount: "20% OFF",
  description: "on all Pizzas & Burgers",
  couponCode: "WEEKEND20",
  validity: "Valid every Friday - Sunday",
  bannerImageUrl: ASSETS.promotions.weekendSpecial,
};

export const MOCK_HOMEPAGE_DATA: HomepageData = {
  hero: {
    badge: "GOOD FOOD • GREAT MOOD",
    headingLine1: "Delicious Food",
    headingLine2: "Every Moment",
    description: "Fresh ingredients. Great taste. A perfect place to eat, drink and relax.",
    benefits: [
      { id: "b1", label: "Fresh Ingredients", icon: "Leaf" },
      { id: "b2", label: "Quality Food", icon: "ChefHat" },
      { id: "b3", label: "Quick Service", icon: "Clock" },
      { id: "b4", label: "Great Ambience", icon: "Users" },
    ],
  },
  categories: MOCK_CATEGORIES,
  popularItems: MOCK_POPULAR_ITEMS,
  promotions: [MOCK_PROMOTION],
};

