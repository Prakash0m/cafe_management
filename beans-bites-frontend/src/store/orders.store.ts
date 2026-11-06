import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CafeOrder, OrderStatus, OrderItem, OrderType } from "@/types/order.types";
import { ASSETS } from "@/lib/assets";

export const DEFAULT_REFERENCE_ORDER: CafeOrder = {
  id: "BB1048",
  displayId: "#BB1048",
  createdAt: new Date().toISOString(),
  placedTime: "10:24 AM",
  estimatedReadyTime: "10:45 AM",
  status: "preparing",
  orderType: "dine-in",
  tableNumber: "Table T4 (4 Seats)",
  cleanTableNumber: "T4",
  items: [
    {
      id: "ord-ref-1",
      name: "Margherita Pizza",
      price: 420,
      quantity: 1,
      imageUrl: ASSETS.food.pizza.margherita,
    },
    {
      id: "ord-ref-2",
      name: "Chicken Burger",
      price: 380,
      quantity: 2,
      imageUrl: ASSETS.food.burger.chicken,
    },
    {
      id: "ord-ref-3",
      name: "Iced Latte",
      price: 240,
      quantity: 1,
      imageUrl: ASSETS.food.beverages.icedLatte,
    },
  ],
  itemCount: 4,
  subtotal: 1420,
  discount: 284,
  discountCode: "WEEKEND20 - 20%",
  serviceCharge: 57,
  vat: 148,
  totalPaid: 1341,
  paymentMethod: "cash",
  specialInstructions: "Extra napkins and served hot please.",
  customerName: "Guest Customer",
  notificationsEnabled: true,
};

interface OrdersState {
  orders: CafeOrder[];
  activeOrderId: string;

  // Actions
  addOrder: (order: Partial<CafeOrder>) => CafeOrder;
  setActiveOrder: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  toggleOrderNotifications: (orderId: string) => void;
  getOrderById: (orderId: string) => CafeOrder | undefined;
  getActiveOrder: () => CafeOrder;
  clearHistory: () => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [DEFAULT_REFERENCE_ORDER],
      activeOrderId: "BB1048",

      addOrder: (partial) => {
        const now = new Date();
        const placedTime = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Generate a recognizable order number
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const generatedId = partial.id || `BB${randomDigits}`;
        const cleanId = generatedId.replace(/^#/, "");

        const rawTable = partial.tableNumber || "Table T4 (4 Seats)";
        const cleanTable =
          rawTable.replace(/^Table\s*/i, "").split(" ")[0] || "T4";

        const items: OrderItem[] = partial.items || [];
        const itemCount =
          items.reduce((acc, it) => acc + (it.quantity || 1), 0) || 1;

        const newOrder: CafeOrder = {
          id: cleanId,
          displayId: `#${cleanId}`,
          createdAt: now.toISOString(),
          placedTime: partial.placedTime || placedTime,
          estimatedReadyTime:
            partial.estimatedReadyTime ||
            new Date(now.getTime() + 20 * 60000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          status: partial.status || "preparing",
          orderType: partial.orderType || "dine-in",
          tableNumber: rawTable,
          cleanTableNumber: cleanTable,
          items,
          itemCount,
          subtotal: partial.subtotal || 0,
          discount: partial.discount || 0,
          discountCode: partial.discountCode,
          serviceCharge: partial.serviceCharge || 0,
          vat: partial.vat || 0,
          totalPaid: partial.totalPaid || 0,
          paymentMethod: partial.paymentMethod || "cash",
          specialInstructions: partial.specialInstructions || "",
          customerName: partial.customerName || "Guest Customer",
          notificationsEnabled:
            partial.notificationsEnabled !== undefined
              ? partial.notificationsEnabled
              : true,
        };

        set((state) => {
          // If order with this ID already exists, update it, else prepend
          const exists = state.orders.some((o) => o.id === newOrder.id);
          const updatedOrders = exists
            ? state.orders.map((o) => (o.id === newOrder.id ? newOrder : o))
            : [newOrder, ...state.orders];

          return {
            orders: updatedOrders,
            activeOrderId: newOrder.id,
          };
        });

        return newOrder;
      },

      setActiveOrder: (orderId: string) => {
        const clean = orderId.replace(/^#/, "");
        set({ activeOrderId: clean });
      },

      updateOrderStatus: (orderId: string, status: OrderStatus) => {
        const clean = orderId.replace(/^#/, "");
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === clean ? { ...o, status } : o
          ),
        }));
      },

      toggleOrderNotifications: (orderId: string) => {
        const clean = orderId.replace(/^#/, "");
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === clean
              ? { ...o, notificationsEnabled: !o.notificationsEnabled }
              : o
          ),
        }));
      },

      getOrderById: (orderId: string) => {
        const clean = orderId.replace(/^#/, "").trim();
        const state = get();
        return (
          state.orders.find((o) => o.id.toLowerCase() === clean.toLowerCase()) ||
          (clean.toLowerCase() === "bb1048" ? DEFAULT_REFERENCE_ORDER : undefined)
        );
      },

      getActiveOrder: () => {
        const state = get();
        const active = state.orders.find((o) => o.id === state.activeOrderId);
        return active || state.orders[0] || DEFAULT_REFERENCE_ORDER;
      },

      clearHistory: () => {
        set({
          orders: [DEFAULT_REFERENCE_ORDER],
          activeOrderId: "BB1048",
        });
      },
    }),
    {
      name: "bb_orders_storage",
    }
  )
);
