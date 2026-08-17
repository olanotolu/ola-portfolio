"use client";

import { useEffect, useRef, useState } from "react";
import { preloaderImages } from "@/lib/preloader-images";

// ponytail: replicates preloader.js anime.js timeline 1:1.
// Timeline (ms from start):
//   t=0:     black overlay opacity→1, page hidden
//   t=1000:  text fades in (opacity 0→1, blur 10→0, Y 20→0, 600ms, easeOutCubic)
//   t=1100:  images fade in (same, 1000ms default anime duration, at -=500)
//   t=1100:  images start cycling every 150ms
//   t=3100:  images fade out (opacity 1→0, blur 0→10, Y 0→-20, 600ms, easeInCubic, at +=1000)
//   t=3350:  text fades out (same, 600ms, delay 100, at -=450)
//   t=3950:  complete → pg-wrp revealed, overlay fades out (300ms, delay 200)
//   t=4450:  overlay removed
export function Preloader() {
  const [removed, setRemoved] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [textStyle, setTextStyle] = useState({
    opacity: 0,
    filter: "blur(10px)",
    transform: "translateY(20px)",
  });
  const [imgsStyle, setImgsStyle] = useState({
    opacity: 0,
    filter: "blur(10px)",
    transform: "translateY(20px)",
  });
  const [currentImg, setCurrentImg] = useState(0);
  const imgIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const T = 600; // td
  const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)"; // easeOutCubic
  const EASE_IN = "cubic-bezier(0.55, 0, 1, 0.45)"; // easeInCubic

  useEffect(() => {
    // Reduced motion: skip the entire timeline, reveal immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.getElementById("pg-wrp")?.classList.add("revealed");
      setRemoved(true);
      return;
    }

    // t=0: show overlay immediately (matches prldr.style.opacity = '1')
    setOverlayOpacity(1);

    const timers: ReturnType<typeof setTimeout>[] = [];

    // t=1000: text fades in
    timers.push(
      setTimeout(() => {
        setTextStyle({
          opacity: 1,
          filter: "blur(0px)",
          transform: "translateY(0px)",
        });
      }, 1000)
    );

    // t=1100: images fade in + start cycling
    timers.push(
      setTimeout(() => {
        setImgsStyle({
          opacity: 1,
          filter: "blur(0px)",
          transform: "translateY(0px)",
        });
        imgIntervalRef.current = setInterval(() => {
          setCurrentImg((i) => (i + 1) % preloaderImages.length);
        }, 150);
      }, 1100)
    );

    // t=3100: images fade out
    timers.push(
      setTimeout(() => {
        setImgsStyle({
          opacity: 0,
          filter: "blur(10px)",
          transform: "translateY(-20px)",
        });
      }, 3100)
    );

    // t=3350: text fades out (delay 100 + at -=450 from imgs out start 3100 → 3100-450+100=2750? No.)
    // anime.js: text out added at '-=450' relative to images-out end.
    // images-out: starts 3100, duration 600, ends 3700. '-=450' → start at 3700-450=3250. +delay 100 = 3350.
    timers.push(
      setTimeout(() => {
        setTextStyle({
          opacity: 0,
          filter: "blur(10px)",
          transform: "translateY(-20px)",
        });
      }, 3350)
    );

    // t=3950: complete → reveal page content
    timers.push(
      setTimeout(() => {
        // pg-wrp opacity→1, blur 10→0, Y 20→0 (handled by CSS class .revealed)
        document.getElementById("pg-wrp")?.classList.add("revealed");
        // stop cycling
        if (imgIntervalRef.current) clearInterval(imgIntervalRef.current);
      }, 3950)
    );

    // t=4150: overlay fades out (delay 200 after complete)
    timers.push(
      setTimeout(() => {
        setOverlayOpacity(0);
      }, 4150)
    );

    // t=4450: remove overlay (300ms fade + small buffer)
    timers.push(
      setTimeout(() => {
        setRemoved(true);
      }, 4500)
    );

    return () => {
      timers.forEach(clearTimeout);
      if (imgIntervalRef.current) clearInterval(imgIntervalRef.current);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-[100dvh] z-20 bg-black flex justify-center items-center transition-opacity duration-300"
      style={{ opacity: overlayOpacity, transitionTimingFunction: EASE_OUT }}
    >
      <div
        className="font-sc text-[15px] text-white"
        style={{
          opacity: textStyle.opacity,
          filter: textStyle.filter,
          transform: textStyle.transform,
          transition: `opacity ${T}ms ${EASE_OUT}, filter ${T}ms ${EASE_OUT}, transform ${T}ms ${EASE_OUT}`,
        }}
      >
        Ola.
      </div>
      <div
        className="fixed bottom-3 right-3"
        style={{
          opacity: imgsStyle.opacity,
          filter: imgsStyle.filter,
          transform: imgsStyle.transform,
          transition: `opacity 1000ms ${EASE_OUT}, filter 1000ms ${EASE_OUT}, transform 1000ms ${EASE_OUT}`,
        }}
      >
        {preloaderImages.map((src, i) => (
          <div
            key={src}
            className="absolute bottom-0 right-0 w-[150px]"
            style={{ display: i === currentImg ? "block" : "none" }}
          >
            {/* ponytail: plain img instead of next/image — tiny thumbnails, matches original markup */}
            <img
              src={src}
              alt="Ola. project preview"
              className="w-full h-full"
              loading="eager"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
