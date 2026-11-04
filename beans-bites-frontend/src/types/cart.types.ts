import { FoodItem } from "./menu.types";

export interface CartItem {
  id: string;
  item: FoodItem;
  quantity: number;
  addedAt: number;
  specialInstructions?: string;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: FoodItem, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

