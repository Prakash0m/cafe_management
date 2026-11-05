"use client";

import * as React from "react";
import { X, Plus, Trash2, Save, Sparkles, RefreshCw, CheckCircle2 } from "lucide-react";
import { FoodItem } from "@/types/menu.types";
import { toast } from "sonner";

interface EditIngredientsModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: FoodItem[];
  onItemUpdated: (updatedItem: FoodItem) => void;
}

export function EditIngredientsModal({
  isOpen,
  onClose,
  items,
  onItemUpdated,
}: EditIngredientsModalProps) {
  const [selectedId, setSelectedId] = React.useState<string>(items[0]?.id || "");
  const [ingredients, setIngredients] = React.useState<string[]>([]);
  const [newIngredient, setNewIngredient] = React.useState("");
  const [price, setPrice] = React.useState<number>(0);
  const [chefNotes, setChefNotes] = React.useState<string>("");
  const [spiciness, setSpiciness] = React.useState<"none" | "mild" | "medium" | "spicy">("none");
  const [isSaving, setIsSaving] = React.useState(false);

  const selectedItem = items.find((i) => i.id === selectedId) || items[0];

  React.useEffect(() => {
    if (selectedItem) {
      setIngredients(selectedItem.ingredients ? [...selectedItem.ingredients] : []);
      setPrice(selectedItem.price);
      setChefNotes(selectedItem.chefNotes || "");
      setSpiciness(selectedItem.spiciness || "none");
    }
  }, [selectedId, selectedItem]);

  if (!isOpen || !selectedItem) return null;

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSaveToBackend = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/menu/${selectedItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients,
          price,
          chefNotes,
          spiciness,
        }),
      });

      const json = await response.json();

      if (json.success && json.data) {
        onItemUpdated(json.data);
        toast.success(`Updated in Backend!`, {
          description: `Ingredients & details for '${json.data.name}' saved to backend API.`,
        });
        onClose();
      } else {
        toast.error("Failed to update backend", {
          description: json.message || "Unknown error",
        });
      }
    } catch (err) {
      toast.error("Network error while calling backend API");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-orange-50/50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#FF5A0A] text-white">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-tight">
                Backend Menu & Ingredients Manager
              </h3>
              <span className="text-[11px] text-gray-500">
                Live updates synced via PATCH /api/menu/[id]
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 text-gray-600 flex items-center justify-center transition-colors shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Select Dish */}
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1.5">
              Select Food Item to Edit
            </label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5A0A]"
            >
              {items.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name} ({i.category}) — NPR {i.price}
                </option>
              ))}
            </select>
          </div>

          {/* Current Ingredients List (Foods Vitra K K Used Chha) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-700">
                Ingredients Used ({ingredients.length} items)
              </label>
              <span className="text-[10px] text-gray-400">
                Shown to customer on tap
              </span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto bg-gray-50 p-2.5 rounded-2xl border border-gray-100">
              {ingredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-xl border border-gray-200/80 text-xs text-gray-800"
                >
                  <span className="font-medium truncate pr-2">{ing}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(idx)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Ingredient */}
            <form onSubmit={handleAddIngredient} className="flex gap-2 pt-1">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="Add ingredient (e.g. Extra virgin olive oil)..."
                className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5A0A]"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 bg-[#FF5A0A] hover:bg-[#E04E07] text-white text-xs font-bold px-3 py-1.5 rounded-xl"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Price & Spice */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Price (NPR)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5A0A]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Spice Level
              </label>
              <select
                value={spiciness}
                onChange={(e) =>
                  setSpiciness(
                    e.target.value as "none" | "mild" | "medium" | "spicy"
                  )
                }
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5A0A]"
              >
                <option value="none">None (Mild)</option>
                <option value="mild">Mild</option>
                <option value="medium">Medium</option>
                <option value="spicy">Spicy</option>
              </select>
            </div>
          </div>

          {/* Chef Kitchen Notes */}
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">
              Chef Kitchen Preparation Notes
            </label>
            <textarea
              rows={2}
              value={chefNotes}
              onChange={(e) => setChefNotes(e.target.value)}
              placeholder="e.g. Baked at 450°C in our wood stone oven..."
              className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF5A0A]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-end gap-2 bg-gray-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSaving}
            onClick={handleSaveToBackend}
            className="inline-flex items-center gap-1.5 bg-[#FF5A0A] hover:bg-[#E04E07] disabled:opacity-50 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            {isSaving ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Save to Backend</span>
          </button>
        </div>
      </div>
    </div>
  );
}

