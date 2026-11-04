"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
  defaultValue?: string;
}

export function SearchBar({
  className,
  placeholder = "Search for food, drinks...",
  onSearch,
  defaultValue = "",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (onSearch) {
      onSearch(trimmed);
    } else if (trimmed) {
      router.push(`/menu?search=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative flex items-center", className)}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label="Search food and drinks"
        className="w-full h-9 pl-3.5 pr-8 rounded-lg border border-gray-200 bg-gray-50/70 text-xs text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-[#FF5A0A] focus:outline-none focus:ring-1 focus:ring-[#FF5A0A] transition-all"
      />
      {query ? (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : (
        <button
          type="submit"
          className="absolute right-2.5 text-gray-400 hover:text-[#FF5A0A] transition-colors"
          aria-label="Search"
        >
          <Search className="w-3.5 h-3.5" />
        </button>
      )}
    </form>
  );
}

