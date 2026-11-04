# Beans & Bites – Customer Homepage Frontend

A modern, responsive, QR Code-based cafe and restaurant customer frontend for **Beans & Bites – Café & Restaurant**, developed with Next.js (App Router), TypeScript, and Tailwind CSS based on the reference design.

## Features

- **Pixel-Accurate Visual Design**: Recreated from the reference design (`design-references/customer/homepage-reference.png`).
- **Cinematic Cafe Hero Section**: Highlighting artisan burgers, fries, chocolate milkshake, and core customer benefits.
- **Interactive Category Strip**: 10 distinct food categories with active state and responsive horizontal scroll.
- **Popular Items Grid**: Four signature items (Margherita Pizza, Chicken Burger, Chicken Mo:Mo, Pasta Alfredo) with price in NPR, badges, favorite toggles, and add-to-cart.
- **Weekend Special Promotion Banner**: 20% OFF banner with interactive clipboard copy for `WEEKEND20` coupon.
- **Global Shopping Cart & Badge**: Powered by Zustand with persistent storage and Sonner notifications.
- **Favorites Store**: Persistent wishlist toggling with visual heart state.
- **Search System**: Responsive search bar for quick dish lookups.
- **API Ready**: Centralized API client and TanStack React Query menu service with mock toggle via `.env.local`.

## Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Installation & Run

1. Navigate to the frontend directory:
   ```bash
   cd beans-bites-frontend
   ```

2. Run development server:
   ```bash
   npm run dev
   ```
   Or from root:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts
- `npm run dev`: Runs Next.js in development mode.
- `npm run build`: Builds the production bundle.
- `npm run start`: Starts the Next.js production server.
- `npm run lint`: Runs ESLint checks.

## Environment Variables
Configured in `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_USE_MOCK_DATA=true
```
Toggle `NEXT_PUBLIC_USE_MOCK_DATA=false` when connecting to your Express.js backend.

