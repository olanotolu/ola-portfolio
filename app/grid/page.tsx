"use client";

import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { ViewSwitcher } from "@/components/ViewSwitcher";

// ponytail: matches the original grid page — 12-col CSS grid,
// col-span-6 on mobile, xl:col-span-4, hover scale-95 + blur-inner.
export default function GridPage() {
  return (
    <>
      <ViewSwitcher />
      <div className="_grid-wrp pt-10 _trns-blr">
        <div className="grid grid-cols-12 gap-x-[10px] gap-y-[50px] px-[10px] _grid-cnt">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/project/${p.slug}`}
              className="col-span-6 xl:col-span-4 flex flex-col gap-y-[10px] items-center group self-start lnk-blr-hvr-inner"
            >
              <div className="transition-all duration-300">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={600}
                  height={600}
                  className="w-full group-hover:scale-95 transition-all duration-300 ease-in-out"
                  sizes="(max-width: 1280px) 50vw, 33vw"
                />
              </div>
              <div className="text-center leading-[1.1] inner flex flex-wrap gap-x-2 font-sc text-[15px]">
                <span>{p.name}</span> / <span>{p.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
