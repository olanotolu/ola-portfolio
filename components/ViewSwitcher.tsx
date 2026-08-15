"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const views = [
  { href: "/", label: "List" },
  { href: "/grid", label: "Grid" },
  { href: "/gallery", label: "Gallery" },
];

export function ViewSwitcher() {
  const pathname = usePathname();
  return (
    <div className="fixed top-0 left-0 z-10 pointer-events-none w-full flex justify-center pt-2">
      {views.map((v, i) => (
        <span key={v.href} className="flex items-center">
          {i > 0 && <span className="px-1 py-2">/</span>}
          <Link
            href={v.href}
            className={`lnk-blr-hvr pointer-events-auto px-3 py-2 font-sc text-[15px] ${
              pathname === v.href ? "is-active blur-[2px] pointer-events-none" : ""
            }`}
          >
            {v.label}
          </Link>
        </span>
      ))}
    </div>
  );
}
