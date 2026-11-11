import { useEffect, useMemo, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import { canHover } from "../../lib/scrollTo";

// "accent" follows the current theme color, so Live mode changes the glow with the time of day.
const sets = {
  light: ["59 130 246", "168 85 247", "34 211 238"],
  dark: ["99 102 241", "34 211 238", "236 72 153"],
  live: ["accent", "accent", "accent"],
};
const col = (c, a) => (c === "accent" ? `rgb(var(--accent) / ${a})` : `rgb(${c} / ${a})`);

// Radial gradients already fade to transparent, so no CSS blur is needed (blur is what made phones lag).
function Orb({ c, a, size, pos, dx, dy, dur, className = "" }) {
  return (
    <div
      className={`absolute rounded-full md:animate-float ${className}`}
      style={{
        width: size, height: size, ...pos,
        "--dx": `${dx}px`, "--dy": `${dy}px`, animationDuration: `${dur}s`,
        background: `radial-gradient(circle, ${col(c, a)}, transparent 65%)`,
      }}
    />
  );
}

export default function HeroBackground() {
  const { mode } = useTheme();
  const ref = useRef(null);
  const glow = useRef(null);
  const c = sets[mode] || sets.live;
  const strong = mode === "dark" ? 0.4 : 0.3;

  // Mouse-follow glow: desktop only, written straight to the DOM (no React re-renders)
  useEffect(() => {
    if (!canHover) return;
    let raf = 0;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = ref.current?.getBoundingClientRect();
        if (r && glow.current) glow.current.style.transform = `translate3d(${e.clientX - r.left - 250}px, ${e.clientY - r.top - 250}px, 0)`;
      });
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  const particles = useMemo(
    () => Array.from({ length: 12 }, () => ({ x: Math.random() * 100, y: 30 + Math.random() * 70, s: 2 + Math.random() * 2, d: 6 + Math.random() * 5, delay: Math.random() * 6 })),
    []
  );

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Orb c={c[0]} a={strong} size={420} pos={{ left: "-20%", top: "-8%" }} dx={70} dy={50} dur={16} className="md:!h-[560px] md:!w-[560px]" />
      <Orb c={c[1]} a={strong - 0.08} size={360} pos={{ right: "-20%", top: "12%" }} dx={-60} dy={70} dur={20} className="md:!h-[480px] md:!w-[480px]" />
      <Orb c={c[2]} a={strong - 0.1} size={420} pos={{ left: "35%", bottom: "-18%" }} dx={50} dy={-40} dur={18} className="hidden md:block" />

      {canHover && (
        <div
          ref={glow}
          className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full"
          style={{ transform: "translate3d(-500px,-500px,0)", background: "radial-gradient(circle, rgb(var(--accent) / 0.14), transparent 65%)" }}
        />
      )}

      <div className="hidden md:block">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute animate-rise rounded-full bg-accent"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDuration: `${p.d}s`, animationDelay: `${p.delay}s` }}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
