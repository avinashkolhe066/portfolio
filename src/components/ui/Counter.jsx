import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

// Counts up from 0 to `to` when scrolled into view.
export default function Counter({ to, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, suffix]);

  return <span ref={ref}>{(0).toFixed(decimals) + suffix}</span>;
}