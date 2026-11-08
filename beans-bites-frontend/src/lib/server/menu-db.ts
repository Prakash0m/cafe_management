import { FoodItem } from "@/types/menu.types";
import { MOCK_ALL_ITEMS } from "@/data/mock/food-items";

// In-memory server database that persists for the lifetime of the Next.js server
// and allows live updates via PATCH/PUT/POST /api/menu and /api/menu/[id]
class MenuDatabase {
  private items: Map<string, FoodItem>;

  constructor() {
    this.items = new Map();
    MOCK_ALL_ITEMS.forEach((item) => {
      this.items.set(item.id, { ...item, updatedAt: new Date().toISOString() });
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
    if (!existing) {
      // If it's a new item (via POST /api/menu), create it
      const newItem = {
        id,
        ...updates,
        updatedAt: new Date().toISOString(),
      } as FoodItem;
      this.items.set(id, newItem);
      return newItem;
    }

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
    MOCK_ALL_ITEMS.forEach((item) => {
      this.items.set(item.id, { ...item, updatedAt: new Date().toISOString() });
    });
  }
}

// Global singleton instance so it survives across API route calls
const globalForDb = global as unknown as { menuDb?: MenuDatabase };
export const menuDb = globalForDb.menuDb || new MenuDatabase();
if (process.env.NODE_ENV !== "production") {
  globalForDb.menuDb = menuDb;
}
