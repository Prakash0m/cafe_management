"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { FoodItem } from "@/types/menu.types";
import { useCartStore } from "@/store/cart.store";
import { TableHeader } from "@/components/customer/table/table-header";
import { TableCategoryStrip } from "@/components/customer/table/table-category-strip";
import { TableFoodListItem } from "@/components/customer/table/table-food-list-item";
import { FoodDetailsSheet } from "@/components/customer/table/food-details-sheet";
import { TableCartBar } from "@/components/customer/table/table-cart-bar";
import { EditIngredientsModal } from "@/components/customer/table/edit-ingredients-modal";
import { TableQrDialog } from "@/components/customer/table/table-qr-dialog";
import { MOCK_ALL_ITEMS } from "@/data/mock/food-items";
import { toast } from "sonner";
import { UtensilsCrossed, Sparkles, Search, RefreshCw } from "lucide-react";

const CATEGORIES = [
  { id: "all", name: "All Dishes", slug: "all", emoji: "🍽️" },
  { id: "pizza", name: "Pizzas", slug: "pizza", emoji: "🍕" },
  { id: "burger", name: "Burgers", slug: "burger", emoji: "🍔" },
  { id: "momo", name: "Mo:Mo", slug: "momo", emoji: "🥟" },
  { id: "pasta", name: "Pasta", slug: "pasta", emoji: "🍝" },
  { id: "sandwich", name: "Sandwich", slug: "sandwich", emoji: "🥪" },
  { id: "salad", name: "Salad", slug: "salad", emoji: "🥗" },
  { id: "beverages", name: "Beverages", slug: "beverages", emoji: "☕" },
  { id: "desserts", name: "Desserts", slug: "desserts", emoji: "🍰" },
];

export default function TableMenuPage() {
  const params = useParams();
  const router = useRouter();

  // Normalize Table Name from param (e.g. "T4", "4", "table-4")
  const rawTable = (params?.tableId as string) || "T4";
  const tableDigits = rawTable.replace(/[^0-9]/g, "") || "4";
  const formattedTable = `Table T${tableDigits} (${tableDigits === "5" || tableDigits === "6" ? "6" : "4"} Seats)`;

  const {
    items: cartItems,
    addItem,
    updateQuantity,
    setTableNumber,
    setOrderType,
    getTotalItems,
    getTotalPayable,
  } = useCartStore();

  // Ensure table and dine-in mode are pre-set
  React.useEffect(() => {
    setTableNumber(formattedTable);
    setOrderType("dine-in");
  }, [formattedTable, setTableNumber, setOrderType]);

  // State
  const [menuItems, setMenuItems] = React.useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isVegOnly, setIsVegOnly] = React.useState(false);

  // Modals & Bottom Sheet
  const [activeItemForSheet, setActiveItemForSheet] = React.useState<FoodItem | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = React.useState(false);
  const [isStaffModalOpen, setIsStaffModalOpen] = React.useState(false);

  // Fetch Menu from Backend API `/api/menu`
  const fetchMenuFromBackend = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/menu?table=T${tableDigits}`);
      const json = await res.json();

      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setMenuItems(json.data);
      } else {
        // Fallback to local items if needed
        setMenuItems(MOCK_ALL_ITEMS);
      }
    } catch {
      setMenuItems(MOCK_ALL_ITEMS);
    } finally {
      setIsLoading(false);
    }
  }, [tableDigits]);

  React.useEffect(() => {
    fetchMenuFromBackend();
  }, [fetchMenuFromBackend]);

  // Handle Backend Update callback
  const handleItemUpdated = (updated: FoodItem) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    if (activeItemForSheet?.id === updated.id) {
      setActiveItemForSheet(updated);
    }
  };

  // Filter items
  const filteredItems = React.useMemo(() => {
    return menuItems.filter((item) => {
      // 1. Category
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // 2. Veg only
      if (isVegOnly && !item.isVeg) {
        return false;
      }
      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        const matchesIngredients =
          item.ingredients &&
          item.ingredients.some((ing) => ing.toLowerCase().includes(q));

        if (!matchesName && !matchesDesc && !matchesCat && !matchesIngredients) {
          return false;
        }
      }
      return true;
    });
  }, [menuItems, selectedCategory, isVegOnly, searchQuery]);

  // Helper to find current quantity in cart for an item
  const getQtyInCart = (itemId: string) => {
    const found = cartItems.find((ci) => ci.item.id === itemId);
    return found ? found.quantity : 0;
  };

  // Quick Add / Stepper
  const handleQuickAdd = (item: FoodItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(item, 1);
    toast.success(`Added 1 ${item.name} to order!`, {
      duration: 1500,
    });
  };

  const handleUpdateQty = (itemId: string, newQty: number, e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(itemId, newQty);
  };

  // Save from Detail Sheet
  const handleSaveFromSheet = (item: FoodItem, quantity: number, notes?: string) => {
    const currentQty = getQtyInCart(item.id);
    if (currentQty === 0) {
      addItem(item, quantity);
    } else {
      updateQuantity(item.id, quantity);
    }
    toast.success(`Added to ${formattedTable} order!`, {
      description: `${quantity}x ${item.name} ${notes ? `("${notes}")` : ""}`,
      duration: 2500,
    });
  };

  const totalItems = getTotalItems();
  const totalPayable = getTotalPayable();

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-28">
      {/* 1. Header with Table Badge */}
      <TableHeader
        tableNumber={formattedTable}
        onOpenQrModal={() => setIsQrModalOpen(true)}
        onOpenStaffModal={() => setIsStaffModalOpen(true)}
      />

      {/* 2. Horizontal Category Strip + Search Bar */}
      <TableCategoryStrip
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isVegOnly={isVegOnly}
        onToggleVegOnly={() => setIsVegOnly(!isVegOnly)}
      />

      {/* 3. Main Food Items List (Minimalist, fast, mobile-first!) */}
      <main className="max-w-2xl mx-auto px-4 pt-3.5 space-y-2.5">
        {/* Active Category Heading & Count */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {selectedCategory === "all" ? "All Food Items" : selectedCategory.toUpperCase()} ({filteredItems.length})
          </span>
          <span className="text-[11px] text-gray-400 font-medium">
            Tap item for ingredients
          </span>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-3 pt-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl border border-gray-100 p-3 h-24 animate-pulse flex items-center gap-3"
              >
                <div className="w-18 h-18 bg-gray-200 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="w-1/2 h-4 bg-gray-200 rounded" />
                  <div className="w-1/3 h-3 bg-gray-200 rounded" />
                  <div className="w-2/3 h-2.5 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          /* Real Food List Items */
          <div className="space-y-2.5">
            {filteredItems.map((item) => (
              <TableFoodListItem
                key={item.id}
                item={item}
                quantityInCart={getQtyInCart(item.id)}
                onSelect={(selected) => setActiveItemForSheet(selected)}
                onAddToCart={handleQuickAdd}
                onUpdateQuantity={handleUpdateQty}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center mt-4">
            <UtensilsCrossed className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-gray-800">No dishes match your filter</h4>
            <p className="text-xs text-gray-500 mt-1 mb-3">
              Try searching for something else or clearing the veg filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setIsVegOnly(false);
              }}
              className="inline-flex items-center gap-1.5 bg-[#FF5A0A] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </main>

      {/* 4. Food Details Bottom Sheet ("Foods Vitra K K Used Gareko Chha") */}
      <FoodDetailsSheet
        item={activeItemForSheet}
        isOpen={Boolean(activeItemForSheet)}
        onClose={() => setActiveItemForSheet(null)}
        quantityInCart={activeItemForSheet ? getQtyInCart(activeItemForSheet.id) : 0}
        onSaveToCart={handleSaveFromSheet}
      />

      {/* 5. Sticky Bottom Floating Cart Bar */}
      <TableCartBar
        totalItems={totalItems}
        totalPayable={totalPayable}
        tableNumber={formattedTable}
      />

      {/* 6. Staff / Backend Ingredients Manager Modal */}
      <EditIngredientsModal
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
        items={menuItems}
        onItemUpdated={handleItemUpdated}
      />

      {/* 7. Table QR Code Dialog */}
      <TableQrDialog
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        currentTable={`T${tableDigits}`}
      />
    </div>
  );
}
