export const ASSETS = {
  brand: {
    logo: "/assets/brand/logo.png",
    favicon: "/assets/brand/favicon.png",
  },
  hero: {
    bg: "/assets/hero/hero-slide-1.webp",
    food: "/assets/hero/hero-food.webp",
    slides: [
      "/assets/hero/hero-slide-1.webp",
      "/assets/hero/hero-slide-2.webp",
      "/assets/hero/hero-slide-3.webp",
      "/assets/hero/hero-slide-4.webp",
    ],
  },
  food: {
    pizza: {
      margherita: "/assets/food/pizza/margherita-pizza.webp",
    },
    burger: {
      chicken: "/assets/food/burger/chicken-burger.webp",
    },
    momo: {
      chicken: "/assets/food/momo/chicken-momo.webp",
    },
    pasta: {
      alfredo: "/assets/food/pasta/pasta-alfredo.webp",
    },
  },
  categories: {
    all: "/assets/categories/all.webp",
    pizza: "/assets/categories/pizza.webp",
    burger: "/assets/categories/burger.webp",
    pasta: "/assets/categories/pasta.webp",
    momo: "/assets/categories/momo.webp",
    sandwich: "/assets/categories/sandwich.webp",
    salad: "/assets/categories/salad.webp",
    snacks: "/assets/categories/snacks.webp",
    desserts: "/assets/categories/desserts.webp",
    beverages: "/assets/categories/beverages.webp",
  },
  promotions: {
    weekendSpecial: "/assets/promotions/weekend-special.webp",
  },
} as const;

export type Assets = typeof ASSETS;
