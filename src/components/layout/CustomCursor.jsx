import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";
import { canHover } from "../../lib/scrollTo";

// A soft ring that trails the mouse. Rendered only when a real mouse is present.
function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 300, damping: 28 });
  const sy = useSpring(y, { stiffness: 300, damping: 28 });
  const [big, setBig] = useState(false);

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setBig(!!e.target.closest?.("a, button, input, textarea"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <m.div aria-hidden style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[70]">
      <m.div animate={{ scale: big ? 2.2 : 1 }} className="-ml-3 -mt-3 h-6 w-6 rounded-full border border-accent bg-accent/10" />
    </m.div>
  );
}

export default function CustomCursor() {
  return canHover ? <Cursor /> : null;
}
