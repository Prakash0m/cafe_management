"use client";

import * as React from "react";
import { PaymentMethod } from "@/types/cart.types";
import { useCartStore } from "@/store/cart.store";
import { Banknote, CreditCard, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

export function PaymentMethodSelector() {
  const { paymentMethod, setPaymentMethod } = useCartStore();

  const methods: Array<{
    id: PaymentMethod;
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      id: "cash",
      label: "Cash",
      icon: (
        <span className="w-6 h-5 rounded border border-gray-400 bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
          <Banknote className="w-3.5 h-3.5" />
        </span>
      ),
    },
    {
      id: "card",
      label: "Card (Visa / Mastercard)",
      icon: (
        <span className="w-6 h-5 rounded border border-gray-300 bg-slate-50 text-slate-700 flex items-center justify-center">
          <CreditCard className="w-3.5 h-3.5" />
        </span>
      ),
    },
    {
      id: "esewa",
      label: "eSewa",
      icon: (
        <span className="w-5 h-5 rounded-full bg-[#60BB46] text-white flex items-center justify-center font-black text-xs shadow-sm">
          e
        </span>
      ),
    },
    {
      id: "khalti",
      label: "Khalti",
      icon: (
        <span className="w-5 h-5 rounded-md bg-[#5C2D91] text-white flex items-center justify-center font-black text-xs shadow-sm">
          K
        </span>
      ),
    },
    {
      id: "qr",
      label: "QR Payment",
      icon: (
        <span className="w-6 h-5 rounded border border-gray-300 bg-gray-50 text-gray-800 flex items-center justify-center">
          <QrCode className="w-3.5 h-3.5" />
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3">
      <h3 className="font-bold text-gray-900 text-sm sm:text-base tracking-tight">
        Payment Method
      </h3>

      <div className="space-y-2">
        {methods.map((m) => {
          const isSelected = paymentMethod === m.id;

          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setPaymentMethod(m.id)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-150 text-left select-none",
                isSelected
                  ? "border-[#FF5A0A] bg-[#FFF8F3] text-gray-900 shadow-sm ring-1 ring-[#FF5A0A]/30"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/60 text-gray-700"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors",
                    isSelected
                      ? "border-[#FF5A0A] bg-white"
                      : "border-gray-300 bg-transparent"
                  )}
                >
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A0A]" />
                  )}
                </span>

                <div className="flex items-center gap-2.5">
                  {m.icon}
                  <span>{m.label}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
