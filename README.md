# cafe_management

**BEANS & BITES – CAFE & RESTAURANT**
A modern, QR Code-based Cafe & Restaurant Management System designed for seamless table-side ordering, menu browsing, kitchen management, and customer delight.

---

## 🍽️ Key Features

- **Dynamic Hero Carousel**: Full HD multi-slide showcase featuring signature dishes (Pizza, Burgers, Steamed Mo:Mo, Artisan Coffee) with auto-play and smooth transitions.
- **Interactive Category Navigation**: Instant filtering across all categories (Pizza, Burger, Pasta, Mo:Mo, Sandwich, Salad, Snacks, Desserts, Beverages) with custom studio imagery.
- **Popular & Signature Dishes**: Real-time pricing in NPR, dietary badges, calorie/time estimations, and instant add-to-cart.
- **Cart & Order State**: Reactive Zustand store with persistent storage and instant feedback.
- **Promotions & Offers**: Integrated coupon system with one-click clipboard copying.
- **Responsive Architecture**: Mobile-first UI optimized for mobile phones, tablets, and desktop displays.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) & React 19
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS & Lucide Icons
- **State Management**: Zustand
- **Data Fetching**: TanStack React Query & Axios
- **Image Optimization**: Sharp & Next.js Image Component

---

## 📦 Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Quick Start
```bash
# Clone the repository
git clone https://github.com/Prakash0m/cafe_management.git
cd cafe_management

# Install dependencies
npm --prefix beans-bites-frontend install

# Run the development server
npm run dev

# Or build and run production server
npm run build
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied).

---

## 📁 Project Structure

```
cafe/
├── package.json              # Root workspace scripts (dev, build, start, lint)
├── README.md                 # Project documentation
├── .gitignore                # Git ignore configuration
├── design-references/        # UI/UX reference screenshots and assets
└── beans-bites-frontend/     # Next.js customer frontend
    ├── public/assets/        # High-definition food & category assets
    ├── src/
    │   ├── app/              # Next.js App Router pages and layouts
    │   ├── components/       # UI and feature components
    │   ├── features/         # Domain feature logic
    │   ├── store/            # Zustand global state stores
    │   ├── types/            # TypeScript domain interfaces
    │   └── data/             # Mock menus and category fixtures
    └── package.json
```

---

## 📄 License
Private repository for Beans & Bites Cafe & Restaurant.

