import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Search } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { profile } from "../../data/portfolio";
import { scrollToId } from "../../lib/scrollTo";

const sections = [
  ["home", "Home"],
  ["about", "About"],
  ["education", "Education and skills"],
  ["projects", "Projects"],
  ["achievements", "Achievements"],
  ["contact", "Contact"],
];
const themes = [
  ["light", "Light"],
  ["dark", "Dark"],
  ["live", "Live (time of day)"],
];

// Press Ctrl+K (or Cmd+K on Mac) anywhere to open it.
export default function CommandPalette() {
  const { setMode } = useTheme();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);

  const commands = [
    ...sections.map(([id, label]) => ({ group: "Go to", label, run: () => scrollToId(id) })),
    ...themes.map(([m, label]) => ({ group: "Theme", label: `${label} mode`, run: () => setMode(m) })),
    { group: "Links", label: "Open GitHub", run: () => window.open(profile.github, "_blank", "noreferrer") },
    { group: "Links", label: "Open LinkedIn", run: () => window.open(profile.linkedin, "_blank", "noreferrer") },
    {
      group: "Links",
      label: "Download CV",
      run: () => {
        const a = document.createElement("a");
        a.href = profile.resume;
        a.download = "";
        a.click();
      },
    },
    { group: "Links", label: "Send an email", run: () => (window.location.href = `mailto:${profile.email}`) },
    { group: "Links", label: "Copy email address", run: () => navigator.clipboard?.writeText(profile.email) },
  ];
  const results = commands.filter((c) => `${c.group} ${c.label}`.toLowerCase().includes(q.toLowerCase()));

  const close = () => {
    setOpen(false);
    setQ("");
    setIdx(0);
  };
  const run = (c) => {
    close();
    setTimeout(() => c?.run(), 150);
  };

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") close();
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") run(results[idx]);
  };

  return (
    <AnimatePresence>
      {open && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/40 px-4 pt-[12vh] sm:pt-[18vh]"
        >
          <m.div
            role="dialog"
            aria-label="Quick menu"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -16, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -16, scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-card shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={18} className="text-muted" />
              <input
                autoFocus
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setIdx(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Jump to a section, switch theme, open a link"
                className="w-full bg-transparent py-4 text-base outline-none placeholder:text-muted"
              />
            </div>
            <ul data-lenis-prevent className="max-h-[50vh] overflow-y-auto overscroll-contain p-2">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-muted">No match. Try "projects" or "dark".</li>
              )}
              {results.map((c, i) => (
                <li key={c.group + c.label}>
                  <button
                    onClick={() => run(c)}
                    onMouseEnter={() => setIdx(i)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-colors ${
                      i === idx ? "bg-accent/15 text-accent" : ""
                    }`}
                  >
                    <span>{c.label}</span>
                    <span className="text-xs text-muted">{c.group}</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="hidden border-t border-line px-4 py-2 text-xs text-muted sm:block">
              Arrow keys to move, Enter to select, Esc to close
            </p>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}