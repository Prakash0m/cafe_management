import { CafeOrder, OrderStatus } from "@/types/order.types";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export const ordersService = {
  /**
   * Fetch all orders from the backend API
   */
  async getAll(status?: OrderStatus, table?: string): Promise<CafeOrder[]> {
    try {
      const params = new URLSearchParams();
      if (status) params.append("status", status);
      if (table) params.append("table", table);

      const qs = params.toString() ? `?${params.toString()}` : "";
      const res = await fetch(`/api/orders${qs}`, {
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json: ApiResponse<CafeOrder[]> = await res.json();
      return json.data || [];
    } catch (err) {
      console.warn("Failed to fetch orders from backend:", err);
      return [];
    }
  },

  /**
   * Fetch a single order by ID from the backend API
   */
  async getById(orderId: string): Promise<CafeOrder | null> {
    try {
      const cleanId = orderId.replace(/^#/, "").trim();
      const res = await fetch(`/api/orders/${encodeURIComponent(cleanId)}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP error ${res.status}`);
      }

      const json: ApiResponse<CafeOrder> = await res.json();
      return json.data || null;
    } catch (err) {
      console.warn(`Failed to fetch order #${orderId} from backend:`, err);
      return null;
    }
  },

  /**
   * Create / Place a new order on the backend API
   */
  async create(orderData: Partial<CafeOrder>): Promise<CafeOrder | null> {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json: ApiResponse<CafeOrder> = await res.json();
      return json.data || null;
    } catch (err) {
      console.error("Failed to create order on backend:", err);
      return null;
    }
  },

  /**
   * Update order status on the backend API (placed, preparing, ready, completed)
   */
  async updateStatus(orderId: string, status: OrderStatus): Promise<CafeOrder | null> {
    try {
      const cleanId = orderId.replace(/^#/, "").trim();
      const res = await fetch(`/api/orders/${encodeURIComponent(cleanId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json: ApiResponse<CafeOrder> = await res.json();
      return json.data || null;
    } catch (err) {
      console.error(`Failed to update status for order #${orderId}:`, err);
      return null;
    }
  },

  /**
   * Update general fields (notifications, special instructions) on the backend
   */
  async update(orderId: string, updates: Partial<CafeOrder>): Promise<CafeOrder | null> {
    try {
      const cleanId = orderId.replace(/^#/, "").trim();
      const res = await fetch(`/api/orders/${encodeURIComponent(cleanId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json: ApiResponse<CafeOrder> = await res.json();
      return json.data || null;
    } catch (err) {
      console.error(`Failed to update order #${orderId}:`, err);
      return null;
    }
  },
};

