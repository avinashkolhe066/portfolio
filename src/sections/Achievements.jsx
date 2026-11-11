import { Trophy, Flag, Users } from "lucide-react";
import { achievements, certifications, projects } from "../data/portfolio";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import TiltCard from "../components/ui/TiltCard";
import Counter from "../components/ui/Counter";

const icons = [Trophy, Flag, Users];
const stats = [
  { to: projects.length, label: "AI systems shipped" },
  { to: 2, label: "Competitions entered" },
  { to: certifications.length, label: "Certifications" },
  { to: 7.92, decimals: 2, label: "MCA SGPA so far" },
];

export default function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-24">
      <SectionHeading title="Achievements" sub="Competitions, hackathons and community." />

      <div className="mb-10 grid grid-cols-2 gap-5 sm:mb-12 sm:gap-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <p className="text-3xl font-semibold tracking-tight text-accent sm:text-5xl">
              <Counter to={s.to} decimals={s.decimals} />
            </p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {achievements.map((a, i) => {
          const Icon = icons[i];
          return (
            <Reveal key={a.title} delay={i * 0.06} className="h-full">
              <TiltCard className="h-full rounded-3xl border border-line bg-card/80 p-6 sm:p-7">
                <Icon className="text-accent" size={28} />
                <h3 className="mt-4 text-lg font-semibold sm:mt-5 sm:text-xl">{a.title}</h3>
                <p className="mt-2 text-muted">{a.detail}</p>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}