"use client";

import * as React from "react";
import Image from "next/image";
import { X, QrCode, ExternalLink, Copy, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface TableQrDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentTable: string;
}

const ALL_TABLES = [
  { id: "T1", name: "Table T1 (2 Seats)" },
  { id: "T2", name: "Table T2 (2 Seats)" },
  { id: "T3", name: "Table T3 (4 Seats)" },
  { id: "T4", name: "Table T4 (4 Seats)" },
  { id: "T5", name: "Table T5 (6 Seats)" },
  { id: "T6", name: "Table T6 (8 Seats)" },
];

export function TableQrDialog({
  isOpen,
  onClose,
  currentTable,
}: TableQrDialogProps) {
  const [selectedTable, setSelectedTable] = React.useState<string>(
    currentTable.replace(/[^0-9]/g, "") ? `T${currentTable.replace(/[^0-9]/g, "")}` : "T4"
  );
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3001";
  const tableUrl = `${origin}/table/${selectedTable}`;
  // Standard high quality QR API
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(
    tableUrl
  )}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(tableUrl);
    setCopied(true);
    toast.success("Table scan URL copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl p-5 text-center animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-900 font-bold text-sm">
            <QrCode className="w-4 h-4 text-[#FF5A0A]" />
            <span>Customer Table QR Code</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Table Selector */}
        <div className="pt-3">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
            Select Table to Preview QR
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {ALL_TABLES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTable(t.id)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  selectedTable === t.id
                    ? "bg-[#FF5A0A] text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {t.id}
              </button>
            ))}
          </div>
        </div>

        {/* QR Code Container */}
        <div className="my-4 p-4 bg-[#FFF8F3] border-2 border-dashed border-[#FF5A0A]/30 rounded-2xl flex flex-col items-center justify-center">
          <div className="relative w-48 h-48 bg-white p-2 rounded-xl shadow-sm">
            <Image
              src={qrImageUrl}
              alt={`QR Code for Table ${selectedTable}`}
              width={192}
              height={192}
              unoptimized
              className="object-contain"
            />
          </div>
          <span className="text-xs font-black text-gray-900 mt-2">
            Scan for Table {selectedTable}
          </span>
          <span className="text-[10px] text-gray-500">
            Directly opens mobile food list with ingredients
          </span>
        </div>

        {/* URL Box & Actions */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 bg-gray-50 p-2 rounded-xl border border-gray-200 text-left">
            <span className="text-[11px] text-gray-600 truncate flex-1 font-mono">
              {tableUrl}
            </span>
            <button
              onClick={handleCopy}
              className="text-[#FF5A0A] hover:text-[#E04E07] p-1 rounded-lg"
              title="Copy URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <a
            href={tableUrl}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-[#FF5A0A] hover:bg-[#E04E07] text-white font-bold text-xs py-2.5 rounded-xl shadow-sm transition-all"
          >
            <span>Open Table {selectedTable} Menu</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

