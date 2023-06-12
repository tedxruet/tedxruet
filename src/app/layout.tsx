import { ThemeProvider } from "@/lib/contexts/ThemeContext";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: "TEDxRUET", template: "%s | TEDxRUET" },
  description:
    "TEDx is an international community that organizes TED-style events anywhere and everywhere -- celebrating locally-driven ideas and elevating them to a global stage.",
  openGraph: {
    images: ["/images/tedxruet-cover.webp"],
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
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
