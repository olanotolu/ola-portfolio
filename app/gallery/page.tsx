"use client";

import Image from "next/image";
import { useState } from "react";
import { projects } from "@/lib/projects";
import { ViewSwitcher } from "@/components/ViewSwitcher";

export default function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <ViewSwitcher />
      <div className="pt-14 px-4 md:px-6 pb-20">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>*]:mb-4">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setActive(i)}
              className="block w-full break-inside-avoid"
            >
              <Image
                src={p.image}
                alt={p.name}
                width={600}
                height={600}
                className="w-full"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </button>
          ))}
        </div>
      </div>
      {active !== null && (
        <div className="_lightbox" onClick={() => setActive(null)}>
          <Image
            src={projects[active].image}
            alt={projects[active].name}
            width={1600}
            height={1600}
            className="!max-w-[90vw] !max-h-[90vh]"
            sizes="90vw"
          />
        </div>
      )}
    </>
  );
}
