import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, CartState } from "@/types/cart.types";
import { FoodItem } from "@/types/menu.types";
import { ASSETS } from "@/lib/assets";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        // Initialize with default items as shown in reference (Cart badge has '3')
        // Card 1: 1 Margherita Pizza, Card 2: 2 Chicken Burgers = 3 items total
        {
          id: "init-cart-1",
          item: {
            id: "item-pizza-margherita",
            name: "Margherita Pizza",
            slug: "margherita-pizza",
            description: "Classic pizza with fresh tomato sauce, mozzarella cheese and basil.",
            price: 420,
            category: "pizza",
            imageUrl: ASSETS.food.pizza.margherita,
            badge: "Best Seller",
            isAvailable: true,
          },
          quantity: 1,
          addedAt: Date.now() - 3600000,
        },
        {
          id: "init-cart-2",
          item: {
            id: "item-burger-chicken",
            name: "Chicken Burger",
            slug: "chicken-burger",
            description: "Grilled chicken with fresh lettuce, tomato and special sauce.",
            price: 380,
            category: "burger",
            imageUrl: ASSETS.food.burger.chicken,
            badge: "Popular",
            isAvailable: true,
          },
          quantity: 2,
          addedAt: Date.now() - 1800000,
        },
      ],

      addItem: (item: FoodItem, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (ci) => ci.item.id === item.id
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + quantity,
            };
            return { items: updatedItems };
          }

          const newItem: CartItem = {
            id: `cart-${item.id}-${Date.now()}`,
            item,
            quantity,
            addedAt: Date.now(),
          };

          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((ci) => ci.item.id !== itemId && ci.id !== itemId),
        }));
      },

      updateQuantity: (itemId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (ci) => ci.item.id !== itemId && ci.id !== itemId
              ),
            };
          }

          return {
            items: state.items.map((ci) =>
              ci.item.id === itemId || ci.id === itemId
                ? { ...ci, quantity }
                : ci
            ),
          };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, ci) => total + ci.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, ci) => total + ci.item.price * ci.quantity,
          0
        );
      },
    }),
    {
      name: "beans-bites-cart-storage",
    }
  )
);

