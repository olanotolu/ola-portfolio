"use client";

import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { ViewSwitcher } from "@/components/ViewSwitcher";

export default function GridPage() {
  return (
    <>
      <ViewSwitcher />
      <div className="pt-14 px-4 md:px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/project/${p.slug}`}
              className="_grid-item block"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="mt-2 font-pr uppercase text-sm leading-tight">
                {p.name}
              </div>
              <div className="font-sc text-xs text-gray-500">
                {p.category} — {p.year}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
