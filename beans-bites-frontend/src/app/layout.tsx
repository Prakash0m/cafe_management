import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Beans & Bites | Cafe & Restaurant",
  description:
    "Discover delicious food, fresh ingredients and your favorite meals at Beans & Bites Cafe & Restaurant.",
  icons: {
    icon: "/assets/brand/favicon.png",
    shortcut: "/assets/brand/favicon.png",
    apple: "/assets/brand/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Caveat:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-[#111827] flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
