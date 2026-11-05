export type OfferCategory =
  | "all"
  | "weekend"
  | "combos"
  | "beverages"
  | "exclusive";

export interface OfferDeal {
  id: string;
  title: string;
  badge: string;
  badgeType: "hot" | "new" | "limited" | "exclusive" | "bestseller";
  tagline: string;
  description: string;
  couponCode: string;
  discountPercentage: number;
  discountDisplay: string;
  validity: string;
  minOrder?: number;
  category: OfferCategory;
  imageUrl: string;
  featured?: boolean;
  terms: string[];
  applicableItemsText: string;
}
