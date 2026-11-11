import { Award, Code2, Layers, Brain, Boxes, Server, GitBranch } from "lucide-react";
import { skills, certifications } from "../data/portfolio";
import Reveal from "../components/ui/Reveal";
import TechChip from "../components/ui/TechChip";

// Icon for each skill group (keys match src/data/portfolio.js)
const groupIcons = {
  Languages: Code2,
  "Web stack (MERN)": Layers,
  "AI / ML engineering": Brain,
  "Software engineering": Boxes,
  "Backend & databases": Server,
  "Development practices": GitBranch,
};

export default function Skills() {
  return (
    <div className="mt-16 sm:mt-24">
      <Reveal>
        <h3 className="mb-6 text-xl font-semibold sm:mb-8 sm:text-2xl">What I work with</h3>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
        {Object.entries(skills).map(([group, items], gi) => {
          const GroupIcon = groupIcons[group] || Code2;
          return (
            <Reveal key={group} delay={gi * 0.04} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card/80 p-5 transition-colors hover:border-accent/50 sm:p-6">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-60 transition-opacity group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle, rgb(var(--accent) / 0.14), transparent 65%)" }}
                />
                <div className="relative mb-4 flex items-center gap-3 sm:mb-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <GroupIcon size={20} />
                  </span>
                  <h4 className="flex-1 font-semibold">{group}</h4>
                  <span className="rounded-full bg-line/70 px-2 py-0.5 text-xs text-muted">{items.length}</span>
                </div>
                <div className="relative flex flex-wrap gap-2">
                  {items.map((s) => (
                    <TechChip key={s} name={s} fallback={GroupIcon} />
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-12 sm:mt-16">
        <h3 className="mb-5 text-xl font-semibold sm:mb-6 sm:text-2xl">Certifications</h3>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {certifications.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05} className="h-full">
            <div className="flex h-full items-start gap-4 rounded-3xl border border-line bg-card/80 p-5 transition-colors hover:border-accent/50 sm:p-6">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                <Award size={20} />
              </span>
              <div className="min-w-0">
                <p className="font-semibold">{c.title}</p>
                <p className="text-muted">{[c.by, c.date].filter(Boolean).join(", ")}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
