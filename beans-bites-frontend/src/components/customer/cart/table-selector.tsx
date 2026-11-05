"use client";

import * as React from "react";
import { useCartStore } from "@/store/cart.store";
import { Utensils, ChevronDown, Check, MapPin, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TABLES = [
  { id: "T1", label: "Table T1 (2 Seats - Window View)" },
  { id: "T2", label: "Table T2 (2 Seats - Cozy Corner)" },
  { id: "T3", label: "Table T3 (4 Seats - Center Hall)" },
  { id: "T4", label: "Table T4 (4 Seats - Outdoor Patio)", default: true },
  { id: "T5", label: "Table T5 (6 Seats - Family Booth)" },
  { id: "T6", label: "Table T6 (8 Seats - VIP Lounge)" },
];

export function TableSelector() {
  const { orderType, tableNumber, setTableNumber } = useCartStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [takeawayName, setTakeawayName] = React.useState("Prakash Sharma");
  const [deliveryAddress, setDeliveryAddress] = React.useState("Kathmandu, Ward 4");

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (orderType === "takeaway") {
    return (
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-bold text-gray-800">
          Pickup Contact Details <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <User className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={takeawayName}
            onChange={(e) => setTakeawayName(e.target.value)}
            placeholder="Enter customer name & phone"
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-[#FF5A0A]"
          />
        </div>
      </div>
    );
  }

  if (orderType === "delivery") {
    return (
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-bold text-gray-800">
          Delivery Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <MapPin className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder="Enter delivery street address & phone"
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-[#FF5A0A]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1.5" ref={dropdownRef}>
      <label className="block text-xs sm:text-sm font-bold text-gray-800">
        Table Number <span className="text-[#DC2626]">*</span>
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white border border-gray-200 hover:border-gray-300 rounded-xl px-3.5 py-2.5 sm:py-3 flex items-center justify-between text-xs sm:text-sm font-medium text-gray-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Utensils className="w-4 h-4 text-[#FF5A0A] flex-shrink-0" />
            <span className="truncate font-semibold">{tableNumber || "Table T4 (4 Seats)"}</span>
          </div>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0",
              isOpen && "rotate-180 text-gray-700"
            )}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-lg z-30 py-1 divide-y divide-gray-50 max-h-56 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            {TABLES.map((t) => {
              const isSelected = tableNumber === t.label;

              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTableNumber(t.label);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full px-3.5 py-2 flex items-center justify-between text-xs sm:text-sm text-left transition-colors",
                    isSelected
                      ? "bg-[#FFF8F3] text-[#FF5A0A] font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <span>{t.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#FF5A0A]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

