"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { menuService } from "@/lib/api/menu.service";
import { HeroSection } from "@/components/customer/home/hero-section";
import { CategoryStrip } from "@/components/customer/home/category-strip";
import { PopularItemsSection } from "@/components/customer/home/popular-items-section";
import { WeekendPromotion } from "@/components/customer/home/weekend-promotion";
import { MOCK_HOMEPAGE_DATA } from "@/data/mock/homepage-data";

export default function CustomerHomePage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  // Fetch Homepage Data using TanStack Query
  const { data, isLoading } = useQuery({
    queryKey: ["homepage-data"],
    queryFn: () => menuService.getHomepageData(),
    initialData: MOCK_HOMEPAGE_DATA,
    staleTime: 60 * 1000,
  });

  const categories = data?.categories ?? MOCK_HOMEPAGE_DATA.categories;
  const rawPopularItems = data?.popularItems ?? MOCK_HOMEPAGE_DATA.popularItems;
  const promotion =
    data?.promotions?.[0] ?? MOCK_HOMEPAGE_DATA.promotions[0];

  // Optional category filtering on popular items if category selected
  const displayedItems = React.useMemo(() => {
    if (selectedCategory === "all") {
      return rawPopularItems;
    }
    const filtered = rawPopularItems.filter(
      (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
    );
    return filtered.length > 0 ? filtered : rawPopularItems;
  }, [rawPopularItems, selectedCategory]);

  return (
    <div className="w-full flex flex-col bg-white">
      {/* 1. Hero Section with Cinematic Cafe Mood & Food Photography */}
      <HeroSection />

      {/* 2. Food Category Horizontal Strip */}
      <CategoryStrip
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(slug) => setSelectedCategory(slug)}
      />

      {/* 3. Popular Food Items Section */}
      <PopularItemsSection items={displayedItems} isLoading={isLoading} />

      {/* 4. Weekend Promotional Banner */}
      {promotion && <WeekendPromotion promotion={promotion} />}
    </div>
  );
}

