"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";

// ponytail: single page — editorial Ola. hero, about copy, then project list.
// Desktop (≥1024px): hover name → show image, blur others.
// Mobile (<1024px): scroll → highlight name nearest viewport center.
// No project detail pages — names are plain text, not links.
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
      <div
        data-slug={p.slug}
        style={p.color ? { color: p.color } : undefined}
        className="_prj-lnk relative font-pr uppercase leading-[0.9] md:leading-[0.85] lg:leading-[0.8] text-[calc(1rem+6vw)] text-center overflow-hidden md:-mb-2 lnk-blr-hvr hover:blur-[2px] hover:lg:blur-[5px] duration-150 cursor-crosshair"
      >
        <span className="pointer-events-none">{p.name}</span>
      </div>
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
          <div className="w-full max-w-[200px] h-px bg-gray-200 my-10 md:my-16" />
        )}
        {rest.map((p) => renderProject(p, setIdx))}
      </div>
    ));

  return (
    <>
      {/* Editorial hero — full viewport */}
      <section className="ola-hero relative min-h-[100svh] overflow-hidden flex flex-col">
        {/* Top bar: tagline + nav */}
        <div className="flex items-start justify-between px-3 pt-6 md:px-7 md:pt-8">
          <p className="font-sc text-[10px] uppercase tracking-[0.08em] text-gray-500 max-w-[40vw] md:max-w-none">
            Increasing the surface area of possibility
          </p>
          <nav aria-label="Site" className="flex flex-col items-end gap-0.5 font-sc text-[10px] uppercase leading-[1.4]">
            <a href="#about" className="lnk-blr-hvr px-1 py-0.5">About</a>
            <a href="#projects" className="lnk-blr-hvr px-1 py-0.5">Projects</a>
            <a href="mailto:hi@emelecollab.com" className="lnk-blr-hvr px-1 py-0.5">Email</a>
          </nav>
        </div>

        {/* Mid section: quote (left) + intro (right) — side by side on desktop, stacked on mobile */}
        <div className="flex-1 flex flex-col justify-center px-3 md:px-7 md:flex-row md:items-center md:justify-between md:gap-8">
          <p className="font-pr text-[12px] italic leading-[1.1] max-w-[200px] md:text-[14px] md:max-w-[180px]">
            &ldquo;Great design turns information into experience.&rdquo;
          </p>
          <p className="font-pr text-[18px] leading-[1] mt-6 max-w-[280px] md:text-[24px] md:max-w-[340px] md:text-right md:mt-0 md:ml-auto">
            Independent multidisciplinary designer, specializing in digital experiences and interaction design.
          </p>
        </div>

        {/* Oversized Ola. anchored at bottom */}
        <h1 className="font-pr uppercase leading-[0.7] tracking-[-0.08em] text-center text-[34vw] md:text-[28vw] lg:text-[26vw] select-none -mb-[2vw]">
          <span aria-hidden="true">Ola.</span>
          <span className="sr-only">Ola.</span>
        </h1>
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-h" className="scroll-mt-10 px-6 py-24 md:px-10 md:py-36">
        <div className="max-w-3xl">
          <h2 id="about-h" className="font-pr text-[calc(1rem+3vw)] leading-[0.9] mb-6">
            About
          </h2>
          <p className="font-sc text-[15px] leading-relaxed">
            Ola. is a creative studio specializing in branding, web design,
            and web development. We work closely with agencies, businesses,
            and individuals to create thoughtful and visually striking digital
            experiences.
          </p>
        </div>
      </section>

      {/* Projects list */}
      <section id="projects" aria-labelledby="projects-h" className="scroll-mt-10">
        <h2 id="projects-h" className="sr-only">Projects</h2>
        <div
          ref={wrapRef}
          className="_prjs-wrp pt-8 md:pt-7"
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        >
          {renderProjects()}
        </div>
      </section>

      <footer className="flex justify-between px-3 py-8 font-sc text-[15px] md:px-7">
        <span>Creative Studio</span>
        <a href="mailto:hi@emelecollab.com" className="lnk-blr-hvr">Email Us</a>
      </footer>
    </>
  );
}
