"use client";

import * as React from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { useOrdersStore, DEFAULT_REFERENCE_ORDER } from "@/store/orders.store";
import { OrderSuccessHero } from "@/components/customer/orders/order-success-hero";
import { OrderMetaBanner } from "@/components/customer/orders/order-meta-banner";
import { OrderStatusTracker } from "@/components/customer/orders/order-status-tracker";
import { OrderSummaryCard } from "@/components/customer/orders/order-summary-card";
import { OrderWhatsNextCard } from "@/components/customer/orders/order-whats-next-card";
import { OrdersHistoryModal } from "@/components/customer/orders/orders-history-modal";
import { CafeOrder } from "@/types/order.types";

function OrdersPageContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const {
    getOrderById,
    getActiveOrder,
    setActiveOrder,
    updateOrderStatus,
    toggleOrderNotifications,
  } = useOrdersStore();

  const [mounted, setMounted] = React.useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Look up order based on URL query `?id=...` or route param `/orders/[orderId]`
  const rawId = (params?.orderId as string) || searchParams.get("id");
  const paramOrderId = rawId ? rawId.replace(/^#/, "").trim() : undefined;
  const order: CafeOrder = React.useMemo(() => {
    if (paramOrderId) {
      const found = getOrderById(paramOrderId);
      if (found) return found;
    }
    return getActiveOrder() || DEFAULT_REFERENCE_ORDER;
  }, [paramOrderId, getOrderById, getActiveOrder]);

  const handleSelectOrderFromHistory = (selected: CafeOrder) => {
    setActiveOrder(selected.id);
    router.push(`/orders?id=${selected.id}`, { scroll: false });
  };

  if (!mounted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF5A0A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF7F4] py-4 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Success Hero, Meta Pill, Status Stepper & Order Summary */}
          <div className="lg:col-span-7 space-y-4">
            {/* 1. Success Celebration Hero */}
            <OrderSuccessHero />

            {/* 2. Order ID, Order Type & Table Pill Banner */}
            <OrderMetaBanner
              orderId={order.displayId}
              orderType={order.orderType === "dine-in" ? "Dine-in" : order.orderType}
              tableNumber={order.cleanTableNumber || "T4"}
            />

            {/* 3. 4-Stage Status Stepper Tracker */}
            <OrderStatusTracker
              currentStage={
                order.status === "cancelled" ? "preparing" : order.status
              }
              placedTime={order.placedTime || "10:24 AM"}
              onStageChange={(stage) => updateOrderStatus(order.id, stage)}
            />

            {/* 4. Detailed Order Summary Card */}
            <OrderSummaryCard
              items={order.items}
              totalItemCount={order.itemCount}
              subtotal={order.subtotal}
              discount={order.discount}
              discountCode={order.discountCode || "WEEKEND20 - 20%"}
              serviceCharge={order.serviceCharge}
              vat={order.vat}
              totalPaid={order.totalPaid}
            />
          </div>

          {/* RIGHT COLUMN: Cafe Interior Neon Photo & What's Next Action Card */}
          <div className="lg:col-span-5 pt-2 lg:pt-4">
            <OrderWhatsNextCard
              orderId={order.displayId}
              tableNumber={order.cleanTableNumber || "T4"}
              notificationsEnabled={order.notificationsEnabled}
              onToggleNotifications={() => toggleOrderNotifications(order.id)}
              onOpenHistory={() => setIsHistoryOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Orders History Drawer / Modal */}
      <OrdersHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectOrder={handleSelectOrderFromHistory}
      />
    </div>
  );
}

export default function OrdersPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#FF5A0A] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <OrdersPageContent />
    </React.Suspense>
  );
}
