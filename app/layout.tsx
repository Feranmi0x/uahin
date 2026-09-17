import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Upliftment Against Hunger Initiative NG (UAHIN)",
  description:
    "A Nigerian-led humanitarian organization responding to hunger with food relief, community support, and local resilience.",
  generator: "v0.app",
};
export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f7f8f5",
  userScalable: false,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
