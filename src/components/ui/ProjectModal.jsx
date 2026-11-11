import { useEffect, useRef } from "react";
import { m } from "framer-motion";
import { X, ChevronRight, CalendarDays, Check, Layers } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { techIcon } from "./TechChip";

// Centered popup with the big image and the project details.
// It uses its own solid dark colors, so it looks the same in Light, Dark and Live themes.
export default function ProjectModal({ project: p, flow, image, alt, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const opener = document.activeElement; // give focus back to the button that opened the popup
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    // Freeze the page behind the popup (including the desktop smooth-scroll)
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.__lenis?.stop();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
      window.__lenis?.start();
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[65] flex items-center justify-center bg-black/75 p-3 sm:p-6"
    >
      <m.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 14 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90svh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b1020] text-white shadow-2xl"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X size={20} />
        </button>

        {/* data-lenis-prevent keeps wheel scrolling inside the popup on desktop */}
        <div data-lenis-prevent className="overflow-y-auto overscroll-contain">
          <div className="bg-[#050a1f]">
            <img src={image} alt={alt} className="mx-auto block max-h-[40svh] w-auto max-w-full" decoding="async" />
          </div>

          <div className="p-5 sm:p-8">
            <p className="font-mono text-[11px] tracking-[0.25em] text-blue-400">PROJECT DETAILS</p>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <h3 id="project-modal-title" className="text-2xl font-bold tracking-tight sm:text-4xl">
                {p.title}
              </h3>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/70">
                <CalendarDays size={13} /> {p.year}
              </span>
            </div>
            <p className="mt-1 text-base text-white/70 sm:text-lg">{p.subtitle}</p>

            <p className="mt-6 font-mono text-[11px] tracking-[0.25em] text-white/50">HOW IT WORKS</p>
            <div className="mt-3 flex flex-wrap items-center gap-y-2 text-[13px] sm:text-sm">
              {flow.map(([label, Icon], i) => (
                <span key={label} className="flex items-center gap-1.5 pr-1.5">
                  <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-white/80">
                    <Icon size={14} className="shrink-0 text-blue-400" />
                    {label}
                  </span>
                  {i < flow.length - 1 && <ChevronRight size={14} className="text-white/40" />}
                </span>
              ))}
            </div>

            <ul className="mt-6 space-y-3 text-[15px] text-white/75 sm:text-base">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-500/20 text-blue-400">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((s) => {
                const [Icon, color] = techIcon(s, Layers);
                return (
                  <span key={s} className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-xs sm:text-[13px]">
                    <Icon size={14} color={color && color !== "currentColor" ? color : undefined} className="shrink-0" />
                    {s}
                  </span>
                );
              })}
            </div>

            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 active:scale-95 sm:w-auto"
            >
              <FaGithub size={16} /> View source
            </a>
          </div>
        </div>
      </m.div>
    </m.div>
  );
}
