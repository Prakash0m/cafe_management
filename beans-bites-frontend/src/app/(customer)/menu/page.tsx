"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MenuBanner } from "@/components/customer/menu/menu-banner";
import { MenuCategorySidebar } from "@/components/customer/menu/menu-category-sidebar";
import {
  MenuFilterBar,
  MenuFilterType,
} from "@/components/customer/menu/menu-filter-bar";
import { MenuFoodCard } from "@/components/customer/menu/menu-food-card";
import { MOCK_CATEGORIES } from "@/data/mock/categories";
import { MOCK_ALL_ITEMS } from "@/data/mock/food-items";
import { Search, RotateCcw } from "lucide-react";

function MenuContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Category State
  const initialCategory = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = React.useState<string>(initialCategory);

  // Quick Filter State (All, Veg, Non-Veg, Bestseller, New)
  const initialFilter = (searchParams.get("filter") as MenuFilterType) || "all";
  const [activeFilter, setActiveFilter] = React.useState<MenuFilterType>(initialFilter);

  // Local Search State
  const initialSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = React.useState<string>(initialSearch);

  // Keep state in sync with URL searchParams if they change
  React.useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);

    const f = searchParams.get("filter") as MenuFilterType;
    if (f) setActiveFilter(f);

    const q = searchParams.get("search");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Handle Category selection and update URL shallowly
  const handleSelectCategory = (slug: string) => {
    setSelectedCategory(slug);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.replace(`/menu?${params.toString()}`, { scroll: false });
  };

  // Handle Filter Pill selection and update URL
  const handleFilterChange = (filter: MenuFilterType) => {
    setActiveFilter(filter);
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }
    router.replace(`/menu?${params.toString()}`, { scroll: false });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory("all");
    setActiveFilter("all");
    setSearchQuery("");
    router.replace("/menu", { scroll: false });
  };

  // Filter items
  const filteredItems = React.useMemo(() => {
    return MOCK_ALL_ITEMS.filter((item) => {
      // 1. Category Filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // 2. Quick Filter Pills
      if (activeFilter === "veg" && !item.isVeg) return false;
      if (activeFilter === "non-veg" && item.isVeg) return false;
      if (
        activeFilter === "bestseller" &&
        item.badge !== "Bestseller" &&
        item.badge !== "Best Seller"
      ) {
        return false;
      }
      if (activeFilter === "new" && item.badge !== "New") return false;

      // 3. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }

      return true;
    });
  }, [selectedCategory, activeFilter, searchQuery]);

  // Current category display name
  const currentCategoryName = React.useMemo(() => {
    if (selectedCategory === "all") return "Food Menu";
    const found = MOCK_CATEGORIES.find((c) => c.slug === selectedCategory);
    return found ? `${found.name} Menu` : "Food Menu";
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* 1. Top Cinematic Hero Banner */}
      <MenuBanner />

      {/* 2. Main Two-Column Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          {/* Left Column: Categories Sidebar (Desktop/Tablet) */}
          <div className="w-full md:w-56 lg:w-64 flex-shrink-0 md:sticky md:top-24">
            <MenuCategorySidebar
              categories={MOCK_CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>

          {/* Right Column: Filter Bar & Food Items Grid */}
          <main className="flex-1 min-w-0 w-full flex flex-col gap-5 sm:gap-6">
            {/* Filter Bar */}
            <MenuFilterBar
              title={currentCategoryName}
              itemCount={filteredItems.length}
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
            />

            {/* Food Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredItems.map((item) => (
                  <MenuFoodCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-2xl border border-gray-100 p-10 sm:p-14 text-center flex flex-col items-center justify-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-orange-50 text-[#FF5A0A] flex items-center justify-center mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  No matching dishes found
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-sm mt-1 mb-5">
                  We couldn&apos;t find any dishes matching your current filter selections. Try changing your filters or searching for something else.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF5A0A]" />
        </div>
      }
    >
      <MenuContent />
    </React.Suspense>
  );
}
