import { useEffect, useState } from "react";
import { getPhase } from "../lib/timePalettes";

const now = () => getPhase(new Date().getHours());

// Returns "morning" | "afternoon" | "evening" | "night" from the visitor's own clock.
// Re-checks every 30 seconds and whenever the tab becomes visible again.
export default function useTimeOfDay() {
  const [phase, setPhase] = useState(now);
  useEffect(() => {
    const update = () => setPhase(now());
    const id = setInterval(update, 30_000);
    document.addEventListener("visibilitychange", update);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return phase;
}