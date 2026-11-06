"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowLeft, UtensilsCrossed } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { useOrdersStore } from "@/store/orders.store";
import { ASSETS } from "@/lib/assets";
import { OrderTypeSelector } from "./order-type-selector";
import { TableSelector } from "./table-selector";
import { OrderDetailsMini } from "./order-details-mini";
import { SpecialInstructions } from "./special-instructions";
import { BillSummaryCard } from "./bill-summary-card";
import { PaymentMethodSelector } from "./payment-method-selector";
import { OrderSuccessModal } from "./order-success-modal";

interface PlaceOrderViewProps {
  onBackToCart: () => void;
  compact?: boolean;
}

export function PlaceOrderView({
  onBackToCart,
  compact = false,
}: PlaceOrderViewProps) {
  const cartStore = useCartStore();
  const { items } = cartStore;
  const { addOrder } = useOrdersStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState("#BB-8492");

  const handlePlaceOrder = () => {
    // Generate order ID
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newId = `BB${randomDigits}`;
    setOrderNumber(`#${newId}`);

    // Save to Orders store before clearing cart
    addOrder({
      id: newId,
      items: cartStore.items.map((ci) => ({
        id: ci.id,
        name: ci.item.name,
        price: ci.item.price,
        quantity: ci.quantity,
        imageUrl: ci.item.imageUrl || "",
      })),
      subtotal: cartStore.getSubtotal(),
      discount: cartStore.getDiscountAmount(),
      discountCode: cartStore.appliedCoupon
        ? `${cartStore.appliedCoupon.code} - ${cartStore.appliedCoupon.discountPercentage}%`
        : undefined,
      serviceCharge: cartStore.getServiceCharge(),
      vat: cartStore.getVat(),
      totalPaid: cartStore.getTotalPayable(),
      orderType: cartStore.orderType,
      tableNumber: cartStore.tableNumber || "Table T4 (4 Seats)",
      paymentMethod: cartStore.paymentMethod,
      specialInstructions: cartStore.specialInstructions,
      customerName: "Pankaj",
      status: "preparing",
    });

    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.06)] p-4 sm:p-6 flex flex-col justify-between max-w-4xl mx-auto w-full transition-all">
        {/* Top Bar with Brand Logo */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-100">
          <button
            type="button"
            onClick={onBackToCart}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Go back to cart"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Center Brand Logo */}
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0">
              <Image
                src={ASSETS.brand.favicon}
                alt="Beans & Bites"
                width={32}
                height={32}
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-[15px] sm:text-[17px] font-bold text-[#1F140E] leading-tight tracking-tight">
                Beans & Bites
              </span>
              <span className="text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.18em] text-[#64748B] font-semibold leading-none">
                CAFÉ & RESTAURANT
              </span>
            </div>
          </div>

          <div className="w-8" />
        </div>

        {/* Screen Title */}
        <div className="flex items-center gap-2 pt-4 pb-4">
          <button
            type="button"
            onClick={onBackToCart}
            className="text-gray-900 hover:text-[#FF5A0A] transition-colors p-0.5"
            aria-label="Back to Cart"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <h1 className="text-base sm:text-xl font-bold text-gray-900 tracking-tight">
            Place Order
          </h1>
        </div>

        {/* Main Content: 2-column on md/lg, stacked on small screens */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left Column (Span 7): Order Type, Table Number, Order Details, Special Instructions */}
          <div className="md:col-span-7 space-y-4">
            {/* 1. Order Type */}
            <OrderTypeSelector />

            {/* 2. Table Number Dropdown */}
            <TableSelector />

            {/* 3. Order Details (Mini items list) */}
            <OrderDetailsMini />

            {/* 4. Special Instructions */}
            <SpecialInstructions />
          </div>

          {/* Right Column (Span 5): Bill Summary, Payment Method, Place Order Button */}
          <div className="md:col-span-5 space-y-4">
            {/* 1. Bill Summary Card (with title) */}
            <BillSummaryCard showTitle={true} />

            {/* 2. Payment Method Selector */}
            <PaymentMethodSelector />

            {/* 3. Place Order Button */}
            <button
              type="button"
              disabled={items.length === 0}
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-to-r from-[#FF5A0A] to-[#E04E07] hover:from-[#E04E07] hover:to-[#C63E00] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2.5 text-sm sm:text-base group"
            >
              <UtensilsCrossed className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span>Place Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <OrderSuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderNumber={orderNumber}
      />
    </>
  );
}

