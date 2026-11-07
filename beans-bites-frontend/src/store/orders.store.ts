import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CafeOrder, OrderStatus, OrderItem, OrderType } from "@/types/order.types";
import { ASSETS } from "@/lib/assets";
import { ordersService } from "@/lib/api/orders.service";

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
  isBackendSynced: boolean;
  lastSyncedAt: string | null;

  // Actions
  addOrder: (order: Partial<CafeOrder>) => Promise<CafeOrder>;
  setActiveOrder: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  toggleOrderNotifications: (orderId: string) => Promise<void>;
  getOrderById: (orderId: string) => CafeOrder | undefined;
  getActiveOrder: () => CafeOrder;
  clearHistory: () => void;
  syncFromBackend: (orderId?: string) => Promise<void>;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [DEFAULT_REFERENCE_ORDER],
      activeOrderId: "BB1048",
      isBackendSynced: false,
      lastSyncedAt: null,

      addOrder: async (partial) => {
        const now = new Date();
        const placedTime = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const generatedId = partial.id || `BB${randomDigits}`;
        const cleanId = generatedId.replace(/^#/, "").trim();

        const rawTable = partial.tableNumber || "Table T4 (4 Seats)";
        const cleanTable =
          partial.cleanTableNumber ||
          rawTable.replace(/^Table\s*/i, "").split(" ")[0] ||
          "T4";

        const items: OrderItem[] = partial.items || [];
        const itemCount =
          partial.itemCount ||
          items.reduce((acc, it) => acc + (it.quantity || 1), 0) ||
          1;

        const newOrder: CafeOrder = {
          id: cleanId,
          displayId: `#${cleanId}`,
          createdAt: partial.createdAt || now.toISOString(),
          placedTime: partial.placedTime || placedTime,
          estimatedReadyTime:
            partial.estimatedReadyTime ||
            new Date(now.getTime() + 20 * 60000).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          status: partial.status || "preparing",
          orderType: (partial.orderType as OrderType) || "dine-in",
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
          customerName: partial.customerName || "Customer",
          notificationsEnabled:
            partial.notificationsEnabled !== undefined
              ? partial.notificationsEnabled
              : true,
        };

        // Update local store immediately for instant UI response
        set((state) => {
          const exists = state.orders.some(
            (o) => o.id.toLowerCase() === newOrder.id.toLowerCase()
          );
          const updatedOrders = exists
            ? state.orders.map((o) =>
                o.id.toLowerCase() === newOrder.id.toLowerCase() ? newOrder : o
              )
            : [newOrder, ...state.orders];

          return {
            orders: updatedOrders,
            activeOrderId: newOrder.id,
            isBackendSynced: true,
            lastSyncedAt: new Date().toISOString(),
          };
        });

        // Persist to real backend API asynchronously
        try {
          const backendCreated = await ordersService.create(newOrder);
          if (backendCreated) {
            set((state) => ({
              orders: state.orders.map((o) =>
                o.id.toLowerCase() === backendCreated.id.toLowerCase()
                  ? backendCreated
                  : o
              ),
              isBackendSynced: true,
              lastSyncedAt: new Date().toISOString(),
            }));
          }
        } catch (e) {
          console.warn("Backend order creation warning:", e);
        }

        return newOrder;
      },

      setActiveOrder: (orderId: string) => {
        const clean = orderId.replace(/^#/, "").trim();
        set({ activeOrderId: clean });
        // Automatically fetch latest data from backend for this active order
        get().syncFromBackend(clean);
      },

      updateOrderStatus: async (orderId: string, status: OrderStatus) => {
        const clean = orderId.replace(/^#/, "").trim();

        // 1. Optimistic update
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id.toLowerCase() === clean.toLowerCase() ? { ...o, status } : o
          ),
          lastSyncedAt: new Date().toISOString(),
        }));

        // 2. Real backend update
        try {
          const backendUpdated = await ordersService.updateStatus(clean, status);
          if (backendUpdated) {
            set((state) => ({
              orders: state.orders.map((o) =>
                o.id.toLowerCase() === backendUpdated.id.toLowerCase()
                  ? backendUpdated
                  : o
              ),
              isBackendSynced: true,
              lastSyncedAt: new Date().toISOString(),
            }));
          }
        } catch (e) {
          console.warn("Failed to update status on backend:", e);
        }
      },

      toggleOrderNotifications: async (orderId: string) => {
        const clean = orderId.replace(/^#/, "").trim();
        const current = get().orders.find(
          (o) => o.id.toLowerCase() === clean.toLowerCase()
        );
        const nextVal = current ? !current.notificationsEnabled : true;

        // Local update
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id.toLowerCase() === clean.toLowerCase()
              ? { ...o, notificationsEnabled: nextVal }
              : o
          ),
        }));

        // Backend update
        try {
          await ordersService.update(clean, { notificationsEnabled: nextVal });
        } catch (e) {
          console.warn("Failed to toggle notifications on backend:", e);
        }
      },

      getOrderById: (orderId: string) => {
        const clean = orderId.replace(/^#/, "").trim().toLowerCase();
        const state = get();
        return (
          state.orders.find((o) => o.id.toLowerCase() === clean) ||
          (clean === "bb1048" ? DEFAULT_REFERENCE_ORDER : undefined)
        );
      },

      getActiveOrder: () => {
        const state = get();
        const active = state.orders.find(
          (o) => o.id.toLowerCase() === state.activeOrderId.toLowerCase()
        );
        return active || state.orders[0] || DEFAULT_REFERENCE_ORDER;
      },

      clearHistory: () => {
        set({
          orders: [DEFAULT_REFERENCE_ORDER],
          activeOrderId: "BB1048",
          isBackendSynced: false,
        });
      },

      syncFromBackend: async (orderId?: string) => {
        try {
          if (orderId) {
            const clean = orderId.replace(/^#/, "").trim();
            const single = await ordersService.getById(clean);
            if (single) {
              set((state) => {
                const exists = state.orders.some(
                  (o) => o.id.toLowerCase() === single.id.toLowerCase()
                );
                return {
                  orders: exists
                    ? state.orders.map((o) =>
                        o.id.toLowerCase() === single.id.toLowerCase() ? single : o
                      )
                    : [single, ...state.orders],
                  isBackendSynced: true,
                  lastSyncedAt: new Date().toISOString(),
                };
              });
              return;
            }
          }

          // Fetch all from backend
          const allOrders = await ordersService.getAll();
          if (allOrders && allOrders.length > 0) {
            set((state) => {
              // Merge preserving unique orders
              const map = new Map<string, CafeOrder>();
              // Add state orders first
              state.orders.forEach((o) => map.set(o.id.toUpperCase(), o));
              // Overwrite with fresh backend orders
              allOrders.forEach((o) => map.set(o.id.toUpperCase(), o));

              return {
                orders: Array.from(map.values()),
                isBackendSynced: true,
                lastSyncedAt: new Date().toISOString(),
              };
            });
          }
        } catch (e) {
          console.warn("Error during background sync:", e);
        }
      },
    }),
    {
      name: "bb_orders_storage",
    }
  )
);
