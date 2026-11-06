"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Bell,
  ReceiptText,
  HelpCircle,
  Home,
  UtensilsCrossed,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Pencil,
} from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface OrderWhatsNextCardProps {
  orderId?: string;
  tableNumber?: string;
}

export function OrderWhatsNextCard({
  orderId = "#BB1048",
  tableNumber = "T4",
}: OrderWhatsNextCardProps) {
  const [isUpdatesEnabled, setIsUpdatesEnabled] = React.useState(true);

  const handleToggleUpdates = () => {
    const nextState = !isUpdatesEnabled;
    setIsUpdatesEnabled(nextState);
    if (nextState) {
      toast.success("Order notifications enabled!", {
        description: `You will receive live sound and visual alerts when ${orderId} is ready.`,
      });
    } else {
      toast.info("Order notifications muted");
    }
  };

  const handleNeedAssistance = () => {
    toast.info("Staff Assistance Requested", {
      description: `A waiter has been notified for ${tableNumber}. Someone will arrive shortly!`,
      duration: 3500,
    });
  };

  return (
    <div className="space-y-4">
      {/* 1. Cafe Interior Photography with Neon Sign */}
      <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden shadow-sm bg-[#1E110A]">
        <Image
          src={ASSETS.promotions.cafeInterior}
          alt="Beans & Bites Cafe Ambience"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 450px"
          className="object-cover"
        />
        {/* Subtle bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* 2. What's Next & Action Rows Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-xs space-y-4">
        {/* What's Next Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-900">
            <Clock className="w-5 h-5 text-[#FF5A0A] stroke-[2.2] flex-shrink-0" />
            <h3 className="font-extrabold text-sm sm:text-base tracking-tight">
              What&apos;s Next?
            </h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed font-normal pl-7">
            Our team is preparing your order. You&apos;ll be notified once it&apos;s ready to be served at your table.
          </p>
        </div>

        <div className="border-t border-gray-100" />

        {/* Action Row 1: Get Order Updates */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-start gap-2.5 min-w-0">
            <Bell className="w-5 h-5 text-[#FF5A0A] stroke-[2.2] flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="font-bold text-gray-900 text-xs sm:text-sm block leading-tight">
                Get Order Updates
              </span>
              <span className="text-[11px] text-gray-500 block leading-tight mt-0.5">
                Receive real-time status notifications
              </span>
            </div>
          </div>

          {/* iOS Style Toggle Switch */}
          <button
            type="button"
            role="switch"
            aria-checked={isUpdatesEnabled}
            onClick={handleToggleUpdates}
            className={cn(
              "w-11 h-6 rounded-full transition-colors relative flex-shrink-0 cursor-pointer p-0.5",
              isUpdatesEnabled ? "bg-[#22C55E]" : "bg-gray-300"
            )}
          >
            <span
              className={cn(
                "w-5 h-5 rounded-full bg-white shadow-sm block transition-transform duration-200",
                isUpdatesEnabled ? "translate-x-5" : "translate-x-0"
              )}
            />
          </button>
        </div>

        <div className="border-t border-gray-100" />

        {/* Action Row 2: View My Orders */}
        <Link
          href="/orders"
          className="flex items-center justify-between gap-3 group transition-colors"
        >
          <div className="flex items-start gap-2.5 min-w-0">
            <ReceiptText className="w-5 h-5 text-[#FF5A0A] stroke-[2.2] flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="font-bold text-gray-900 group-hover:text-[#FF5A0A] text-xs sm:text-sm block leading-tight transition-colors">
                View My Orders
              </span>
              <span className="text-[11px] text-gray-500 block leading-tight mt-0.5">
                Check current and past orders
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#FF5A0A] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
        </Link>

        <div className="border-t border-gray-100" />

        {/* Action Row 3: Need Assistance? */}
        <button
          type="button"
          onClick={handleNeedAssistance}
          className="w-full flex items-center justify-between gap-3 group text-left transition-colors cursor-pointer"
        >
          <div className="flex items-start gap-2.5 min-w-0">
            <Pencil className="w-5 h-5 text-[#FF5A0A] stroke-[2.2] flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="font-bold text-gray-900 group-hover:text-[#FF5A0A] text-xs sm:text-sm block leading-tight transition-colors">
                Need Assistance?
              </span>
              <span className="text-[11px] text-gray-500 block leading-tight mt-0.5">
                Contact our staff for any changes
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#FF5A0A] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
        </button>
      </div>

      {/* 3. Primary & Secondary CTA Buttons */}
      <div className="space-y-2.5 pt-1">
        {/* Back to Home Button */}
        <Link
          href="/"
          className="w-full bg-[#FF5A0A] hover:bg-[#E04E07] active:bg-[#C94304] active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 text-xs sm:text-sm transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Continue Ordering Button */}
        <Link
          href="/menu"
          className="w-full bg-white hover:bg-gray-50 active:bg-gray-100 active:scale-[0.99] border border-gray-200 text-gray-800 font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-2xs text-xs sm:text-sm transition-all"
        >
          <UtensilsCrossed className="w-4 h-4 text-gray-700" />
          <span>Continue Ordering</span>
        </Link>
      </div>
    </div>
  );
}
