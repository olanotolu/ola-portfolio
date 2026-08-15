"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { projects } from "@/lib/projects";
import { ViewSwitcher } from "@/components/ViewSwitcher";

export default function Home() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // ponytail: mobile scroll highlight — listens on window, not the div.
  useEffect(() => {
    function onScroll() {
      if (window.matchMedia("(min-width: 768px)").matches) return;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const links = wrap.querySelectorAll<HTMLElement>("._prj-lnk");
      const vh = window.innerHeight;
      let closest: HTMLElement | null = null;
      let min = Infinity;
      links.forEach((l) => {
        const r = l.getBoundingClientRect();
        const mid = r.top + r.height / 2;
        const d = Math.abs(mid - vh / 2);
        if (d < min) {
          min = d;
          closest = l;
        }
      });
      links.forEach((l) => {
        l.classList.add("blurry");
        l.classList.remove("is-active");
      });
      closest?.classList.add("is-active");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ponytail: desktop hover shows preview image + blurs other links;
  // mobile scroll highlights the link closest to viewport center.
  // Original splits this across homeProjectHover.js + homeInfiniteScroll.js.
  function onMouseOver(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    const link = target.closest("._prj-lnk") as HTMLElement | null;
    if (!link) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.classList.add("hovering");
    wrap.querySelectorAll("._prj-lnk").forEach((l) => l.classList.remove("is-active"));
    link.classList.add("is-active");
    const img = wrap.querySelector(`._prj-img[data-for="${link.dataset.slug}"]`);
    wrap.querySelectorAll("._prj-img").forEach((i) => i.classList.remove("is-active"));
    img?.classList.add("is-active");
  }

  function onMouseOut() {
    const wrap = wrapRef.current;
    if (!wrap) return;
    wrap.classList.remove("hovering");
    wrap.querySelectorAll("._prj-lnk").forEach((l) => l.classList.remove("is-active"));
    wrap.querySelectorAll("._prj-img").forEach((i) => i.classList.remove("is-active"));
  }

  return (
    <>
      <ViewSwitcher />
      <div
        ref={wrapRef}
        className="_prjs-wrp pt-8 md:pt-7"
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <div className="flex flex-col items-center">
          {projects.map((p) => (
            <div key={p.slug} className="relative">
              <Link
                href={`/project/${p.slug}`}
                data-slug={p.slug}
                className="_prj-lnk relative font-pr uppercase leading-[0.9] md:leading-[0.85] lg:leading-[0.8] text-[calc(1rem+6vw)] text-center overflow-hidden md:-mb-2"
              >
                <span className="pointer-events-none">{p.name}</span>
              </Link>
              <div
                className="_prj-img fixed bottom-2 right-3 z-10 w-full max-w-[50vw] sm:max-w-[40vw] md:max-w-[30vw] lg:max-w-[25vw] xl:max-w-[20vw]"
                data-for={p.slug}
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  width={1024}
                  height={1024}
                  className="w-full mb-7"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 20vw"
                  priority={projects.indexOf(p) < 3}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
