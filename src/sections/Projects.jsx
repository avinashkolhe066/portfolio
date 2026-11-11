import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Upload, Search, Brain, BadgeCheck, ScanText, Fingerprint, FileSearch, ArrowUpRight, Layers } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "../data/portfolio";
import { canHover } from "../lib/scrollTo";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import ProjectModal from "../components/ui/ProjectModal";
import { techIcon } from "../components/ui/TechChip";

const img = (f) => `${import.meta.env.BASE_URL}projects/${f}`;

// Per project, in the same order as portfolio.js.
// image: file in public/projects. tag: small label on the open panel. flow: steps shown in the popup.
const meta = [
  {
    image: img("agentic.webp"),
    pos: "50% 45%",
    tag: "AI ENGINEERING",
    alt: "Agentic AI diagram: goal setting, reasoning, action, feedback and memory around a central AI core",
    flow: [["Upload document", Upload], ["Retrieve context", Search], ["Agentic LLM (Ollama / Gemini)", Brain], ["Cited answer or quiz", BadgeCheck]],
  },
  {
    image: img("eduverify.webp"),
    pos: "50% 38%",
    tag: "COMPUTER VISION",
    alt: "A magnifying glass with a glowing check mark over verified documents",
    flow: [["Handwriting OCR (TrOCR)", ScanText], ["Authenticity (DINOv2)", Fingerprint], ["Plagiarism (ChromaDB)", FileSearch]],
  },
];

const pad = (n) => String(n + 1).padStart(2, "0");

function Panel({ p, m, i, active, onActivate, onOpen }) {
  const [broken, setBroken] = useState(false); // if the image file is missing, show a gradient instead of a broken icon

  return (
    <div
      onMouseEnter={() => canHover && onActivate()}
      className={`relative min-w-0 overflow-hidden rounded-3xl border border-line bg-[#050a1f] transition-[height] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
        active ? "h-[33rem] sm:h-[28rem]" : "h-[5.25rem] sm:h-24"
      }`}
    >
      {/* background image: grey and dim when closed, full color when open */}
      {broken ? (
        <div className="absolute inset-0 bg-gradient-to-br from-accent/50 to-[#050a1f]" />
      ) : (
        <img
          src={m.image}
          alt={active ? m.alt : ""}
          loading="lazy"
          decoding="async"
          onError={() => setBroken(true)}
          style={{ objectPosition: m.pos }}
          className={`absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-500 ${active ? "scale-100" : "scale-105 brightness-50 grayscale"}`}
        />
      )}
      <div className={`absolute inset-0 transition-opacity duration-500 ${active ? "bg-gradient-to-t from-black/95 via-black/75 via-50% to-black/10 opacity-100" : "bg-black/30 opacity-100"}`} />

      {/* CLOSED: one horizontal bar with number, title and arrow */}
      {!active && (
        <button onClick={onActivate} aria-label={`Show ${p.title}`} className="absolute inset-0 z-10 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent">
          <span className="flex h-full items-center gap-3 px-5 sm:gap-5 sm:px-8">
            <span className="font-mono text-sm text-white/70">{pad(i)}</span>
            <span className="flex-1 text-left text-lg font-semibold sm:text-2xl">{p.title}</span>
            <span className="hidden text-sm text-white/60 sm:inline">{m.tag}</span>
            <ArrowUpRight size={22} className="text-white/80" />
          </span>
        </button>
      )}

      {/* OPEN: details */}
      <div
        className={`absolute inset-x-0 bottom-0 z-10 p-5 text-white transition-all duration-500 sm:p-8 ${
          active ? "translate-y-0 opacity-100 delay-150" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        aria-hidden={!active}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-white px-2 py-1 font-mono text-xs font-semibold text-black">{pad(i)}</span>
          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-[11px] tracking-wider">{m.tag}</span>
          <span className="ml-auto text-xs text-white/70">{p.year}</span>
        </div>

        <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{p.title}</h3>
        <p className="mt-2 line-clamp-3 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-lg sm:line-clamp-none">
          {p.subtitle}. {p.points[0]}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
          {p.stack.map((s) => {
            const [Icon, color] = techIcon(s, Layers);
            return (
              <span key={s} className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-black/35 px-2 py-1 text-[11px] sm:px-2.5 sm:text-xs">
                <Icon size={13} color={color && color !== "currentColor" ? color : undefined} className="shrink-0" />
                {s}
              </span>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            tabIndex={active ? 0 : -1}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 active:scale-95"
          >
            <FaGithub size={16} /> Code
          </a>
          <button
            onClick={onOpen}
            tabIndex={active ? 0 : -1}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-5 py-3 text-sm font-semibold transition hover:bg-black/60 active:scale-95"
          >
            View Details <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState(0); // which panel is open
  const [open, setOpen] = useState(null); // which project is shown in the popup
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        title={<>Selected <span className="text-muted">Works</span></>}
        sub={canHover ? "Hover to expand" : "Tap to expand"}
      />
      <Reveal>
        <div className="flex flex-col gap-3">
          {projects.map((p, i) => (
            <Panel key={p.title} p={p} m={meta[i]} i={i} active={active === i} onActivate={() => setActive(i)} onOpen={() => setOpen(i)} />
          ))}
        </div>
      </Reveal>

      <AnimatePresence>
        {open !== null && <ProjectModal project={projects[open]} flow={meta[open].flow} image={meta[open].image} alt={meta[open].alt} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
