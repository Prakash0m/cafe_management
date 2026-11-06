"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cart.store";
import { OrderSuccessHero } from "@/components/customer/orders/order-success-hero";
import { OrderMetaBanner } from "@/components/customer/orders/order-meta-banner";
import { OrderStatusTracker } from "@/components/customer/orders/order-status-tracker";
import { OrderSummaryCard } from "@/components/customer/orders/order-summary-card";
import { OrderWhatsNextCard } from "@/components/customer/orders/order-whats-next-card";

function OrdersPageContent() {
  const searchParams = useSearchParams();
  const { items, tableNumber, orderType, appliedCoupon } = useCartStore();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Use URL order ID or fallback to stitch reference #BB1048
  const paramOrderId = searchParams.get("id");
  const orderId = paramOrderId ? `#${paramOrderId.replace(/^#/, "")}` : "#BB1048";

  // Use table number from store or fallback to T4
  const displayTable = tableNumber ? tableNumber.split(" ")[0].replace(/^Table\s*/i, "") : "T4";
  const displayOrderType = orderType ? (orderType === "dine-in" ? "Dine-in" : orderType) : "Dine-in";

  // Live timestamp
  const placedTime = React.useMemo(() => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF5A0A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF7F4] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Success Hero, Meta Pill, Status Stepper & Order Summary */}
          <div className="lg:col-span-7 space-y-4">
            {/* 1. Success Celebration Hero */}
            <OrderSuccessHero />

            {/* 2. Order ID, Order Type & Table Pill Banner */}
            <OrderMetaBanner
              orderId={orderId}
              orderType={displayOrderType}
              tableNumber={displayTable}
            />

            {/* 3. 4-Stage Status Stepper Tracker */}
            <OrderStatusTracker
              currentStage="preparing"
              placedTime={placedTime || "10:24 AM"}
            />

            {/* 4. Detailed Order Summary Card */}
            <OrderSummaryCard
              items={items.length > 0 ? items : undefined}
              subtotal={1420}
              discount={284}
              discountCode={appliedCoupon ? `${appliedCoupon.code} - ${appliedCoupon.discountPercentage}%` : "WEEKEND20 - 20%"}
              serviceCharge={57}
              vat={148}
              totalPaid={1341}
            />
          </div>

          {/* RIGHT COLUMN: Cafe Interior Neon Photo & What's Next Action Card */}
          <div className="lg:col-span-5 pt-2 lg:pt-4">
            <OrderWhatsNextCard
              orderId={orderId}
              tableNumber={displayTable}
            />
          </div>
        </div>
      </div>
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
