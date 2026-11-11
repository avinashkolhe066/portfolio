import { projects } from "../../data/portfolio";
import { scrollToId } from "../../lib/scrollTo";

// Shows the first project in portfolio.js whose year says "In progress".
export default function NowBuilding() {
  const p = projects.find((x) => /in progress/i.test(x.year));
  if (!p) return null;
  return (
    <button
      onClick={() => scrollToId("projects")}
      className="inline-flex items-center gap-3 rounded-full border border-line bg-card/80 px-4 py-2 text-sm transition-colors hover:border-accent"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
      </span>
      <span className="text-muted">Now building</span>
      <span className="font-medium">{p.title}</span>
      <span className="hidden text-muted sm:inline">{p.subtitle}</span>
    </button>
  );
}