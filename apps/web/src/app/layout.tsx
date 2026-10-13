import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DOGZY Marketplace",
  description: "Avalanche NFT marketplace demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
