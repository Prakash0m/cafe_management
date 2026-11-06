export type OrderStatus = "placed" | "preparing" | "ready" | "completed" | "cancelled";
export type OrderType = "dine-in" | "takeaway" | "delivery";
export type PaymentMethod = "cash" | "card" | "esewa" | "khalti" | "qr";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  notes?: string;
}

export interface CafeOrder {
  id: string; // e.g. "BB1048", "BB-8492"
  displayId: string; // "#BB1048"
  createdAt: string; // ISO string
  placedTime: string; // e.g. "10:24 AM"
  estimatedReadyTime?: string; // e.g. "10:45 AM"
  status: OrderStatus;
  orderType: OrderType;
  tableNumber: string; // e.g. "Table T4 (4 Seats)"
  cleanTableNumber: string; // e.g. "T4"
  items: OrderItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  discountCode?: string;
  serviceCharge: number;
  vat: number;
  totalPaid: number;
  paymentMethod: PaymentMethod | string;
  specialInstructions?: string;
  customerName: string;
  notificationsEnabled: boolean;
}
