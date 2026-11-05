"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ScanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    const table = searchParams.get("table") || "T4";
    const cleanTable = table.replace(/[^0-9]/g, "") || "4";
    router.replace(`/table/T${cleanTable}`);
  }, [searchParams, router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
      <div className="w-10 h-10 border-4 border-[#FF5A0A] border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-sm font-bold text-gray-700">Connecting to your table...</p>
    </div>
  );
}

export default function ScanPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#FF5A0A] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ScanContent />
    </React.Suspense>
  );
}
