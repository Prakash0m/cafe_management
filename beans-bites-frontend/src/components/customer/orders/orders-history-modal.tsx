"use client";

import * as React from "react";
import Image from "next/image";
import {
  X,
  Receipt,
  Clock,
  ChevronRight,
  Sparkles,
  ChefHat,
  BellRing,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { useOrdersStore } from "@/store/orders.store";
import { CafeOrder, OrderStatus } from "@/types/order.types";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

interface OrdersHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOrder: (order: CafeOrder) => void;
}

export function OrdersHistoryModal({
  isOpen,
  onClose,
  onSelectOrder,
}: OrdersHistoryModalProps) {
  const { orders, activeOrderId, updateOrderStatus, clearHistory } =
    useOrdersStore();

  if (!isOpen) return null;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "placed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3 h-3" />
            <span>Order Placed</span>
          </span>
        );
      case "preparing":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <ChefHat className="w-3 h-3 text-amber-600 animate-bounce" />
            <span>In Kitchen</span>
          </span>
        );
      case "ready":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <BellRing className="w-3 h-3 text-emerald-600" />
            <span>Ready for Serving</span>
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-700 border border-gray-200">
            <CheckCircle2 className="w-3 h-3 text-gray-500" />
            <span>Completed</span>
          </span>
        );
      default:
        return null;
    }
  };

  const handleAdvanceStatus = (e: React.MouseEvent, order: CafeOrder) => {
    e.stopPropagation();
    const cycle: Record<OrderStatus, OrderStatus> = {
      placed: "preparing",
      preparing: "ready",
      ready: "completed",
      completed: "preparing",
      cancelled: "preparing",
    };
    const nextStatus = cycle[order.status];
    updateOrderStatus(order.id, nextStatus);
    toast.success(`Order ${order.displayId} status updated to "${nextStatus.toUpperCase()}"!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50/70 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FF5A0A] text-white flex items-center justify-center shadow-sm">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-gray-900 tracking-tight leading-tight">
                My Orders History
              </h3>
              <p className="text-[11px] text-gray-500 font-medium">
                {orders.length} {orders.length === 1 ? "order" : "orders"} on record • Click any order to track live
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Orders List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 divide-y divide-gray-100/80">
          {orders.map((order) => {
            const isCurrentlySelected = order.id === activeOrderId;

            return (
              <div
                key={order.id}
                onClick={() => {
                  onSelectOrder(order);
                  onClose();
                }}
                className={`pt-3.5 first:pt-0 rounded-2xl p-3 transition-all cursor-pointer border ${
                  isCurrentlySelected
                    ? "bg-orange-50/60 border-orange-200 shadow-2xs"
                    : "bg-white hover:bg-gray-50/80 border-gray-100"
                }`}
              >
                {/* Top Row: Order ID, Type, Status */}
                <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm sm:text-base text-gray-900 font-mono">
                      {order.displayId}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-gray-100 text-gray-600">
                      {order.cleanTableNumber ? `Table ${order.cleanTableNumber}` : order.orderType}
                    </span>
                    {isCurrentlySelected && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FF5A0A] text-white">
                        Viewing Now
                      </span>
                    )}
                  </div>
                  <div>{getStatusBadge(order.status)}</div>
                </div>

                {/* Middle Row: Items preview & thumbnails */}
                <div className="flex items-center justify-between gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="flex -space-x-2 overflow-hidden flex-shrink-0">
                      {order.items.slice(0, 3).map((it, idx) => (
                        <div
                          key={idx}
                          className="relative w-7 h-7 rounded-lg overflow-hidden border-2 border-white shadow-2xs bg-gray-100"
                        >
                          <Image
                            src={it.imageUrl}
                            alt={it.name}
                            fill
                            sizes="28px"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="truncate text-gray-700 font-medium">
                      {order.items.map((it) => `${it.quantity}× ${it.name}`).join(", ")}
                    </span>
                  </div>

                  <span className="font-extrabold text-gray-900 text-sm font-mono flex-shrink-0">
                    {formatPrice(order.totalPaid)}
                  </span>
                </div>

                {/* Bottom Row: Timestamp & Status Simulator Button */}
                <div className="mt-2.5 pt-2 border-t border-gray-100/60 flex items-center justify-between text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Placed at {order.placedTime}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleAdvanceStatus(e, order)}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                      title="Click to simulate next stage"
                    >
                      Cycle Status ↻
                    </button>
                    <span className="text-[#FF5A0A] font-bold inline-flex items-center gap-0.5">
                      Track Live
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => {
              clearHistory();
              toast.info("Reset to default reference order #BB1048");
            }}
            className="text-gray-500 hover:text-red-600 transition-colors inline-flex items-center gap-1 text-[11px] font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Demo Orders</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-900 hover:bg-black text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

