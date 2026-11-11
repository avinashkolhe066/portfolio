import { useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Sun, Moon, Clock } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { palettes } from "../../lib/timePalettes";

const order = ["light", "dark", "live"];
const icons = { light: Sun, dark: Moon, live: Clock };

// Round button at the left end of the dock: tap to cycle Light / Dark / Live.
export default function ThemeSwitcher() {
  const { mode, setMode, phase, override, setOverride } = useTheme();
  const [flashing, setFlashing] = useState(false);
  const [hovering, setHovering] = useState(false);
  const timer = useRef(null);

  const Icon = icons[mode] || Clock;
  const next = order[(order.indexOf(mode) + 1) % order.length];
  const show = mode === "live" && (flashing || hovering);

  const flash = () => {
    setFlashing(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlashing(false), 4000);
  };
  const onClick = () => {
    // Tapping again while in Live re-opens the time picker, so phones can reach it without hover
    if (mode === "live" && !flashing) return flash();
    setMode(next);
    if (next === "live") flash();
    else setFlashing(false);
  };

  return (
    <div className="relative" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <AnimatePresence>
        {show && (
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 pb-5"
          >
            <div className="flex items-center gap-1 rounded-full border border-line bg-card p-1.5 shadow-lg">
              <button
                onClick={() => { setOverride(null); flash(); }}
                title="Follow my real time automatically"
                className={`h-9 rounded-full px-3 text-sm font-medium transition ${!override ? "bg-accent text-bg" : "text-muted hover:bg-line"}`}
              >
                Auto
              </button>
              {Object.entries(palettes).map(([k, p]) => (
                <button
                  key={k}
                  onClick={() => { setOverride(k); flash(); }}
                  title={`Preview ${p.label}`}
                  aria-label={p.label}
                  className={`h-9 w-9 rounded-full text-base transition ${phase === k ? "bg-accent/20 ring-2 ring-accent" : "hover:bg-line"}`}
                >
                  {p.icon}
                </button>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
      <button
        onClick={onClick}
        aria-label={`Theme: ${mode}. Switch to ${next}`}
        title={`${mode} mode`}
        className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-b from-[#3d3d42] to-[#222226] text-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_6px_12px_rgba(0,0,0,0.5)] transition active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-12 sm:w-12"
      >
        <Icon size={20} />
      </button>
    </div>
  );
}