"use client";

import * as React from "react";
import { Check, ChefHat, BellRing, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderStatusTrackerProps {
  currentStage?: "placed" | "preparing" | "ready" | "completed";
  placedTime?: string;
}

export function OrderStatusTracker({
  currentStage = "preparing",
  placedTime = "10:24 AM",
}: OrderStatusTrackerProps) {
  const steps = [
    {
      id: "placed",
      title: "Order Placed",
      subtext: placedTime,
      icon: Check,
      isCompleted: true,
      isActive: false,
    },
    {
      id: "preparing",
      title: "Preparing",
      subtext: "In the kitchen",
      icon: ChefHat,
      isCompleted: currentStage === "ready" || currentStage === "completed",
      isActive: currentStage === "preparing",
    },
    {
      id: "ready",
      title: "Ready",
      subtext: "For serving",
      icon: (props: { className?: string }) => (
        /* Cloche / Serving dish icon */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={props.className}
        >
          <path d="M4 18h16M12 5v2M8.5 7a7.5 7.5 0 0 1 7 0M4 14a8 8 0 0 1 16 0H4z" />
        </svg>
      ),
      isCompleted: currentStage === "completed",
      isActive: currentStage === "ready",
    },
    {
      id: "completed",
      title: "Completed",
      subtext: "Enjoy your meal",
      icon: Check,
      isCompleted: currentStage === "completed",
      isActive: false,
    },
  ];

  return (
    <div className="py-4 px-1 sm:px-2 my-2 select-none">
      <div className="relative flex items-start justify-between">
        {/* Horizontal Connector Lines */}
        <div className="absolute top-4 left-6 right-6 h-[3px] bg-gray-200 -z-0">
          <div
            className={cn(
              "h-full bg-[#22C55E] transition-all duration-700",
              currentStage === "placed" && "w-0",
              currentStage === "preparing" && "w-1/3",
              currentStage === "ready" && "w-2/3",
              currentStage === "completed" && "w-full"
            )}
          />
        </div>

        {/* 4 Stage Nodes */}
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={s.id}
              className="flex flex-col items-center text-center relative z-10 w-1/4"
            >
              {/* Node Icon Circle */}
              <div
                className={cn(
                  "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300",
                  s.isCompleted
                    ? "bg-[#22C55E] text-white shadow-sm ring-4 ring-white"
                    : s.isActive
                    ? "bg-[#22C55E] text-white shadow-md ring-4 ring-emerald-100 scale-105"
                    : "bg-white text-gray-400 border border-gray-300 ring-4 ring-white"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 sm:w-4.5 sm:h-4.5",
                    s.isCompleted ? "stroke-[3]" : "stroke-[2.2]"
                  )}
                />
              </div>

              {/* Title & Subtext */}
              <div className="mt-2.5 space-y-0.5">
                <span
                  className={cn(
                    "text-xs sm:text-[13px] font-bold block leading-tight tracking-tight",
                    s.isCompleted || s.isActive ? "text-gray-900" : "text-gray-400"
                  )}
                >
                  {s.title}
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-gray-400 block leading-tight">
                  {s.subtext}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
