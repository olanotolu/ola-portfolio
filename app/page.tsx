"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";
import { SiteFooter } from "@/components/SiteFooter";
import { scrollToHash } from "@/lib/lenis";

// ponytail: personal research institution — thesis, about, projects, research, writing, now.
// Desktop (≥1024px): hover name → show image, blur others.
// Mobile (<1024px): scroll → highlight name nearest viewport center.

// Hero quip, segmented so the flag emoji and Harvard shield can sit inline
// while the text streams in via the typewriter.
type QuipSeg = { type: "text"; value: string } | { type: "flag" } | { type: "logo" };
const QUIP_SEGS: QuipSeg[] = [
  { type: "text", value: "currently: " },
  { type: "flag" },
  { type: "text", value: " mum fighting me for leaving " },
  { type: "logo" },
];
const QUIP_TOTAL = QUIP_SEGS.reduce((n, s) => n + (s.type === "text" ? s.value.length : 0), 0);

export default function Home() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [clones, setClones] = useState(0);
  const [nycTime, setNycTime] = useState("");
  const [typed, setTyped] = useState(0);

  // Typewriter: the hero quip types itself out once the preloader reveals the
  // page. Text segments stream in; the flag and shield appear at their spot in
  // the line. Reduced motion skips straight to the full line.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(QUIP_TOTAL);
      return;
    }
    let started = false;
    let typeTimer: ReturnType<typeof setInterval> | undefined;
    let i = 0;
    const waitTimer = setInterval(() => {
      const revealed = document.getElementById("pg-wrp")?.classList.contains("revealed");
      if (!revealed || started) return;
      started = true;
      clearInterval(waitTimer);
      typeTimer = setInterval(() => {
        i += 1;
        setTyped(i);
        if (i >= QUIP_TOTAL) clearInterval(typeTimer);
      }, 32);
    }, 100);
    return () => {
      clearInterval(waitTimer);
      if (typeTimer) clearInterval(typeTimer);
    };
  }, []);

  useEffect(() => {
    function update() {
      setNycTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    function onScroll() {
      if (window.matchMedia("(min-width: 1024px)").matches) return;
      const wrap = wrapRef.current;
      if (!wrap) return;
      const links = wrap.querySelectorAll<HTMLElement>("._prj-lnk");
      const vh = window.innerHeight;
      // Only highlight while the project wall is on screen — otherwise the
      // floating preview would linger over the hero/About sections.
      const wr = wrap.getBoundingClientRect();
      if (wr.top > vh || wr.bottom < 0) {
        links.forEach((l) => l.classList.remove("is-active"));
        wrap.querySelectorAll("._prj-img").forEach((i) => i.classList.remove("is-active"));
        return;
      }
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
        l.classList.add("blurry");
        l.classList.remove("is-active");
      });
      wrap.querySelectorAll("._prj-img").forEach((i) => i.classList.remove("is-active"));
      if (closest) {
        const c = closest as HTMLElement;
        c.classList.add("is-active");
        const img = wrap.querySelector(`._prj-img[data-for="${c.dataset.slug}"]`);
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
        // Cap at 4 clones (5 sets) — the marquee keeps its momentum but the
        // footnote and footer must stay reachable; unbounded appends push them
        // out of reach forever.
        if (entries[0].isIntersecting) {
          setClones((c) => Math.min(c + 1, 4));
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

  const renderProject = (p: (typeof projects)[number], setIdx: number) => {
    const style = p.color ? { color: p.color } : undefined;
    const cls =
      "_prj-lnk relative font-pr uppercase leading-[0.9] md:leading-[0.85] lg:leading-[0.8] text-[calc(1rem+6vw)] text-center overflow-hidden md:-mb-2 lnk-blr-hvr hover:blur-[2px] hover:lg:blur-[5px] duration-150 cursor-crosshair";
    const nameEl = (
      <span className="pointer-events-none">
        {p.name}
        {p.prototype && <sup className="ml-0.5 text-[0.32em] align-super">*</sup>}
      </span>
    );
    return (
      <div key={p.slug}>
        {p.url ? (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            data-slug={p.slug}
            style={style}
            className={cls}
          >
            {nameEl}
          </a>
        ) : (
          <div data-slug={p.slug} style={style} className={cls}>
            {nameEl}
          </div>
        )}
        {p.tagline && (
          <p className="pointer-events-none mt-2 mb-5 md:mb-7 text-center font-sc text-[11px] uppercase tracking-[0.15em] text-gray-500">
            {p.tagline}
          </p>
        )}
        {p.logo === "harvard" && (
          <div className="flex justify-center mt-4 mb-6">
            {/* ponytail: Harvard shield SVG from Wikimedia Commons */}
            <img src="/harvard.svg" alt="Harvard University" className="h-[60px] w-auto md:h-[80px] opacity-80" />
          </div>
        )}
        <div
          className="_prj-img pointer-events-none fixed bottom-2 right-3 z-10 invisible w-full max-w-[50vw] sm:max-w-[40vw] md:max-w-[30vw] lg:max-w-[25vw] xl:max-w-[20vw] [&.is-active]:visible"
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
  };

  const renderProjects = () =>
    Array.from({ length: clones + 1 }).map((_, setIdx) => (
      <div key={setIdx} className="flex flex-col items-center _prjs-cnt">
        {featured.map((p) => renderProject(p, setIdx))}
        {setIdx === 0 && rest.length > 0 && (
          <div className="w-full max-w-[200px] h-px bg-gray-200 my-10 md:my-16" />
        )}
        {rest.map((p) => renderProject(p, setIdx))}
      </div>
    ));

  return (
    <>
      {/* ── Hero ── */}
      <section className="ola-hero relative min-h-[100svh] overflow-hidden flex flex-col">
        <div className="flex items-start justify-between px-3 pt-6 md:px-7 md:pt-8">
          <div className="flex flex-col gap-1">
            <p className="font-sc text-[11px] uppercase tracking-[0.08em] text-gray-500 max-w-[40vw] md:max-w-none">
              Increasing the surface area of possibility
            </p>
            <p className="font-sc text-[11px] uppercase tracking-[0.08em] text-gray-500 tabular-nums">
              NYC {nycTime}
            </p>
            <p
              aria-label="currently: nigerian mum fighting me for leaving harvard"
              className="font-pr italic text-[15px] md:text-[16px] text-gray-600 mt-1.5"
            >
              {(() => {
                let consumed = 0;
                return QUIP_SEGS.map((seg, idx) => {
                  if (seg.type === "text") {
                    const start = consumed;
                    consumed += seg.value.length;
                    return <Fragment key={idx}>{seg.value.slice(0, Math.max(0, typed - start))}</Fragment>;
                  }
                  if (typed < consumed) return null;
                  return seg.type === "flag" ? (
                    <span key={idx} aria-hidden="true">🇳🇬</span>
                  ) : (
                    <img
                      key={idx}
                      src="/harvard.svg"
                      alt="Harvard University"
                      className="inline-block ml-1 h-[0.95em] w-auto align-[-0.12em]"
                    />
                  );
                });
              })()}
              <span aria-hidden="true" className="type-cursor" />
            </p>
          </div>
          <nav aria-label="Site" className="flex flex-col items-end gap-0.5 font-sc text-[11px] uppercase leading-[1.4]">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#about");
              }}
              className="lnk-blr-hvr px-1.5 py-1"
            >
              About
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash("#projects");
              }}
              className="lnk-blr-hvr px-1.5 py-1"
            >
              Projects
            </a>
            <a href="/research" className="lnk-blr-hvr px-1.5 py-1">Research</a>
            <a href="/writing" className="lnk-blr-hvr px-1.5 py-1">Writing</a>
            <a href="mailto:subxmii@gmail.com" className="lnk-blr-hvr px-1.5 py-1">Email</a>
            <a href="https://www.linkedin.com/newsletters/in-depth-of-reason-7451106155629707264/" target="_blank" rel="noopener" className="lnk-blr-hvr px-1.5 py-1">
              Newsletter <span className="text-gray-400 normal-case">(200+ subscribers)</span>
            </a>
          </nav>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center px-3 md:px-7 gap-6">
          <p className="font-pr text-[12px] italic leading-[1.1] max-w-[220px] md:max-w-[260px] text-center">
            &ldquo;Build until the impossible becomes ordinary.&rdquo;
          </p>
          <p className="font-pr text-[18px] leading-[1.1] max-w-[340px] md:text-[22px] md:max-w-[520px] text-center">
            I build toward futures that look crazy until they become inevitable. I&rsquo;m interested in the convergence of technologies that turn distant ideas into near-term realities, and in building the systems that make those realities possible.
          </p>
        </div>

        <h1 className="font-pr uppercase leading-[0.7] tracking-[-0.08em] text-center text-[28vw] md:text-[22vw] lg:text-[20vw] select-none -mb-[2vw]">
          <span aria-hidden="true">OlaOlu.</span>
          <span className="sr-only">Ola Aduloju</span>
        </h1>
      </section>

      {/* ── About ── */}
      <section id="about" aria-labelledby="about-h" className="scroll-mt-10 px-6 py-24 md:px-10 md:py-36">
        <div className="max-w-3xl">
          <h2 id="about-h" className="font-pr text-[calc(1rem+3vw)] leading-[0.9] mb-10">
            About
          </h2>

          <div className="space-y-6">
            <p className="font-sc text-[17px] md:text-[19px] leading-relaxed">
              Hi, I&rsquo;m Ola.
            </p>
            <p className="font-sc text-[17px] md:text-[19px] leading-relaxed">
              I&rsquo;m currently digging into the unknown, mostly to see
              what&rsquo;s actually down there.
            </p>
            <p className="font-sc text-[17px] md:text-[19px] leading-relaxed">
              I like finding questions that seem slightly unreasonable, pulling
              on them until something breaks, and then building whatever should
              exist on the other side. Sometimes that means a company. Sometimes
              it means a strange prototype. Sometimes it means realizing I was
              asking the wrong question for three months.
            </p>
            <p className="font-sc text-[17px] md:text-[19px] leading-relaxed">
              I&rsquo;m less interested in predicting the future than getting my
              hands dirty enough to find it.
            </p>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
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
        <p className="pointer-events-none pb-24 pt-6 text-center font-sc text-[11px] uppercase tracking-[0.15em] text-gray-500">
          * Prototype
        </p>
      </section>

      {/* ── Footer ── */}
      <SiteFooter />
    </>
  );
}
