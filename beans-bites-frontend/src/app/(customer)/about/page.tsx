"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Coffee } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 bg-orange-100 text-[#FF5A0A] rounded-2xl flex items-center justify-center mx-auto">
          <Coffee className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">About Beans & Bites</h1>
        <p className="text-sm text-gray-600">
          Beans & Bites is dedicated to bringing people together over exceptional coffee, artisan food, and a warm, inviting ambience.
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

