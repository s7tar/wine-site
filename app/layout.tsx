import React from "react"
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { I18nProvider } from "@/lib/i18n/context";
import "./globals.css";

export const metadata: Metadata = {
  title: "ELITE 红酒会所 | 品味红酒文化",
  description:
    "探索红酒的深厚文化，感受时间沉淀的馥郁芬芳，品味人生的精致细节。高贵是种气质，精致是种品质。",
  generator: "v0.app",
  keywords: ["红酒", "品鉴", "奢华", "文化", "葡萄酒", "wine", "tasting"],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
      {/* v0 – built-with badge */}
  <div dangerouslySetInnerHTML={{ __html: `<div id="v0-built-with-button-2a683184-e15d-4415-a326-0348cd005bba" style="
border: 1px solid hsl(0deg 0% 100% / 12%);
position: fixed;
bottom: 24px;
right: 24px;
z-index: 1000;
background: #121212;
color: white;
padding: 8px 12px;
border-radius: 8px;
font-weight: 400;
font-size: 14px;
box-shadow: 0 2px 8px rgba(0,0,0,0.12);
letter-spacing: 0.02em;
transition: all 0.2s;
display: flex;
align-items: center;
gap: 4px;
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
">
<a
  href="https://v0.app/chat/api/open/built-with-v0/b_FRgB0pMYXAB?ref=X0MIR1"
  target="_blank"
  rel="noopener"
  style="
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
  "
>
  Built with
  <svg
    fill="currentColor"
    viewBox="0 0 147 70"
    xmlns="http://www.w3.org/2000/svg"
    style="width: 20px; height: 20px;"
  >
    <path d="M56 50.2031V14H70V60.1562C70 65.5928 65.5928 70 60.1562 70C57.5605 70 54.9982 68.9992 53.1562 67.1573L0 14H19.7969L56 50.2031Z" />
    <path d="M147 56H133V23.9531L100.953 56H133V70H96.6875C85.8144 70 77 61.1856 77 50.3125V14H91V46.1562L123.156 14H91V0H127.312C138.186 0 147 8.81439 147 19.6875V56Z" />
  </svg>
</a>

<button
  onclick="document.getElementById('v0-built-with-button-2a683184-e15d-4415-a326-0348cd005bba').style.display='none'"
  onmouseenter="this.style.opacity='1'"
  onmouseleave="this.style.opacity='0.7'"
  style="
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 2px;
    margin-left: 4px;
    border-radius: 2px;
    display: flex;
    align-items: center;
    opacity: 0.7;
    transition: opacity 0.2s;
    transform: translateZ(0);
  "
  aria-label="Close"
>
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
</button>

<span style="
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
">
  v0
</span>
</div>` }} />
</body>
    </html>
  );
}
