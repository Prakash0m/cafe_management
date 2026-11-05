import { FoodItem } from "@/types/menu.types";
import { ASSETS } from "@/lib/assets";

// Initial in-memory menu items with detailed ingredients and preparation notes
const INITIAL_DATABASE_ITEMS: FoodItem[] = [
  {
    id: "item-pizza-margherita",
    name: "Margherita Pizza",
    slug: "margherita-pizza",
    description: "Classic Neapolitan pizza with fresh tomato sauce, mozzarella cheese, and fragrant basil.",
    price: 420,
    category: "pizza",
    imageUrl: ASSETS.food.pizza.margherita,
    badge: "Bestseller",
    isVeg: true,
    isAvailable: true,
    preparationTime: "15-20 mins",
    calories: 680,
    rating: 4.9,
    ingredients: [
      "Italian 00 Sourdough Flour Crust (48-hr slow fermentation)",
      "San Marzano Sun-Ripened Plum Tomatoes",
      "Fresh Buffalo Mozzarella Cheese (D.O.P)",
      "Fresh Sweet Genovese Basil Leaves",
      "Cold-Pressed Extra Virgin Olive Oil",
      "Himalayan Pink Rock Salt",
    ],
    allergens: ["Dairy (Milk)", "Gluten (Wheat)"],
    spiciness: "none",
    portion: "10-inch hand-stretched pizza (6 slices)",
    chefNotes: "Baked at 450°C in our Italian stone oven for 90 seconds to achieve authentic leopard-spotted charred crust.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item-burger-chicken",
    name: "Chicken Burger",
    slug: "chicken-burger",
    description: "Flame-grilled chicken breast patty with fresh lettuce, tomatoes, and house secret sauce.",
    price: 380,
    category: "burger",
    imageUrl: ASSETS.food.burger.chicken,
    badge: "Popular",
    isVeg: false,
    isAvailable: true,
    preparationTime: "12-15 mins",
    calories: 550,
    rating: 4.8,
    ingredients: [
      "100% Fresh Farm-Raised Chicken Breast Patty",
      "Toasted Artisan Brioche Sesame Bun",
      "Melted Aged Yellow Cheddar Cheese",
      "Crisp Hydroponic Iceberg Lettuce",
      "Vine-Ripened Organic Red Tomatoes",
      "House Smoked Paprika & Garlic Aioli",
      "Crunchy Dill Pickles",
    ],
    allergens: ["Gluten (Wheat)", "Dairy", "Eggs", "Sesame"],
    spiciness: "mild",
    portion: "Single gourmet burger served with crispy french fries",
    chefNotes: "Chicken breast is marinated for 12 hours in Himalayan mountain herbs and olive oil before open-flame grilling.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item-momo-chicken",
    name: "Chicken Mo:Mo",
    slug: "chicken-momo",
    description: "Traditional handmade dumplings packed with minced chicken, fresh herbs, and spicy sesame dip.",
    price: 280,
    category: "momo",
    imageUrl: ASSETS.food.momo.chicken,
    badge: "Bestseller",
    isVeg: false,
    isAvailable: true,
    preparationTime: "15-18 mins",
    calories: 420,
    rating: 4.9,
    ingredients: [
      "Handmade Thin Wheat Wrappers",
      "Lean Minced Himalayan Chicken",
      "Finely Diced Red Onions & Spring Scallions",
      "Fresh Mountain Ginger & Crushed Garlic",
      "Roasted Cumin, Coriander & Timmur (Sichuan Pepper)",
      "Creamy Roasted Sesame & Charred Tomato Chutney",
      "Fresh Green Coriander Garnish",
    ],
    allergens: ["Gluten (Wheat)", "Sesame"],
    spiciness: "medium",
    portion: "10 pieces steamed dumplings with 2 dipping bowls",
    chefNotes: "Each dumpling is pleated by hand and steamed freshly on order in traditional tiered brass steamers.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item-pasta-alfredo",
    name: "Pasta Alfredo",
    slug: "pasta-alfredo",
    description: "Al dente fettuccine pasta in rich double cream, aged parmesan cheese, and butter mushrooms.",
    price: 450,
    category: "pasta",
    imageUrl: ASSETS.food.pasta.alfredo,
    isVeg: true,
    isAvailable: true,
    preparationTime: "15-20 mins",
    calories: 620,
    rating: 4.7,
    ingredients: [
      "Italian Durum Wheat Fettuccine Pasta",
      "Heavy Double Dairy Cream",
      "Aged Parmigiano Reggiano Cheese",
      "Cultured French Butter",
      "Sautéed White Button Mushrooms",
      "Minced Garlic & Ground Black Peppercorn",
      "Fresh Italian Flat-Leaf Parsley",
    ],
    allergens: ["Dairy (Cream, Butter, Cheese)", "Gluten (Wheat)"],
    spiciness: "none",
    portion: "Generous bowl served with toasted garlic bread slice",
    chefNotes: "Cooked to al dente and tossed slowly in parmesan-butter emulsion for a velvet coating.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item-beverages-iced-latte",
    name: "Iced Latte",
    slug: "iced-latte",
    description: "Chilled double-shot espresso poured over fresh milk and crystal ice.",
    price: 240,
    category: "beverages",
    imageUrl: ASSETS.food.beverages.icedLatte,
    badge: "Popular",
    isVeg: true,
    isAvailable: true,
    preparationTime: "5-7 mins",
    calories: 160,
    rating: 4.8,
    ingredients: [
      "Double Espresso Shot (Single-Origin Nuwakot Arabica)",
      "Chilled Fresh Full-Cream Milk (Oat/Almond available)",
      "Slow-Melted Crystal Filtered Ice Cubes",
      "Organic Brown Sugar Cane Syrup (Optional)",
    ],
    allergens: ["Dairy (Milk)"],
    spiciness: "none",
    portion: "16 oz / 480 ml tall glass",
    chefNotes: "Espresso beans are shade-grown at 1,400m altitude and medium-roasted weekly in Kathmandu.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item-desserts-brownie",
    name: "Chocolate Brownie",
    slug: "chocolate-brownie",
    description: "Warm fudgy dark chocolate brownie topped with Madagascar vanilla ice cream.",
    price: 320,
    category: "desserts",
    imageUrl: ASSETS.food.desserts.brownie,
    badge: "Chef Special",
    isVeg: true,
    isAvailable: true,
    preparationTime: "8-10 mins",
    calories: 450,
    rating: 4.9,
    ingredients: [
      "70% Belgian Dark Cocoa & Couverture Chocolate",
      "Pure Cultured Butter",
      "Farm Fresh Eggs",
      "Organic Cane Sugar",
      "Pure Madagascar Bourbon Vanilla Extract",
      "Handcrafted Vanilla Bean Ice Cream Scoop",
      "Warm Ganache Chocolate Sauce Drizzle",
    ],
    allergens: ["Dairy", "Eggs", "Gluten (Wheat)"],
    spiciness: "none",
    portion: "Warm brownie square with ice cream scoop",
    chefNotes: "Warmed right before serving so the chocolate core becomes gently molten.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item-sandwich-veg",
    name: "Veg Club Sandwich",
    slug: "veg-club-sandwich",
    description: "Triple-layer toasted sandwich stuffed with crisp veggies, cheddar cheese, and mint spread.",
    price: 320,
    category: "sandwich",
    imageUrl: ASSETS.food.sandwich.veg,
    isVeg: true,
    isAvailable: true,
    preparationTime: "10-12 mins",
    calories: 380,
    rating: 4.6,
    ingredients: [
      "Artisan Multi-Grain Bakery Sliced Loaf",
      "Thinly Sliced English Cucumbers & Vine Tomatoes",
      "Crisp Green Capsicum & Red Onions",
      "Processed Cheddar Cheese Slice",
      "Fresh Himalayan Mint & Coriander Chutney",
      "Sprinkle of Chat Masala & Roasted Cumin",
    ],
    allergens: ["Gluten (Wheat)", "Dairy"],
    spiciness: "mild",
    portion: "2 large grilled sandwich halves with salted chips",
    chefNotes: "Toasted golden brown on a flat cast-iron griddle with pure butter.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item-salad-caesar",
    name: "Caesar Salad",
    slug: "caesar-salad",
    description: "Crisp romaine hearts tossed in creamy parmesan dressing with herb sourdough croutons.",
    price: 350,
    category: "salad",
    imageUrl: ASSETS.food.salad.caesar,
    isVeg: true,
    isAvailable: true,
    preparationTime: "8-10 mins",
    calories: 290,
    rating: 4.7,
    ingredients: [
      "Fresh Hydroponic Romaine Lettuce Hearts",
      "Sourdough Bread Croutons with Garlic & Oregano",
      "Aged Shaved Parmesan Cheese Flakes",
      "House Creamy Caesar Dressing (No raw egg)",
      "Fresh Lemon Zest & Olive Oil Drizzle",
    ],
    allergens: ["Dairy", "Gluten"],
    spiciness: "none",
    portion: "Individual chilled salad bowl",
    chefNotes: "Leaves are spun dry and tossed cold to retain ultimate crispness.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item-pizza-pepperoni",
    name: "Pepperoni Passion",
    slug: "pepperoni-passion",
    description: "Stone-baked pizza layered with savory spicy pepperoni, melted mozzarella, and marinara.",
    price: 520,
    category: "pizza",
    imageUrl: ASSETS.food.pizza.margherita,
    badge: "Bestseller",
    isVeg: false,
    isAvailable: true,
    preparationTime: "15-20 mins",
    calories: 780,
    rating: 4.8,
    ingredients: [
      "Italian Sourdough Crust",
      "Spiced Crushed Tomato Marinara",
      "Low-Moisture Whole Milk Mozzarella",
      "Cured Sliced Beef/Chicken Pepperoni",
      "Dried Wild Mountain Oregano",
      "Crushed Calabrian Red Chili Flakes",
    ],
    allergens: ["Dairy", "Gluten"],
    spiciness: "medium",
    portion: "10-inch hand-stretched pizza (6 slices)",
    chefNotes: "Pepperoni crisps up into savory cups that catch rich olive oil during baking.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "item-burger-cheese",
    name: "Double Cheeseburger",
    slug: "double-cheeseburger",
    description: "Two tender beef patties with melted cheddar cheese, caramelized onions, and house glaze.",
    price: 460,
    category: "burger",
    imageUrl: ASSETS.food.burger.chicken,
    badge: "Bestseller",
    isVeg: false,
    isAvailable: true,
    preparationTime: "15-18 mins",
    calories: 720,
    rating: 4.9,
    ingredients: [
      "Two 100g Smashed Ground Beef Patties",
      "Two Slices Melted American Cheddar Cheese",
      "Slow-Caramelized Brown Onions",
      "Toasted Buttered Brioche Bun",
      "Signature Burger Secret Glaze",
      "Tangy Sliced Bread-and-Butter Pickles",
    ],
    allergens: ["Gluten", "Dairy", "Sesame"],
    spiciness: "mild",
    portion: "Double stacked burger served with French fries",
    chefNotes: "Smashed on high heat cast iron for maximum caramelized crispy lace edges.",
    updatedAt: new Date().toISOString(),
  },
];

// In-memory server database that persists for the lifetime of the Next.js server
// and allows live updates via PATCH/PUT /api/menu/[id]
class MenuDatabase {
  private items: Map<string, FoodItem>;

  constructor() {
    this.items = new Map();
    INITIAL_DATABASE_ITEMS.forEach((item) => {
      this.items.set(item.id, { ...item });
    });
  }

  public getAll(category?: string, search?: string): FoodItem[] {
    let result = Array.from(this.items.values());

    if (category && category !== "all") {
      result = result.filter(
        (i) => i.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          (i.ingredients && i.ingredients.some((ing) => ing.toLowerCase().includes(q)))
      );
    }

    return result;
  }

  public getById(id: string): FoodItem | undefined {
    return this.items.get(id);
  }

  public update(id: string, updates: Partial<FoodItem>): FoodItem | null {
    const existing = this.items.get(id);
    if (!existing) return null;

    const updated: FoodItem = {
      ...existing,
      ...updates,
      id: existing.id, // prevent changing ID
      updatedAt: new Date().toISOString(),
    };

    this.items.set(id, updated);
    return updated;
  }

  public reset(): void {
    this.items.clear();
    INITIAL_DATABASE_ITEMS.forEach((item) => {
      this.items.set(item.id, { ...item });
    });
  }
}

// Global singleton instance so it survives across API route calls
const globalForDb = global as unknown as { menuDb?: MenuDatabase };
export const menuDb = globalForDb.menuDb || new MenuDatabase();
if (process.env.NODE_ENV !== "production") {
  globalForDb.menuDb = menuDb;
}
