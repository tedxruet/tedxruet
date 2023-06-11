import { ThemeProvider } from "@/lib/contexts/ThemeContext";
import "./globals.css";

export const metadata = {
  title: "Home | TEDxRUET",
  description:
    "TEDx is an international community that organizes TED-style events anywhere and everywhere -- celebrating locally-driven ideas and elevating them to a global stage.",
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
