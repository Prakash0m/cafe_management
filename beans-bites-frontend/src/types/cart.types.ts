import { FoodItem } from "./menu.types";

export type OrderType = "dine-in" | "takeaway" | "delivery";
export type PaymentMethod = "cash" | "card" | "esewa" | "khalti" | "qr";

export interface CartItem {
  id: string;
  item: FoodItem;
  quantity: number;
  addedAt: number;
  specialInstructions?: string;
}

export interface CouponInfo {
  code: string;
  discountPercentage: number;
  description: string;
}

export interface CartState {
  items: CartItem[];
  orderType: OrderType;
  tableNumber: string;
  specialInstructions: string;
  paymentMethod: PaymentMethod;
  appliedCoupon: CouponInfo | null;

  // Cart actions
  addItem: (item: FoodItem, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  resetToDemoItems: () => void;

  // Order meta actions
  setOrderType: (type: OrderType) => void;
  setTableNumber: (table: string) => void;
  setSpecialInstructions: (instructions: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Calculation helpers
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getServiceCharge: () => number;
  getVat: () => number;
  getTotalPayable: () => number;
}
