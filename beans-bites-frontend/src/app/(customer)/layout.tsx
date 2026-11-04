import * as React from "react";
import { CustomerHeader } from "@/components/layout/customer/customer-header";
import { CustomerFooter } from "@/components/layout/customer/customer-footer";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CustomerHeader />
      <main className="flex-1 w-full">{children}</main>
      <CustomerFooter />
    </div>
  );
}

