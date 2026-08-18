import Link from "next/link";

// ponytail: monument-world 404 — the page is blurred out of focus until you
// look at it, then it snaps sharp. Same voice as the hero wordmark.
export default function NotFound() {
  return (
    <div className="min-h-[100svh] flex flex-col items-center justify-center gap-8 px-6 text-center">
      <h1 className="nf-404 font-pr uppercase leading-[0.8] tracking-[-0.08em] text-[28vw] md:text-[20vw] lg:text-[16vw] blur-[2px] hover:blur-0 transition duration-300 select-none">
        404
      </h1>
      <p className="font-pr italic text-[14px] md:text-[16px] text-gray-600">
        This page fell out of focus.
      </p>
      <Link
        href="/"
        className="lnk-blr-hvr font-sc text-[15px] uppercase tracking-[0.08em]"
      >
        Back to OlaOlu.
      </Link>
    </div>
  );
}
