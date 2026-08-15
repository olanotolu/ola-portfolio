"use client";

import Image from "next/image";
import { useState } from "react";
import { projects } from "@/lib/projects";
import { ViewSwitcher } from "@/components/ViewSwitcher";

// ponytail: matches the original gallery page — flex-wrap items,
// aspect-square containers, object-contain images, group-hover:scale-90,
// numbered labels (00 1, 00 2, ...). Lightbox on click.
export default function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <ViewSwitcher />
      <div className="pt-10 _grid-wrp _trns-blr">
        <div className="flex flex-wrap _grid-cnt">
          {projects.map((p, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <button
                key={p.slug}
                onClick={() => setActive(i)}
                className="w-[calc(100%/2)] p-[20px] md:w-[calc(100%/3)] md:p-[30px] lg:w-[calc(100%/4)] lg:p-[40px] xl:w-[calc(100%/5)] xl:p-[40px] 2xl:w-[calc(100%/6)] 2xl:p-[50px] group lnk-blr-hvr-inner"
              >
                <div className="aspect-square" style={{ padding: "16px" }}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={600}
                    height={600}
                    className="will-change-transform w-full h-full object-contain group-hover:scale-90 transition-all duration-300 ease-in-out"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (max-width: 1536px) 20vw, 16vw"
                  />
                </div>
                <div className="text-center pt-[10px] flex justify-center inner font-sc text-[15px]">
                  <span>0{num.startsWith("0") ? num[1] : num}</span>
                  <span> {i + 1} </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {active !== null && (
        <div className="_lightbox" onClick={() => setActive(null)}>
          <Image
            src={projects[active].image}
            alt={projects[active].name}
            width={1600}
            height={1600}
            className="!max-w-[90vw] !max-h-[90vh] object-contain"
            sizes="90vw"
          />
        </div>
      )}
    </>
  );
}
