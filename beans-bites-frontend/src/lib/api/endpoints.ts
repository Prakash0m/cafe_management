export const API_ENDPOINTS = {
  menuItems: "/menu-items",
  categories: "/categories",
  promotions: "/promotions",
  popularItems: "/menu-items/popular",
  orders: "/orders",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
  },
} as const;

