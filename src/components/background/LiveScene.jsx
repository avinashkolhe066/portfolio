import { useMemo } from "react";
import { useTheme } from "../../context/ThemeContext";

// No CSS blur anywhere: soft radial gradients look the same and cost far less on phones.
const Morning = () => (
  <>
    <div className="absolute -right-24 -top-24 h-[24rem] w-[24rem] animate-pulse-slow rounded-full md:-right-40 md:-top-40 md:h-[40rem] md:w-[40rem]"
      style={{ background: "radial-gradient(circle, rgb(255 190 110 / .65), transparent 65%)" }} />
    <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-white/50 to-transparent" />
  </>
);

const Cloud = ({ top, size, dur, delay, className = "" }) => (
  <div className={`absolute animate-drift rounded-full ${className}`}
    style={{ top, left: "-30%", width: size, height: size / 2.5, animationDuration: `${dur}s`, animationDelay: `${delay}s`,
      background: "radial-gradient(closest-side, rgb(255 255 255 / .85), transparent)" }} />
);
const Afternoon = () => (
  <>
    <div className="absolute -top-24 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full md:-top-32 md:h-[36rem] md:w-[36rem]"
      style={{ background: "radial-gradient(circle, rgb(255 244 190 / .8), transparent 65%)" }} />
    <Cloud top="14%" size={320} dur={80} delay={-20} />
    <Cloud top="42%" size={260} dur={110} delay={-70} className="hidden md:block" />
    <Cloud top="68%" size={340} dur={95} delay={-40} className="hidden md:block" />
  </>
);

const Evening = () => (
  <>
    <div className="absolute inset-0"
      style={{ background: "linear-gradient(to top, rgb(255 110 70 / .55), rgb(214 60 120 / .35) 35%, transparent 70%)" }} />
    <div className="absolute -bottom-32 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 animate-pulse-slow rounded-full md:-bottom-40 md:h-[30rem] md:w-[30rem]"
      style={{ background: "radial-gradient(circle, rgb(255 170 80 / .9), rgb(255 90 90 / .4) 50%, transparent 70%)" }} />
  </>
);

const Night = () => {
  const stars = useMemo(() => {
    const n = window.innerWidth < 768 ? 28 : 70;
    return Array.from({ length: n }, () => ({ x: Math.random() * 100, y: Math.random() * 100, s: Math.random() * 2 + 1, d: Math.random() * 5, t: 3 + Math.random() * 4 }));
  }, []);
  return (
    <>
      <div className="absolute right-6 top-10 h-14 w-14 rounded-full md:right-16 md:top-16 md:h-24 md:w-24"
        style={{ background: "radial-gradient(circle at 35% 35%, #fff, #c7d2fe 60%, transparent 72%)", boxShadow: "0 0 50px 12px rgb(129 140 248 / .35)" }} />
      {stars.map((s, i) => (
        <span key={i} className="absolute animate-twinkle rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s`, animationDuration: `${s.t}s` }} />
      ))}
      <span className="absolute left-[70%] top-[10%] hidden h-px w-40 animate-shoot bg-gradient-to-r from-white to-transparent md:block" />
    </>
  );
};

const scenes = { morning: Morning, afternoon: Afternoon, evening: Evening, night: Night };

export default function LiveScene() {
  const { mode, phase } = useTheme();
  if (mode !== "live") return null;
  const Scene = scenes[phase];
  // key={phase} re-mounts on change; the CSS fade replaces the old AnimatePresence
  return (
    <div key={phase} aria-hidden className="pointer-events-none fixed inset-0 -z-10 transform-gpu animate-[fadeIn_1s_ease-out] overflow-hidden">
      <Scene />
    </div>
  );
}
