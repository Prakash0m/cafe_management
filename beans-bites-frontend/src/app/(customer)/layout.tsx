import * as React from "react";
import { CustomerHeader } from "@/components/layout/customer/customer-header";
import { CustomerFooter } from "@/components/layout/customer/customer-footer";
import { MobileBottomNav } from "@/components/layout/customer/mobile-bottom-nav";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CustomerHeader />
      <main className="flex-1 w-full pb-16 md:pb-0">{children}</main>
      <CustomerFooter />
      <MobileBottomNav />
    </div>
  );
}

