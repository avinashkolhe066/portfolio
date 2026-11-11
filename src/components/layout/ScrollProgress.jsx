import { m, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <m.div
      aria-hidden
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      className="fixed left-0 right-0 top-0 z-[60] h-0.5 bg-accent will-change-transform"
    />
  );
}
