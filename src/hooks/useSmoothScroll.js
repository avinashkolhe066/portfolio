import { useEffect } from "react";
import Lenis from "lenis";
import { canHover } from "../lib/scrollTo";

// Smooth-scroll library only on desktop. Phones scroll natively, which is smoother and cheaper.
export default function useSmoothScroll() {
  useEffect(() => {
    if (!canHover || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1 });
    window.__lenis = lenis;
    let id;
    const raf = (t) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}
