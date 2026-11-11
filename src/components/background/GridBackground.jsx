import { useTheme } from "../../context/ThemeContext";

// The grid is gone. This now only draws the Tactical theme's glow and corner brackets.
const glow =
  "radial-gradient(ellipse at 85% 0%, rgb(230 57 53 / .2), transparent 55%), radial-gradient(ellipse at 0% 100%, rgb(60 100 160 / .16), transparent 55%), radial-gradient(ellipse at center, transparent 55%, rgb(0 0 0 / .55))";
const corners = [
  "left-4 top-4 border-l border-t",
  "right-4 top-4 border-r border-t",
  "bottom-4 left-4 border-b border-l",
  "bottom-4 right-4 border-b border-r",
];

export default function GridBackground() {
  const { mode } = useTheme();
  if (mode !== "tactical") return null;
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10" style={{ background: glow }} />
      {corners.map((c) => (
        <span key={c} aria-hidden className={`pointer-events-none fixed -z-10 h-8 w-8 border-accent/70 ${c}`} />
      ))}
    </>
  );
}