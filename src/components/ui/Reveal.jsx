import { m } from "framer-motion";

export default function Reveal({ children, delay = 0, y = 20, className = "" }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5, delay: Math.min(delay, 0.3), ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
