"use client";

import * as React from "react";
import { MessageSquareText } from "lucide-react";
import { useCartStore } from "@/store/cart.store";

export function SpecialInstructions() {
  const { specialInstructions, setSpecialInstructions } = useCartStore();

  const maxLength = 200;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-gray-900 font-bold text-xs sm:text-sm">
        <MessageSquareText className="w-4 h-4 text-gray-500" />
        <span>Special Instructions (Optional)</span>
      </div>

      <div className="bg-white rounded-2xl p-3 sm:p-3.5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] focus-within:border-[#FF5A0A] transition-colors relative">
        <textarea
          rows={3}
          maxLength={maxLength}
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder="e.g. Less spicy, no onion in the burger, extra ice in latte..."
          className="w-full text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none resize-none bg-transparent"
        />
        <div className="text-right text-[11px] text-gray-400 font-medium">
          {specialInstructions.length}/{maxLength}
        </div>
      </div>
    </div>
  );
}

