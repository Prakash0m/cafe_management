import { FoodCategory } from "@/types/menu.types";
import { ASSETS } from "@/lib/assets";

export const MOCK_CATEGORIES: FoodCategory[] = [
  {
    id: "cat-all",
    name: "All",
    slug: "all",
    iconUrl: ASSETS.categories.all,
    itemCount: 48,
  },
  {
    id: "cat-pizza",
    name: "Pizza",
    slug: "pizza",
    iconUrl: ASSETS.categories.pizza,
    itemCount: 12,
  },
  {
    id: "cat-burger",
    name: "Burger",
    slug: "burger",
    iconUrl: ASSETS.categories.burger,
    itemCount: 8,
  },
  {
    id: "cat-pasta",
    name: "Pasta",
    slug: "pasta",
    iconUrl: ASSETS.categories.pasta,
    itemCount: 6,
  },
  {
    id: "cat-momo",
    name: "Momo",
    slug: "momo",
    iconUrl: ASSETS.categories.momo,
    itemCount: 6,
  },
  {
    id: "cat-sandwich",
    name: "Sandwich",
    slug: "sandwich",
    iconUrl: ASSETS.categories.sandwich,
    itemCount: 5,
  },
  {
    id: "cat-salad",
    name: "Salad",
    slug: "salad",
    iconUrl: ASSETS.categories.salad,
    itemCount: 4,
  },
  {
    id: "cat-snacks",
    name: "Snacks",
    slug: "snacks",
    iconUrl: ASSETS.categories.snacks,
    itemCount: 9,
  },
  {
    id: "cat-desserts",
    name: "Desserts",
    slug: "desserts",
    iconUrl: ASSETS.categories.desserts,
    itemCount: 7,
  },
  {
    id: "cat-beverages",
    name: "Beverages",
    slug: "beverages",
    iconUrl: ASSETS.categories.beverages,
    itemCount: 14,
  },
];

