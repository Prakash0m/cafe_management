"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowRight, LayoutGrid, Smartphone, Sparkles, CheckCircle2 } from "lucide-react";
import { MyCartView } from "@/components/customer/cart/my-cart-view";
import { PlaceOrderView } from "@/components/customer/cart/place-order-view";
import { useCartStore } from "@/store/cart.store";
import { cn } from "@/lib/utils";

type StepMode = "cart" | "checkout";
type ViewMode = "stepper" | "side-by-side";

function CartPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { getTotalItems } = useCartStore();

  const initialStep: StepMode = searchParams.get("step") === "checkout" ? "checkout" : "cart";
  const [step, setStep] = React.useState<StepMode>(initialStep);
  const [viewMode, setViewMode] = React.useState<ViewMode>("stepper");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const urlStep = searchParams.get("step");
    if (urlStep === "checkout" && step !== "checkout") {
      setStep("checkout");
    } else if (!urlStep && step !== "cart" && viewMode === "stepper") {
      setStep("cart");
    }
  }, [searchParams, step, viewMode]);

  const handleProceedToCheckout = () => {
    setStep("checkout");
    router.push("/cart?step=checkout", { scroll: false });
  };

  const handleBackToCart = () => {
    setStep("cart");
    router.push("/cart", { scroll: false });
  };

  if (!mounted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF5A0A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const totalItems = getTotalItems();

  return (
    <div className="min-h-screen bg-[#FBF7F4] py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      {/* Top Controls & Navigation Bar */}
      <div className="max-w-6xl mx-auto mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-orange-100/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-100 text-[#FF5A0A]">
                <Sparkles className="w-3 h-3" />
                <span>Express Checkout</span>
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {totalItems} items in order
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 mt-1 tracking-tight">
              Order Checkout Flow
            </h1>
          </div>

          {/* Stepper Tabs & View Switcher */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Step 1 vs Step 2 Selector */}
            <div className="inline-flex items-center p-1 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <button
                type="button"
                onClick={handleBackToCart}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                  step === "cart" && viewMode === "stepper"
                    ? "bg-[#FF5A0A] text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <span>1. My Cart</span>
                <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                  {totalItems}
                </span>
              </button>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5",
                  step === "checkout" && viewMode === "stepper"
                    ? "bg-[#FF5A0A] text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <span>2. Place Order</span>
              </button>
            </div>

            {/* Desktop Side-by-Side Reference Mode Toggle */}
            <div className="hidden xl:inline-flex items-center p-1 bg-white border border-gray-200 rounded-2xl shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode("stepper")}
                className={cn(
                  "p-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1",
                  viewMode === "stepper"
                    ? "bg-gray-100 text-gray-900 font-bold"
                    : "text-gray-500 hover:text-gray-900"
                )}
                title="Single Screen Flow"
              >
                <Smartphone className="w-4 h-4" />
                <span className="text-[11px]">Single View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("side-by-side")}
                className={cn(
                  "p-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1",
                  viewMode === "side-by-side"
                    ? "bg-[#FF5A0A] text-white font-bold shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                )}
                title="View Both Screens Side-by-Side (Reference Layout)"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="text-[11px]">Side-by-Side</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === "side-by-side" ? (
        /* SIDE-BY-SIDE DUAL MOCKUP VIEW: Exactly matches the user reference image media_1793859840501_6e11a0d9.jpg */
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col xl:flex-row items-center justify-center gap-6 xl:gap-8">
            {/* Screen 1: My Cart */}
            <div className="w-full max-w-[440px] flex-shrink-0">
              <MyCartView onProceedToOrder={handleProceedToCheckout} />
            </div>

            {/* Central Animated Transition Arrow */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center py-2 xl:py-0">
              <div className="w-12 h-12 rounded-full bg-white border border-orange-200 text-[#FF5A0A] shadow-md flex items-center justify-center">
                <ArrowRight className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-wider">
                Proceed
              </span>
            </div>

            {/* Screen 2: Place Order */}
            <div className="w-full max-w-[700px] flex-1">
              <PlaceOrderView onBackToCart={handleBackToCart} />
            </div>
          </div>
        </div>
      ) : (
        /* STEPPER FOCUSED VIEW: Step 1 or Step 2 */
        <div className="max-w-4xl mx-auto transition-all duration-300">
          {step === "cart" ? (
            <div className="animate-in fade-in-50 slide-in-from-left-4 duration-300">
              <MyCartView onProceedToOrder={handleProceedToCheckout} />
            </div>
          ) : (
            <div className="animate-in fade-in-50 slide-in-from-right-4 duration-300">
              <PlaceOrderView onBackToCart={handleBackToCart} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CartPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#FF5A0A] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CartPageContent />
    </React.Suspense>
  );
}
