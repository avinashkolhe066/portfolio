import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";

const name = "Avinash Kolhe";
const SEEN = "intro-seen";
const seen = () => {
  try { return sessionStorage.getItem(SEEN) === "1"; } catch { return false; }
};

export default function Preloader({ onDone }) {
  const skip = seen(); // returning within the same session: no intro
  const [show, setShow] = useState(!skip);
  const pctRef = useRef(null);

  useEffect(() => {
    if (skip) { onDone(); return; }
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - start) / 1100, 1);
      if (pctRef.current) pctRef.current.textContent = `${Math.round(p * 100)}%`; // no React re-render per frame
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        try { sessionStorage.setItem(SEEN, "1"); } catch { /* ignore */ }
        setShow(false);
        onDone();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []); // eslint-disable-line

  // Block scrolling while the intro plays
  useEffect(() => {
    document.documentElement.style.overflow = show ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
        >
          <div className="flex overflow-hidden text-3xl font-semibold tracking-tight sm:text-6xl">
            {name.split("").map((c, i) => (
              <span key={i} className="inline-block animate-[fadeIn_0.5s_ease-out_both] whitespace-pre" style={{ animationDelay: `${i * 35}ms` }}>
                {c}
              </span>
            ))}
          </div>
          <p ref={pctRef} className="mt-5 font-mono text-sm text-muted">0%</p>
        </m.div>
      )}
    </AnimatePresence>
  );
}
