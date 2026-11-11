import { createContext, useContext, useEffect, useState } from "react";
import { palettes } from "../lib/timePalettes";
import useTimeOfDay from "../hooks/useTimeOfDay";

const ThemeCtx = createContext(null);
export const useTheme = () => useContext(ThemeCtx);

const read = () => {
  try { return localStorage.getItem("mode"); } catch { return null; }
};

export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState(() => (["light", "dark", "live"].includes(read()) ? read() : "live")); // light | dark | live
  const [override, setOverride] = useState(null); // preview a time phase
  const realPhase = useTimeOfDay();
  const phase = override || realPhase;

  const setMode = (m) => {
    setModeState(m);
    setOverride(null); // Live always starts from the real clock
    try { localStorage.setItem("mode", m); } catch { /* ignore */ }
  };

  useEffect(() => {
    const root = document.documentElement;
    const live = mode === "live";
    Object.entries(palettes[phase].vars).forEach(([k, v]) =>
      live ? root.style.setProperty(k, v) : root.style.removeProperty(k)
    );
    root.dataset.theme = live ? "live" : mode;
  }, [mode, phase]);

  return (
    <ThemeCtx.Provider value={{ mode, setMode, phase, realPhase, override, setOverride }}>
      {children}
    </ThemeCtx.Provider>
  );
}