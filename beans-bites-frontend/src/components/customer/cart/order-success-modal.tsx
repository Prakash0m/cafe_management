"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Utensils, Receipt, ArrowRight, X } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { formatPrice } from "@/lib/utils";
import { AnimatedOrderSuccessIcon } from "@/components/customer/orders/animated-order-success-icon";

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
}

export function OrderSuccessModal({
  isOpen,
  onClose,
  orderNumber,
}: OrderSuccessModalProps) {
  const {
    items,
    orderType,
    tableNumber,
    paymentMethod,
    getTotalPayable,
    clearCart,
  } = useCartStore();

  if (!isOpen) return null;

  const totalPayable = getTotalPayable();

  const handleFinish = () => {
    clearCart();
    onClose();
  };

  const getPaymentName = () => {
    switch (paymentMethod) {
      case "card":
        return "Card (Visa / Mastercard)";
      case "esewa":
        return "eSewa Mobile Wallet";
      case "khalti":
        return "Khalti Digital Wallet";
      case "qr":
        return "FSR / Fonepay QR";
      case "cash":
      default:
        return "Cash at Counter / Table";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100 flex flex-col max-h-[90vh]">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-[#FF5A0A] to-[#E04E07] px-6 py-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="mb-3 flex justify-center">
            <AnimatedOrderSuccessIcon size="sm" allowReplay={true} />
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Order Placed Successfully!
          </h2>
          <p className="text-white/90 text-xs sm:text-sm mt-1">
            Thank you for dining with Beans & Bites.
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-gray-800 text-xs sm:text-sm">
          {/* Order ID & Status Pill */}
          <div className="flex items-center justify-between p-3.5 bg-[#FFF8F3] border border-[#FFE8DC] rounded-2xl">
            <div>
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                Order Number
              </span>
              <span className="font-extrabold text-base sm:text-lg text-[#FF5A0A]">
                {orderNumber}
              </span>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                <Clock className="w-3.5 h-3.5" />
                <span>Preparing (15-20m)</span>
              </span>
            </div>
          </div>

          {/* Table / Order Meta */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-gray-500 font-medium block">Order Type</span>
              <span className="font-bold text-gray-900 capitalize flex items-center gap-1.5 mt-0.5">
                <Utensils className="w-3.5 h-3.5 text-[#FF5A0A]" />
                {orderType === "dine-in"
                  ? `Dine-in (${tableNumber || "Table T4"})`
                  : orderType}
              </span>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-gray-500 font-medium block">Payment Method</span>
              <span className="font-bold text-gray-900 truncate block mt-0.5">
                {getPaymentName()}
              </span>
            </div>
          </div>

          {/* Ordered Items summary */}
          <div>
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Receipt className="w-3.5 h-3.5 text-gray-500" />
              <span>Items Summary</span>
            </h4>
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl p-3 bg-gray-50/50 space-y-2">
              {items.map((cartItem) => (
                <div
                  key={cartItem.id}
                  className="flex items-center justify-between text-xs pt-1.5 first:pt-0"
                >
                  <span className="text-gray-700">
                    <span className="font-bold text-gray-900">{cartItem.quantity}×</span>{" "}
                    {cartItem.item.name}
                  </span>
                  <span className="font-semibold text-gray-900">
                    NPR {(cartItem.item.price * cartItem.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Amount Paid */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-sm">
            <span className="font-bold text-gray-700">Total Amount Payable</span>
            <span className="font-extrabold text-[#FF5A0A] text-base">
              {formatPrice(totalPayable)}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-gray-50/90 border-t border-gray-100 flex items-center gap-3">
          <Link
            href="/"
            onClick={handleFinish}
            className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-center font-bold text-xs sm:text-sm text-gray-700 hover:bg-white transition-colors"
          >
            Back to Home
          </Link>

          <Link
            href={`/orders?id=${orderNumber.replace('#', '')}`}
            onClick={handleFinish}
            className="flex-1 py-3 px-4 rounded-xl bg-[#FF5A0A] hover:bg-[#E04E07] text-white text-center font-bold text-xs sm:text-sm transition-all shadow-md shadow-orange-500/20 inline-flex items-center justify-center gap-1.5"
          >
            <span>Track Order</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

