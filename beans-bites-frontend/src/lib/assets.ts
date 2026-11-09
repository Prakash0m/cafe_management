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
      "/assets/hero/hero-slide-5.webp",
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
      buff: "/assets/food/momo/buff-momo.webp",
      jhol: "/assets/food/momo/jhol-momo.webp",
      kothey: "/assets/food/momo/kothey-momo.webp",
    },
    nepali: {
      thakaliVeg: "/assets/food/nepali/thakali-veg.webp",
      thakaliChicken: "/assets/food/nepali/thakali-chicken.webp",
      thakaliMutton: "/assets/food/nepali/thakali-mutton.webp",
      chickenChoila: "/assets/food/nepali/chicken-choila.webp",
      samayBaji: "/assets/food/nepali/samay-baji.webp",
    },
    pasta: {
      alfredo: "/assets/food/pasta/pasta-alfredo.webp",
    },
    sandwich: {
      veg: "/assets/food/sandwich/veg-sandwich.webp",
    },
    salad: {
      caesar: "/assets/food/salad/caesar-salad.webp",
    },
    desserts: {
      brownie: "/assets/food/desserts/chocolate-brownie.webp",
    },
    beverages: {
      icedLatte: "/assets/food/beverages/iced-latte.webp",
      masalaChiya: "/assets/food/beverages/masala-chiya.webp",
      greenTea: "/assets/food/beverages/green-tea.webp",
      espresso: "/assets/food/beverages/espresso.webp",
      americano: "/assets/food/beverages/americano.webp",
      coldBrew: "/assets/food/beverages/cold-brew.webp",
      mintLemonade: "/assets/food/beverages/mint-lemonade.webp",
      mangoLassi: "/assets/food/beverages/mango-lassi.webp",
    },
  },
  menu: {
    bannerPizza: "/assets/menu/menu-banner-pizza.webp",
  },
  categories: {
    all: "/assets/categories/all.webp",
    nepali: "/assets/food/nepali/thakali-veg.webp",
    momo: "/assets/categories/momo.webp",
    beverages: "/assets/categories/beverages.webp",
    pizza: "/assets/categories/pizza.webp",
    burger: "/assets/categories/burger.webp",
    pasta: "/assets/categories/pasta.webp",
    sandwich: "/assets/categories/sandwich.webp",
    salad: "/assets/categories/salad.webp",
    snacks: "/assets/categories/snacks.webp",
    desserts: "/assets/categories/desserts.webp",
  },
  promotions: {
    weekendSpecial: "/assets/promotions/weekend-special.webp",
    cafeInterior: "/assets/promotions/cafe-interior-neon.webp",
  },
} as const;

export type Assets = typeof ASSETS;
