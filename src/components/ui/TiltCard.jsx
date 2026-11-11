import { useRef } from "react";
import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { canHover } from "../../lib/scrollTo";

function Tilt({ children, className, max }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const cfg = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), cfg);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), cfg);

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const leave = () => { px.set(0.5); py.set(0.5); };

  return (
    <m.div ref={ref} onMouseMove={move} onMouseLeave={leave} style={{ rotateX, rotateY, transformPerspective: 900 }} className={className}>
      {children}
    </m.div>
  );
}

// 3D tilt follows the mouse. On touch screens it is a plain div, with no listeners or springs.
export default function TiltCard({ children, className = "", max = 8 }) {
  return canHover ? <Tilt className={className} max={max}>{children}</Tilt> : <div className={className}>{children}</div>;
}
