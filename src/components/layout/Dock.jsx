import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { m } from "framer-motion";
import { Home, User, BookOpen, Code2, Trophy, Mail } from "lucide-react";
import useActiveSection from "../../hooks/useActiveSection";
import { scrollToId } from "../../lib/scrollTo";
import ThemeSwitcher from "./ThemeSwitcher";

const items = [
  ["home", "Home", Home],
  ["about", "About", User],
  ["education", "Learn", BookOpen],
  ["projects", "Work", Code2],
  ["achievements", "Wins", Trophy],
  ["contact", "Contact", Mail],
];
const ids = items.map((i) => i[0]);

// Glowing outline: runs along the bottom edge, curves up around the active tab, then continues to the right.
// x0 / x1 are the tab's left and right edges; the shape is re-drawn (and animated) when the tab changes.
function shapes(x0, x1, W, H) {
  const b = H - 3; // baseline, just above the bottom edge
  const t = 9; // top of the tab
  const r = 16; // top corner radius
  const s = 22; // how far the curve spreads sideways
  const end = Math.max(W - r, x1 + s);
  const curve = `C ${x0 - s / 2} ${b} ${x0} ${b - 8} ${x0} ${b - 22} V ${t + r} Q ${x0} ${t} ${x0 + r} ${t} H ${x1 - r} Q ${x1} ${t} ${x1} ${t + r} V ${b - 22} C ${x1} ${b - 8} ${x1 + s / 2} ${b} ${x1 + s} ${b}`;
  return {
    line: `M ${r} ${b} H ${x0 - s} ${curve} H ${end}`,
    fill: `M ${x0 - s} ${b} ${curve} V ${H} H ${x0 - s} Z`,
  };
}

// Floating dark slab. Round button on the left; the active section sits in a darker tab with a glowing outline.
export default function Dock() {
  const active = useActiveSection(ids);
  const [visible, setVisible] = useState(true);
  const barRef = useRef(null);
  const btns = useRef({});
  const lockUntil = useRef(0); // keep the bar visible while a tap-triggered scroll is running
  const [geo, setGeo] = useState(null);

  const measure = useCallback(() => {
    const bar = barRef.current;
    const btn = btns.current[active];
    if (!bar || !btn) return;
    const b = bar.getBoundingClientRect();
    const r = btn.getBoundingClientRect();
    setGeo({ x0: r.left - b.left + 2, x1: r.right - b.left - 2, W: b.width, H: b.height });
  }, [active]);

  useLayoutEffect(measure, [measure]);
  useEffect(() => {
    const ro = new ResizeObserver(measure);
    ro.observe(barRef.current);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const d = y - last;
      if (Date.now() < lockUntil.current) setVisible(true);
      else if (y <= 8 || d < -6) setVisible(true);
      else if (d > 6) setVisible(false);
      last = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const d = geo ? shapes(geo.x0, geo.x1, geo.W, geo.H) : null;
  const move = { duration: 0.45, ease: [0.22, 1, 0.36, 1] };

  return (
    <nav aria-label="Sections" className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[max(0.9rem,env(safe-area-inset-bottom))]">
      <m.div
        initial={{ y: 120 }}
        animate={{ y: visible ? 0 : 150 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="pointer-events-auto w-full max-w-xl"
      >
        <div
          ref={barRef}
          className="relative h-[68px] rounded-full shadow-[0_5px_0_#09090b,0_18px_30px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.09)]"
          style={{ background: "linear-gradient(180deg,#2c2c30,#1b1b1e)" }}
        >
          {/* tab fill + glowing outline, clipped to the pill shape */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
            {d && (
              <svg width={geo.W} height={geo.H} viewBox={`0 0 ${geo.W} ${geo.H}`} className="absolute inset-0">
                <defs>
                  <linearGradient id="dock-line" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={geo.W} y2="0">
                    <stop offset="0" style={{ stopColor: "rgb(var(--accent))", stopOpacity: 0.12 }} />
                    <stop offset={Math.max(0.05, (geo.x0 - 30) / geo.W)} style={{ stopColor: "rgb(var(--accent))", stopOpacity: 1 }} />
                    <stop offset={Math.min(0.97, (geo.x1 + 40) / geo.W)} style={{ stopColor: "rgb(var(--accent))", stopOpacity: 0.9 }} />
                    <stop offset="1" style={{ stopColor: "rgb(var(--accent))", stopOpacity: 0.1 }} />
                  </linearGradient>
                </defs>
                <m.path initial={false} animate={{ d: d.fill }} transition={move} fill="#121214" />
                <m.path
                  initial={false}
                  animate={{ d: d.line }}
                  transition={move}
                  fill="none"
                  stroke="url(#dock-line)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 4px rgb(var(--accent) / 0.7))" }}
                />
              </svg>
            )}
          </div>

          <div className="relative z-10 flex h-full items-stretch gap-0.5 px-2.5 sm:gap-1 sm:px-4">
            <div className="flex items-center pr-1.5 sm:pr-3">
              <ThemeSwitcher />
            </div>

            {items.map(([id, label, Icon]) => {
              const on = active === id;
              return (
                <button
                  key={id}
                  ref={(el) => (btns.current[id] = el)}
                  onClick={() => { lockUntil.current = Date.now() + 1800; setVisible(true); scrollToId(id); }}
                  aria-label={label}
                  aria-current={on ? "true" : undefined}
                  className="relative min-w-0 flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <span className="flex h-full flex-col items-center justify-center gap-1">
                    <Icon size={20} strokeWidth={on ? 2.4 : 1.8} className={`transition-colors duration-300 ${on ? "text-accent" : "text-zinc-300"}`} />
                    <span className={`text-[10px] font-medium leading-none transition-colors duration-300 sm:text-xs ${on ? "text-white" : "text-zinc-400"}`}>{label}</span>
                  </span>
                  {id === "contact" && !on && (
                    <span className="absolute right-[24%] top-3 h-2 w-2 rounded-full bg-accent" style={{ boxShadow: "0 0 0 2px #1f1f22" }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </m.div>
    </nav>
  );
}