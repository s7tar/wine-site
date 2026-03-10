import React from "react"
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { I18nProvider } from "@/lib/i18n/context";
import "./globals.css";

export const metadata: Metadata = {
  title: "ハルカ株式会社 | 品味红酒文化",
  description:
    "探索红酒的深厚文化，感受时间沉淀的馥郁芬芳，品味人生的精致细节。高贵是种气质，精致是种品质。",
  generator: "v0.app",
  keywords: ["红酒", "品鉴", "奢华", "文化", "葡萄酒", "wine", "tasting"],
  icons: {
    icon: "/haruka-icon.png",
    apple: "/haruka-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <I18nProvider>
          {children}
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
