import type Lenis from "lenis";

// ponytail: singleton handle so pages can drive Lenis programmatically —
// nav anchor clicks smooth-scroll instead of jumping natively.
let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function scrollToHash(hash: string) {
  if (lenisInstance) {
    lenisInstance.scrollTo(hash, { duration: 1.2 });
  } else {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }
}
