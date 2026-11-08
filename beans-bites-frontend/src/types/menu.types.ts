export interface MacroNutrients {
  carbs: number; // in grams
  protein: number; // in grams
  fat: number; // in grams
}

export interface FoodItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  badge?: "Bestseller" | "Best Seller" | "Popular" | "Chef Special" | "New";
  isVeg?: boolean;
  isAvailable: boolean;
  preparationTime?: string;
  calories?: number;
  macros?: MacroNutrients;
  rating?: number;
  // Ingredients and culinary details (k k used gareko foods vitra)
  ingredients?: string[];
  allergens?: string[];
  spiciness?: "none" | "mild" | "medium" | "spicy";
  portion?: string;
  chefNotes?: string;
  updatedAt?: string;
}

export interface FoodCategory {
  id: string;
  name: string;
  slug: string;
  iconUrl: string;
  itemCount?: number;
}

export interface Promotion {
  id: string;
  title: string;
  discount: string;
  description: string;
  couponCode: string;
  validity: string;
  bannerImageUrl: string;
}

export interface HomepageData {
  hero: {
    badge: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    benefits: Array<{
      id: string;
      label: string;
      icon: string;
    }>;
  };
  categories: FoodCategory[];
  popularItems: FoodItem[];
  promotions: Promotion[];
}
