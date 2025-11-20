import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
// 1. Import the Providers component
import { Providers } from "@/components/shared/Providers"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TradingToken",
  description: "Track & analyse top trading tokens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-white min-h-screen flex flex-col`}
      >
        {/* 2. WRAP EVERYTHING INSIDE <Providers> */}
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
        </Providers>
        {/* End of Providers wrapper */}
      </body>
    </html>
  );
}