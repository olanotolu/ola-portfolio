"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

// ponytail: replicates barbaPageTransition.js — barba sync:true with anime.js.
// Leave: opacity 1→0, blur 0→20px, Y 0→-20px, 600ms easeOutCubic
// Enter: opacity 0→1, blur 20→0, Y 20→0, 600ms easeOutCubic
// Targets ._trns-blr elements (main content + footer). Header stays constant.
const TD = 600;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"; // easeOutCubic

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [phase, setPhase] = useState<"idle" | "leaving" | "entering">("idle");
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (pathname === prevPath.current) return;
    // Start leave animation
    setPhase("leaving");
    const leaveTimer = setTimeout(() => {
      // Swap content + start enter
      setDisplayChildren(children);
      setPhase("entering");
      prevPath.current = pathname;
      // Scroll to top (matches barba.hooks.enter)
      window.scrollTo(0, 0);
    }, TD);
    return () => clearTimeout(leaveTimer);
  }, [pathname, children]);

  // After entering starts, transition to idle on next frame to trigger CSS transition
  useEffect(() => {
    if (phase !== "entering") return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("idle"));
    });
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const leaving = phase === "leaving";
  const entering = phase === "entering";

  // Leaving: fade out, blur, slide up. Entering: start hidden, then CSS transitions to idle.
  const style: React.CSSProperties = {
    opacity: leaving ? 0 : entering ? 0 : 1,
    filter: leaving ? "blur(20px)" : entering ? "blur(20px)" : "blur(0px)",
    transform: leaving
      ? "translateY(-20px)"
      : entering
        ? "translateY(20px)"
        : "translateY(0px)",
    transition: `opacity ${TD}ms ${EASE}, filter ${TD}ms ${EASE}, transform ${TD}ms ${EASE}`,
  };

  return (
    <div className="_trns-blr" style={style}>
      {displayChildren}
    </div>
  );
}
