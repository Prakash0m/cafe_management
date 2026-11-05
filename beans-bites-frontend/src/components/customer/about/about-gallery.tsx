"use client";

import * as React from "react";
import Image from "next/image";
import { ASSETS } from "@/lib/assets";
import { Camera, Sparkles } from "lucide-react";

export function AboutGallery() {
  const images = [
    {
      src: ASSETS.hero.slides[1],
      title: "Wood-Fired Pizza Craft",
      category: "Stone Oven Baking",
      span: "col-span-1 md:col-span-2 row-span-2",
    },
    {
      src: ASSETS.food.beverages.icedLatte,
      title: "Handcrafted Iced Latte",
      category: "Specialty Roasts",
      span: "col-span-1",
    },
    {
      src: ASSETS.food.burger.chicken,
      title: "Flame-Grilled Burgers",
      category: "House Brioche Buns",
      span: "col-span-1",
    },
    {
      src: ASSETS.food.momo.chicken,
      title: "Handmade Himalayan Mo:Mo",
      category: "Roasted Tomato Dip",
      span: "col-span-1",
    },
    {
      src: ASSETS.food.desserts.brownie,
      title: "Decadent Warm Brownie",
      category: "Bakery & Desserts",
      span: "col-span-1",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#FBF7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#FF5A0A] text-xs font-bold uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>Glimpse Into Our Kitchen</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Life at Beans & Bites
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
              Fresh ingredients arriving each morning, the warmth of the stone oven,
              and the rich aroma of roasted coffee beans filling the room.
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-5">
          {images.map((item, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-3xl min-h-[220px] sm:min-h-[240px] group shadow-sm hover:shadow-xl transition-all duration-300 ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.95]"
              />
              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-300 block mb-0.5">
                  {item.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

