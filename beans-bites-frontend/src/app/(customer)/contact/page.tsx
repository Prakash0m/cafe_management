"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 bg-orange-100 text-[#FF5A0A] rounded-2xl flex items-center justify-center mx-auto">
          <Phone className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Get in Touch</h1>
        <p className="text-sm text-gray-600">
          Have questions or want to reserve a table? Reach out to us at +977 1-4245678 or visit us in Kathmandu.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#FF5A0A] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#E04E07] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  );
}

