"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";

// ponytail: single page — Who? intro text + project list below.
// Desktop (≥1024px): hover link → show image, blur others.
// Mobile (<1024px): scroll → highlight nearest link.
export default function Home() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [clones, setClones] = useState(0);

  useEffect(() => {
    function onScroll() {
      if (window.matchMedia("(min-width: 1024px)").matches) return;
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
          closest = l as HTMLElement;
        }
      });
      links.forEach((l) => {
        l.classList.remove("blurry");
        l.classList.remove("is-active");
      });
      wrap.querySelectorAll("._prj-img").forEach((i) => i.classList.remove("is-active"));
      if (closest) {
        const c = closest as HTMLElement;
        c.classList.add("blurry", "is-active");
        const img = c.nextElementSibling;
        img?.classList.add("is-active");
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [clones]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setClones((c) => c + 1);
        }
      },
      { threshold: 0.01 }
    );
    const last = wrap.querySelector("._prjs-cnt:last-child");
    if (last) observer.observe(last);
    return () => observer.disconnect();
  }, [clones]);

  function onMouseOver(e: React.MouseEvent) {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
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

  const featured = projects.slice(0, 4);
  const rest = projects.slice(4);

  const renderProject = (p: (typeof projects)[number], setIdx: number) => (
    <div key={p.slug}>
      <Link
        href={`/project/${p.slug}`}
        data-slug={p.slug}
        style={p.color ? { color: p.color } : undefined}
        className="_prj-lnk relative font-pr uppercase leading-[0.9] md:leading-[0.85] lg:leading-[0.8] text-[calc(1rem+6vw)] text-center overflow-hidden md:-mb-2 lnk-blr-hvr hover:blur-[2px] hover:lg:blur-[5px] duration-150"
      >
        <span className="pointer-events-none">{p.name}</span>
      </Link>
      <div
        className="_prj-img lg:pointer-events-none fixed bottom-2 right-3 z-10 invisible w-full max-w-[50vw] sm:max-w-[40vw] md:max-w-[30vw] lg:max-w-[25vw] xl:max-w-[20vw] [&.is-active]:visible"
        data-for={p.slug}
      >
        <Image
          src={p.image}
          alt={p.name}
          width={1024}
          height={1024}
          className="w-full mb-7"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 20vw"
          priority={setIdx === 0 && projects.findIndex((x) => x.slug === p.slug) < 3}
        />
      </div>
    </div>
  );

  const renderProjects = () =>
    Array.from({ length: clones + 1 }).map((_, setIdx) => (
      <div key={setIdx} className="flex flex-col items-center _prjs-cnt">
        {featured.map((p) => renderProject(p, setIdx))}
        {setIdx === 0 && (
          <div className="w-full max-w-[200px] h-px bg-gray-100 my-10 md:my-16" />
        )}
        {rest.map((p) => renderProject(p, setIdx))}
      </div>
    ));

  return (
    <>
      {/* Who? intro */}
      <div className="pt-20 px-6 md:px-10 pb-16 max-w-3xl mx-auto">
        <h1 className="font-pr uppercase text-[calc(1rem+4vw)] leading-[0.9] mb-8">
          Who?
        </h1>
        <div className="font-sc text-[15px] leading-relaxed space-y-6">
          <p>
            The Who? page is our space for experiments — type studies, motion
            sketches, interaction prototypes, and tools that may or may not
            become real projects.
          </p>
          <p>
            It&apos;s where we test ideas before they have a brief, and where
            curiosity leads the process instead of a deadline.
          </p>
        </div>
      </div>

      {/* Projects list */}
      <div
        ref={wrapRef}
        className="_prjs-wrp pt-8 md:pt-7 _trns-blr"
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        {renderProjects()}
      </div>
    </>
  );
}
