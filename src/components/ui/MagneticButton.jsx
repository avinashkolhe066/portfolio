import { useRef } from "react";
import { m, useSpring } from "framer-motion";
import { canHover } from "../../lib/scrollTo";

const base = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors";

function Magnetic({ children, className, ...props }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <m.a ref={ref} style={{ x, y }} onMouseMove={move} onMouseLeave={leave} whileTap={{ scale: 0.96 }} className={`${base} ${className}`} {...props}>
      {children}
    </m.a>
  );
}

// Magnetic pull only with a real mouse. Touch gets a plain link with a tap-press effect.
export default function MagneticButton({ children, className = "", ...props }) {
  return canHover ? (
    <Magnetic className={className} {...props}>{children}</Magnetic>
  ) : (
    <a className={`${base} active:scale-95 ${className}`} {...props}>{children}</a>
  );
}
