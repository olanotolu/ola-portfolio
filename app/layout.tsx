import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Preloader } from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Ola.",
  description:
    "Ola. is a creative studio founded by Matt Imling and Lidia Conde, specializing in branding, web design, and web development. We work closely with agencies, businesses, and individuals to create thoughtful and visually striking digital experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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
              aria-label="Ola."
            >
              <span className="hidden sm:inline">Ola.</span>
            </Link>
          </div>
          {/* page content */}
          <main className="relative">{children}</main>
          {/* fixed footer */}
          <div className="fixed bottom-2 left-3 z-20 font-sc text-[15px]">
            Creative Studio
          </div>
          <div className="fixed bottom-2 right-3 z-20 font-sc text-[15px]">
            <a
              href="mailto:hi@emelecollab.com?subject=Hey%20for%20Emele%20Collab&body=Hey%20Matt%20%26%20Lidia%2C%20..."
              className="lnk-blr-hvr"
              target="_blank"
              rel="noopener"
            >
              Email Us
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
