import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, CartState, CouponInfo, OrderType, PaymentMethod } from "@/types/cart.types";
import { FoodItem } from "@/types/menu.types";
import { ASSETS } from "@/lib/assets";

const VALID_COUPONS: Record<string, CouponInfo> = {
  WEEKEND20: {
    code: "WEEKEND20",
    discountPercentage: 20,
    description: "Coupon applied! 20% off on all Pizzas & Burgers.",
  },
  WELCOME10: {
    code: "WELCOME10",
    discountPercentage: 10,
    description: "Coupon applied! 10% welcome discount for new customers.",
  },
  STUDENT15: {
    code: "STUDENT15",
    discountPercentage: 15,
    description: "Coupon applied! 15% student afternoon fuel discount.",
  },
  HAPPYHOUR: {
    code: "HAPPYHOUR",
    discountPercentage: 30,
    description: "Coupon applied! 30% Happy Hour discount on Beverages & Desserts.",
  },
  MOMO25: {
    code: "MOMO25",
    discountPercentage: 25,
    description: "Coupon applied! 25% Momo Platter combo discount.",
  },
  FAMILY30: {
    code: "FAMILY30",
    discountPercentage: 30,
    description: "Coupon applied! 30% Grand Family Feast discount.",
  },
};

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: "init-cart-1",
    item: {
      id: "item-pizza-margherita",
      name: "Margherita Pizza",
      slug: "margherita-pizza",
      description: "Classic pizza with fresh tomato, mozzarella cheese and basil.",
      price: 420,
      category: "pizza",
      imageUrl: ASSETS.food.pizza.margherita,
      badge: "Bestseller",
      isVeg: true,
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
      isVeg: false,
      isAvailable: true,
    },
    quantity: 2,
    addedAt: Date.now() - 1800000,
  },
  {
    id: "init-cart-3",
    item: {
      id: "item-beverages-iced-latte",
      name: "Iced Latte",
      slug: "iced-latte",
      description: "Chilled espresso with milk and ice, a perfect refreshment.",
      price: 240,
      category: "beverages",
      imageUrl: ASSETS.food.beverages.icedLatte,
      isVeg: true,
      isAvailable: true,
    },
    quantity: 1,
    addedAt: Date.now() - 900000,
  },
];

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: INITIAL_CART_ITEMS,
      orderType: "dine-in",
      tableNumber: "Table T4 (4 Seats)",
      specialInstructions: "Less spicy and no onion in the burger.",
      paymentMethod: "cash",
      appliedCoupon: VALID_COUPONS.WEEKEND20,

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
        set({ items: [], appliedCoupon: null });
      },

      resetToDemoItems: () => {
        set({
          items: INITIAL_CART_ITEMS,
          orderType: "dine-in",
          tableNumber: "Table T4 (4 Seats)",
          specialInstructions: "Less spicy and no onion in the burger.",
          paymentMethod: "cash",
          appliedCoupon: VALID_COUPONS.WEEKEND20,
        });
      },

      setOrderType: (type: OrderType) => {
        set({ orderType: type });
      },

      setTableNumber: (table: string) => {
        set({ tableNumber: table });
      },

      setSpecialInstructions: (instructions: string) => {
        set({ specialInstructions: instructions.slice(0, 200) });
      },

      setPaymentMethod: (method: PaymentMethod) => {
        set({ paymentMethod: method });
      },

      applyCoupon: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        const found = VALID_COUPONS[cleanCode];

        if (found) {
          set({ appliedCoupon: found });
          return {
            success: true,
            message: `Coupon ${cleanCode} applied successfully (${found.discountPercentage}% OFF)!`,
          };
        }

        return {
          success: false,
          message: "Invalid coupon code. Try WEEKEND20, WELCOME10, HAPPYHOUR, or MOMO25.",
        };
      },

      removeCoupon: () => {
        set({ appliedCoupon: null });
      },

      getTotalItems: () => {
        return get().items.reduce((total, ci) => total + ci.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, ci) => total + ci.item.price * ci.quantity,
          0
        );
      },

      getDiscountAmount: () => {
        const { getSubtotal, appliedCoupon } = get();
        const subtotal = getSubtotal();
        if (!appliedCoupon) return 0;
        return Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
      },

      getServiceCharge: () => {
        const { getSubtotal, getDiscountAmount } = get();
        const discountedBase = Math.max(0, getSubtotal() - getDiscountAmount());
        // 5% service charge
        return Math.round(discountedBase * 0.05);
      },

      getVat: () => {
        const { getSubtotal, getDiscountAmount } = get();
        const discountedBase = Math.max(0, getSubtotal() - getDiscountAmount());
        // 13% VAT
        return Math.round(discountedBase * 0.13);
      },

      getTotalPayable: () => {
        const { getSubtotal, getDiscountAmount, getServiceCharge, getVat } = get();
        const subtotal = getSubtotal();
        if (subtotal === 0) return 0;
        const discount = getDiscountAmount();
        const discountedBase = Math.max(0, subtotal - discount);
        const serviceCharge = getServiceCharge();
        const vat = getVat();
        return discountedBase + serviceCharge + vat;
      },
    }),
    {
      name: "beans-bites-cart-storage-v2",
    }
  )
);
