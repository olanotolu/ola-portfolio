import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";

export const metadata: Metadata = {
  title: "OlaOlu.",
  description:
    "OlaOlu. is an independent multidisciplinary designer specializing in digital experiences and interaction design.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-white text-[#171717] font-sc">
        <Preloader />
        <SmoothScroll />
        <div className="pg-wrp relative" id="pg-wrp">
          {/* fixed header — just the logo */}
          <div className="fixed top-2 left-3 z-20">
            <Link
              href="/"
              className="lnk-blr-hvr font-sc text-[15px]"
              aria-label="OlaOlu."
            >
              <span className="hidden sm:inline">OlaOlu.</span>
            </Link>
          </div>
          {/* page content */}
          <main className="relative">{children}</main>
        </div>
      </body>
    </html>
  );
}
