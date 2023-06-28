import { ThemeProvider } from "@/lib/contexts/ThemeContext";
import { env } from "@/env.mjs";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: "TEDxRUET", template: "%s | TEDxRUET" },
  description:
    "TEDx is an international community that organizes TED-style events anywhere and everywhere -- celebrating locally-driven ideas and elevating them to a global stage.",
  metadataBase: new URL(env.NEXT_PUBLIC_URL),
  openGraph: {
    images: ["/images/og.jpg"],
    description:
      "TEDx is an international community that organizes TED-style events anywhere and everywhere -- celebrating locally-driven ideas and elevating them to a global stage.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/icons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/icons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000" />
        <meta
          name="msapplication-TileImage"
          content="/icons/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#000" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
