export interface FoodItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  badge?: "Best Seller" | "Popular" | "Chef Special" | "New";
  isAvailable: boolean;
  preparationTime?: string;
  calories?: number;
  rating?: number;
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

