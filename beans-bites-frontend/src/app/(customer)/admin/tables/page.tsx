"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  QrCode,
  Printer,
  Download,
  ExternalLink,
  SlidersHorizontal,
  Wifi,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  Smartphone,
} from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { EditIngredientsModal } from "@/components/customer/table/edit-ingredients-modal";
import { FoodItem } from "@/types/menu.types";
import { toast } from "sonner";

interface TableInfo {
  id: string;
  name: string;
  seats: number;
  location: string;
}

const RESTAURANT_TABLES: TableInfo[] = [
  { id: "T1", name: "Table T1", seats: 2, location: "Window Side" },
  { id: "T2", name: "Table T2", seats: 2, location: "Window Side" },
  { id: "T3", name: "Table T3", seats: 4, location: "Main Hall" },
  { id: "T4", name: "Table T4", seats: 4, location: "Garden Terrace" },
  { id: "T5", name: "Table T5", seats: 6, location: "Family Section" },
  { id: "T6", name: "Table T6", seats: 8, location: "Private Lounge" },
  { id: "T7", name: "Table T7", seats: 2, location: "Balcony" },
  { id: "T8", name: "Table T8", seats: 4, location: "Main Hall" },
];

export default function AdminTablesQrPage() {
  const [selectedTable, setSelectedTable] = React.useState<string>("T4");
  const [networkHost, setNetworkHost] = React.useState<string>("10.97.140.77:3001");
  const [menuItems, setMenuItems] = React.useState<FoodItem[]>([]);
  const [isStaffModalOpen, setIsStaffModalOpen] = React.useState<boolean>(false);

  // Auto-detect browser origin
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const detected = window.location.host;
      if (detected.includes("localhost") || detected.includes("127.0.0.1")) {
        // If testing on local network with mobile Google Lens, 10.97.140.77 is local IP
        setNetworkHost(detected);
      } else {
        setNetworkHost(detected);
      }
    }
  }, []);

  // Fetch menu items for staff editor
  React.useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) setMenuItems(json.data);
      })
      .catch(() => {});
  }, []);

  const currentTableObj =
    RESTAURANT_TABLES.find((t) => t.id === selectedTable) || RESTAURANT_TABLES[3];

  // Backend QR Code API endpoints
  const qrSvgUrl = `/api/tables/${selectedTable}/qr?format=svg&host=${encodeURIComponent(
    networkHost
  )}`;
  const qrPngUrl = `/api/tables/${selectedTable}/qr?format=png&host=${encodeURIComponent(
    networkHost
  )}`;
  const directTableUrl = `http://${networkHost}/table/${selectedTable}`;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(directTableUrl);
    toast.success("Table scan URL copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#FBF7F4] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-orange-200/70">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#FF5A0A] text-xs font-bold uppercase tracking-wider mb-2">
              <QrCode className="w-3.5 h-3.5" />
              <span>Backend QR Generator & Stand Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Table QR Codes for Google Lens Scanning
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
              Generate, preview and print official Table QR Stands. When a customer sitting at the table points their mobile camera or Google Lens at this QR code, it instantly opens the digital food list with ingredients!
            </p>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setIsStaffModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF5A0A]" />
              <span>Manage Ingredients (Backend API)</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-[#FF5A0A] hover:bg-[#E04E07] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Table Stands</span>
            </button>
          </div>
        </div>

        {/* Network & Host Config Box */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-gray-900">
                Google Lens Target Host / IP Configuration:
              </span>
            </div>
            <span className="text-[11px] text-gray-500 font-medium">
              Mobile phones scanning over Wi-Fi must reach your host address
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              value={networkHost}
              onChange={(e) => setNetworkHost(e.target.value)}
              placeholder="e.g. 10.97.140.77:3001 or beansandbites.com"
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-mono font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5A0A]"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setNetworkHost("10.97.140.77:3001")}
                className="px-2.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF5A0A] text-[11px] font-bold border border-orange-200"
              >
                Set Wi-Fi IP (10.97.140.77:3001)
              </button>
              <button
                type="button"
                onClick={() => setNetworkHost("localhost:3001")}
                className="px-2.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-bold"
              >
                Localhost
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid: Table Selector + Live Printable Stand Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Table List (Span 5) */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-sm font-bold text-gray-900 tracking-tight">
              Select Restaurant Table
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {RESTAURANT_TABLES.map((t) => {
                const isSelected = selectedTable === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTable(t.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#FFF9F5] border-[#FF5A0A] ring-2 ring-[#FF5A0A]/20 shadow-md"
                        : "bg-white border-gray-200 hover:border-gray-300 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-gray-900">
                        {t.name}
                      </span>
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isSelected ? "bg-[#FF5A0A]" : "bg-gray-300"
                        }`}
                      />
                    </div>
                    <div className="mt-2 text-[11px] text-gray-500 font-medium">
                      <span>{t.seats} Seats</span> • <span>{t.location}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Helper info */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 space-y-2 mt-4">
              <span className="font-bold flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-amber-700" />
                How Customers Use This:
              </span>
              <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed text-amber-800">
                <li>Customer sits at <strong>{currentTableObj.name}</strong>.</li>
                <li>Opens <strong>Google Lens</strong> or phone camera.</li>
                <li>Scans the QR code stand below.</li>
                <li>Phone immediately opens the digital food list for <strong>{currentTableObj.name}</strong> without asking for table number!</li>
              </ol>
            </div>
          </div>

          {/* Right Column: Physical Table Stand Preview (Span 7) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Printable Physical Tent Card */}
            <div
              id="printable-stand"
              className="w-full max-w-[360px] bg-white rounded-3xl border-2 border-gray-900 shadow-2xl p-6 flex flex-col items-center text-center space-y-4 relative overflow-hidden"
            >
              {/* Brand Header */}
              <div className="flex items-center gap-2 pt-2">
                <Image
                  src={ASSETS.brand.favicon}
                  alt="Beans & Bites"
                  width={34}
                  height={34}
                  className="object-contain"
                />
                <div className="text-left">
                  <span className="font-serif font-black text-gray-900 text-lg leading-tight block">
                    Beans & Bites
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.2em] text-[#FF5A0A] font-bold block">
                    CAFÉ & RESTAURANT
                  </span>
                </div>
              </div>

              {/* Table Identification */}
              <div className="bg-[#1E110A] text-white py-1.5 px-6 rounded-full shadow-sm">
                <span className="text-xs font-black uppercase tracking-wider">
                  {currentTableObj.name.toUpperCase()} • {currentTableObj.seats} SEATS
                </span>
              </div>

              {/* Backend Generated SVG QR Code */}
              <div className="bg-white p-3 rounded-2xl border-2 border-orange-200 shadow-md">
                <div className="relative w-56 h-56 flex items-center justify-center">
                  {/* Image pointing to live backend QR generator route */}
                  <Image
                    src={qrSvgUrl}
                    alt={`QR Code for ${currentTableObj.name}`}
                    width={224}
                    height={224}
                    unoptimized
                    priority
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Google Lens Scan Instructions */}
              <div className="space-y-1">
                <h3 className="font-black text-gray-900 text-sm tracking-tight">
                  Scan with Camera or Google Lens
                </h3>
                <p className="text-[11px] text-gray-500 font-medium max-w-xs leading-tight">
                  Instant Food List & Dine-In Ordering • Tap dishes to view fresh ingredients!
                </p>
              </div>

              {/* Footer Badge */}
              <div className="pt-2 border-t border-gray-100 w-full flex items-center justify-between text-[10px] text-gray-400 font-medium">
                <span>{currentTableObj.location}</span>
                <span>Powered by Beans & Bites</span>
              </div>
            </div>

            {/* Stand Actions */}
            <div className="flex items-center gap-2.5 mt-5">
              <a
                href={directTableUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#FF5A0A] hover:bg-[#E04E07] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all"
              >
                <span>Open in Mobile View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={qrPngUrl}
                download={`${selectedTable}-qr-code.png`}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all"
              >
                <Download className="w-3.5 h-3.5 text-gray-500" />
                <span>Download PNG</span>
              </a>

              <button
                type="button"
                onClick={handleCopyUrl}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-xs transition-all"
                title="Copy Target URL"
              >
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Staff Backend Ingredients Editor Modal */}
      <EditIngredientsModal
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
        items={menuItems}
        onItemUpdated={(updated) => {
          setMenuItems((prev) =>
            prev.map((i) => (i.id === updated.id ? updated : i))
          );
        }}
      />
    </div>
  );
}
