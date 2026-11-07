"use client";

import * as React from "react";
import { AnimatedOrderSuccessIcon } from "./animated-order-success-icon";
import { OrderStatus } from "@/types/order.types";

interface OrderSuccessHeroProps {
  status?: OrderStatus;
  orderId?: string;
  isBackendSynced?: boolean;
}

export function OrderSuccessHero({
  status = "preparing",
}: OrderSuccessHeroProps) {
  // Reassuring, human-written header messaging matching the Stitch reference
  const getHeaderContent = () => {
    switch (status) {
      case "ready":
        return {
          titlePrefix: "Your Order is ",
          titleHighlight: "Ready!",
          subtitle:
            "Your freshly prepared food is ready to be served at your table. Enjoy!",
        };
      case "completed":
        return {
          titlePrefix: "Order Completed ",
          titleHighlight: "Successfully!",
          subtitle:
            "Thank you for dining with Beans & Bites. We hope you enjoyed your meal!",
        };
      case "placed":
      case "preparing":
      default:
        return {
          titlePrefix: "Order Placed ",
          titleHighlight: "Successfully!",
          subtitle:
            "Thank you for your order. We're preparing your food and will update you shortly.",
        };
    }
  };

  const header = getHeaderContent();

  return (
    <div className="text-center pt-2 sm:pt-4 pb-2">
      {/* Interactive Celebration Animated Checkmark with Radiating Outward Confetti Bursts */}
      <div className="mb-4 sm:mb-5">
        <AnimatedOrderSuccessIcon status={status} size="md" allowReplay={true} />
      </div>

      {/* Main Heading */}
      <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-gray-900 tracking-tight leading-tight">
        {header.titlePrefix}
        <span className="text-[#16A34A]">{header.titleHighlight}</span>
      </h1>

      {/* Reassuring Subtitle */}
      <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-2 leading-relaxed font-normal">
        {header.subtitle}
      </p>
    </div>
  );
}
