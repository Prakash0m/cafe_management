import { apiClient, ApiResponse } from "./client";
import { API_ENDPOINTS } from "./endpoints";
import {
  FoodCategory,
  FoodItem,
  HomepageData,
  Promotion,
} from "@/types/menu.types";
import { MOCK_CATEGORIES } from "@/data/mock/categories";
import { MOCK_ALL_ITEMS, MOCK_POPULAR_ITEMS } from "@/data/mock/food-items";
import { MOCK_HOMEPAGE_DATA, MOCK_PROMOTION } from "@/data/mock/homepage-data";

const isMock = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";

// Helper to simulate short network latency for mock mode (e.g. 150ms)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const menuService = {
  async getCategories(): Promise<FoodCategory[]> {
    if (isMock) {
      await delay(120);
      return MOCK_CATEGORIES;
    }
    const response = await apiClient<ApiResponse<FoodCategory[]>>(
      API_ENDPOINTS.categories
    );
    return response.data;
  },

  async getPopularItems(): Promise<FoodItem[]> {
    if (isMock) {
      await delay(150);
      return MOCK_POPULAR_ITEMS;
    }
    const response = await apiClient<ApiResponse<FoodItem[]>>(
      API_ENDPOINTS.popularItems
    );
    return response.data;
  },

  async getMenuItems(params?: {
    category?: string;
    search?: string;
  }): Promise<FoodItem[]> {
    if (isMock) {
      await delay(180);
      let items = [...MOCK_ALL_ITEMS];

      if (params?.category && params.category !== "all") {
        items = items.filter(
          (item) => item.category.toLowerCase() === params.category?.toLowerCase()
        );
      }

      if (params?.search && params.search.trim()) {
        const query = params.search.toLowerCase().trim();
        items = items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
      }

      return items;
    }

    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append("category", params.category);
    if (params?.search) queryParams.append("search", params.search);

    const endpoint = `${API_ENDPOINTS.menuItems}?${queryParams.toString()}`;
    const response = await apiClient<ApiResponse<FoodItem[]>>(endpoint);
    return response.data;
  },

  async getPromotions(): Promise<Promotion[]> {
    if (isMock) {
      await delay(100);
      return [MOCK_PROMOTION];
    }
    const response = await apiClient<ApiResponse<Promotion[]>>(
      API_ENDPOINTS.promotions
    );
    return response.data;
  },

  async getHomepageData(): Promise<HomepageData> {
    if (isMock) {
      await delay(200);
      return MOCK_HOMEPAGE_DATA;
    }
    const [categories, popularItems, promotions] = await Promise.all([
      this.getCategories(),
      this.getPopularItems(),
      this.getPromotions(),
    ]);

    return {
      ...MOCK_HOMEPAGE_DATA,
      categories,
      popularItems,
      promotions,
    };
  },
};

