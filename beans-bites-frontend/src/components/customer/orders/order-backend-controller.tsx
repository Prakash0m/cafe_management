"use client";

import * as React from "react";
import { ChefHat, CheckCircle2, Clock, UtensilsCrossed, RefreshCw, Server, ChevronDown, ChevronUp } from "lucide-react";
import { OrderStatus, CafeOrder } from "@/types/order.types";
import { useOrdersStore } from "@/store/orders.store";
import { toast } from "sonner";

interface OrderBackendControllerProps {
  order: CafeOrder;
}

export function OrderBackendController({ order }: OrderBackendControllerProps) {
  const { updateOrderStatus, syncFromBackend, isBackendSynced, lastSyncedAt } = useOrdersStore();
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(true);

  const stages: {
    id: OrderStatus;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    desc: string;
  }[] = [
    {
      id: "placed",
      label: "Placed",
      icon: Clock,
      color: "bg-blue-500",
      desc: "New order received",
    },
    {
      id: "preparing",
      label: "Preparing",
      icon: ChefHat,
      color: "bg-amber-500",
      desc: "Cooking in kitchen",
    },
    {
      id: "ready",
      label: "Ready",
      icon: UtensilsCrossed,
      color: "bg-purple-500",
      desc: "Food ready to serve",
    },
    {
      id: "completed",
      label: "Completed",
      icon: CheckCircle2,
      color: "bg-emerald-600",
      desc: "Order served & paid",
    },
  ];

  const handleStageClick = async (status: OrderStatus) => {
    if (order.status === status) return;
    setIsUpdating(true);

    try {
      await updateOrderStatus(order.id, status);
      toast.success(
        `Backend updated: Order #${order.id} status changed to "${status}"`,
        {
          description: `Synced with Next.js Backend API (/api/orders/${order.id})`,
        }
      );
    } catch {
      toast.error("Failed to update status on backend");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRefresh = async () => {
    setIsUpdating(true);
    try {
      await syncFromBackend(order.id);
      toast.info("Refreshed state from backend server");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-orange-200/80 shadow-xs overflow-hidden mt-6 transition-all">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-[#180C07] to-[#2B160C] px-4 py-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-[#FF5A0A] flex items-center justify-center">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs sm:text-sm tracking-tight">
                Backend Kitchen Controller
              </span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                API 200 OK
              </span>
            </div>
            <p className="text-[10px] text-gray-400">
              Live status control via <code className="text-orange-300">/api/orders/{order.id}</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isUpdating}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors disabled:opacity-50"
            title="Refresh from backend"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? "animate-spin" : ""}`} />
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
          >
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Body: Live Status Transition Buttons */}
      {isExpanded && (
        <div className="p-4 bg-orange-50/30">
          <div className="text-[11px] font-semibold text-gray-600 mb-2.5 flex items-center justify-between">
            <span>Change status via backend API (simulates kitchen updates):</span>
            <span className="text-[10px] text-gray-400 font-mono">
              Current: <strong className="text-orange-600 uppercase">{order.status}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {stages.map((stage) => {
              const Icon = stage.icon;
              const isActive = order.status === stage.id;
              return (
                <button
                  key={stage.id}
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStageClick(stage.id)}
                  className={`relative p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col gap-1 ${
                    isActive
                      ? "bg-white border-[#FF5A0A] shadow-md ring-2 ring-orange-500/20"
                      : "bg-white/80 border-gray-200 hover:bg-white hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-white ${
                        isActive ? "bg-[#FF5A0A]" : "bg-gray-400"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    )}
                  </div>
                  <div>
                    <span
                      className={`font-bold text-xs block ${
                        isActive ? "text-[#FF5A0A]" : "text-gray-800"
                      }`}
                    >
                      {stage.label}
                    </span>
                    <span className="text-[10px] text-gray-500 leading-tight block">
                      {stage.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-3 pt-2.5 border-t border-orange-100 flex items-center justify-between text-[10px] text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Auto-polling active every 5s
            </span>
            <span className="font-mono text-gray-400">
              {lastSyncedAt ? `Synced at ${new Date(lastSyncedAt).toLocaleTimeString()}` : "Live Connected"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

