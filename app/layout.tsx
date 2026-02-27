import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import PageTransition from "@/components/page-transition";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paydeck - Modern Payment Gateway",
  description: "Secure, fast, and easy payment processing for merchants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ backgroundColor: "#080c10" }}>
      <body
        className="font-sans antialiased bg-[#080c10] text-[#e8edf2]"
        style={{ backgroundColor: "#080c10" }}
      >
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  );
}
