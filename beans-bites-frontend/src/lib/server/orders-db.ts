import { CafeOrder, OrderStatus, OrderType, OrderItem } from "@/types/order.types";
import { ASSETS } from "@/lib/assets";
import fs from "fs";
import path from "path";

// Canonical Seed Orders matching design references and user screenshots
export const SEED_ORDERS: CafeOrder[] = [
  {
    id: "BB1048",
    displayId: "#BB1048",
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    placedTime: "10:24 AM",
    estimatedReadyTime: "10:45 AM",
    status: "preparing",
    orderType: "dine-in",
    tableNumber: "Table T4 (4 Seats)",
    cleanTableNumber: "T4",
    items: [
      {
        id: "ord-item-1",
        name: "Margherita Pizza",
        price: 420,
        quantity: 1,
        imageUrl: ASSETS.food.pizza.margherita,
      },
      {
        id: "ord-item-2",
        name: "Chicken Burger",
        price: 380,
        quantity: 2,
        imageUrl: ASSETS.food.burger.chicken,
      },
      {
        id: "ord-item-3",
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
  },
  {
    id: "BB2641",
    displayId: "#BB2641",
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    placedTime: "10:40 AM",
    estimatedReadyTime: "11:00 AM",
    status: "preparing",
    orderType: "dine-in",
    tableNumber: "Table T4 (4 Seats)",
    cleanTableNumber: "T4",
    items: [
      {
        id: "ord-item-4",
        name: "Margherita Pizza",
        price: 420,
        quantity: 1,
        imageUrl: ASSETS.food.pizza.margherita,
      },
      {
        id: "ord-item-5",
        name: "Chicken Burger",
        price: 380,
        quantity: 2,
        imageUrl: ASSETS.food.burger.chicken,
      },
      {
        id: "ord-item-6",
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
    paymentMethod: "esewa",
    specialInstructions: "Served fresh to Table T4.",
    customerName: "Table T4 Guest",
    notificationsEnabled: true,
  },
];

class OrdersDatabase {
  private orders: Map<string, CafeOrder> = new Map();
  private filePath: string;

  constructor() {
    this.filePath = path.join(process.cwd(), "data", "orders.json");
    this.init();
  }

  private init(): void {
    // Try to load persisted orders from disk
    try {
      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, "utf-8");
        const parsed = JSON.parse(fileContent);
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsed.forEach((ord: CafeOrder) => {
            const cleanKey = ord.id.replace(/^#/, "").toUpperCase();
            this.orders.set(cleanKey, ord);
          });
          return;
        }
      }
    } catch {
      // Fallback to in-memory seed orders
    }

    // Populate with default seed orders
    SEED_ORDERS.forEach((ord) => {
      const cleanKey = ord.id.replace(/^#/, "").toUpperCase();
      this.orders.set(cleanKey, { ...ord });
    });
    this.persistToDisk();
  }

  private persistToDisk(): void {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const data = Array.from(this.orders.values());
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf-8");
    } catch {
      // Ignore disk write errors in ephemeral environments
    }
  }

  public getAll(status?: OrderStatus, table?: string): CafeOrder[] {
    let result = Array.from(this.orders.values());

    if (status) {
      result = result.filter(
        (o) => o.status.toLowerCase() === status.toLowerCase()
      );
    }

    if (table) {
      const cleanTable = table.replace(/^Table\s*/i, "").trim().toLowerCase();
      result = result.filter(
        (o) =>
          o.cleanTableNumber.toLowerCase() === cleanTable ||
          o.tableNumber.toLowerCase().includes(cleanTable)
      );
    }

    // Sort newest orders first
    return result.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public getById(id: string): CafeOrder | undefined {
    const cleanKey = id.replace(/^#/, "").trim().toUpperCase();
    return this.orders.get(cleanKey);
  }

  public create(orderData: Partial<CafeOrder>): CafeOrder {
    const now = new Date();
    const placedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const rawId = orderData.id || `BB${randomDigits}`;
    const cleanId = rawId.replace(/^#/, "").trim();
    const cleanKey = cleanId.toUpperCase();

    const rawTable = orderData.tableNumber || "Table T4 (4 Seats)";
    const cleanTable =
      orderData.cleanTableNumber ||
      rawTable.replace(/^Table\s*/i, "").split(" ")[0] ||
      "T4";

    const items: OrderItem[] = orderData.items || [];
    const itemCount =
      orderData.itemCount ||
      items.reduce((acc, it) => acc + (it.quantity || 1), 0) ||
      1;

    const newOrder: CafeOrder = {
      id: cleanId,
      displayId: `#${cleanId}`,
      createdAt: orderData.createdAt || now.toISOString(),
      placedTime: orderData.placedTime || placedTime,
      estimatedReadyTime:
        orderData.estimatedReadyTime ||
        new Date(now.getTime() + 20 * 60000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      status: orderData.status || "preparing",
      orderType: (orderData.orderType as OrderType) || "dine-in",
      tableNumber: rawTable,
      cleanTableNumber: cleanTable,
      items,
      itemCount,
      subtotal: orderData.subtotal || 0,
      discount: orderData.discount || 0,
      discountCode: orderData.discountCode,
      serviceCharge: orderData.serviceCharge || 0,
      vat: orderData.vat || 0,
      totalPaid: orderData.totalPaid || 0,
      paymentMethod: orderData.paymentMethod || "cash",
      specialInstructions: orderData.specialInstructions || "",
      customerName: orderData.customerName || "Customer",
      notificationsEnabled:
        orderData.notificationsEnabled !== undefined
          ? orderData.notificationsEnabled
          : true,
    };

    this.orders.set(cleanKey, newOrder);
    this.persistToDisk();
    return newOrder;
  }

  public updateStatus(id: string, status: OrderStatus): CafeOrder | null {
    const cleanKey = id.replace(/^#/, "").trim().toUpperCase();
    const existing = this.orders.get(cleanKey);
    if (!existing) return null;

    const updated: CafeOrder = {
      ...existing,
      status,
    };

    this.orders.set(cleanKey, updated);
    this.persistToDisk();
    return updated;
  }

  public update(id: string, updates: Partial<CafeOrder>): CafeOrder | null {
    const cleanKey = id.replace(/^#/, "").trim().toUpperCase();
    const existing = this.orders.get(cleanKey);
    if (!existing) return null;

    const updated: CafeOrder = {
      ...existing,
      ...updates,
      id: existing.id, // Immutable ID
      displayId: existing.displayId,
    };

    this.orders.set(cleanKey, updated);
    this.persistToDisk();
    return updated;
  }

  public delete(id: string): boolean {
    const cleanKey = id.replace(/^#/, "").trim().toUpperCase();
    const existed = this.orders.delete(cleanKey);
    if (existed) {
      this.persistToDisk();
    }
    return existed;
  }

  public reset(): void {
    this.orders.clear();
    SEED_ORDERS.forEach((ord) => {
      const cleanKey = ord.id.replace(/^#/, "").toUpperCase();
      this.orders.set(cleanKey, { ...ord });
    });
    this.persistToDisk();
  }
}

// Global singleton instance so it survives hot reloads and API requests
const globalForOrders = global as unknown as { ordersDb?: OrdersDatabase };
export const ordersDb = globalForOrders.ordersDb || new OrdersDatabase();
globalForOrders.ordersDb = ordersDb;
