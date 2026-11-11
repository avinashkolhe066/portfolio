import { useRef } from "react";
import { m, useScroll } from "framer-motion";
import { education } from "../data/portfolio";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import Skills from "./Skills";

export default function Education() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });

  return (
    <section id="education" className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-24">
      <SectionHeading title="Education and knowledge" sub="Where I studied, and what I work with." />

      <div ref={ref} className="relative ml-3 border-l border-line pl-8 sm:ml-4 sm:pl-10">
        <m.div style={{ scaleY: scrollYProgress, originY: 0 }} className="absolute -left-px top-0 h-full w-px bg-accent will-change-transform" />
        {education.map((e, i) => (
          <Reveal key={e.degree} delay={i * 0.05} className="relative pb-10 last:pb-0 sm:pb-12">
            <span className="absolute -left-[2.75rem] top-1 grid h-6 w-6 place-items-center rounded-full border border-accent bg-bg sm:-left-[3.25rem]">
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>
            <p className="text-sm font-medium text-accent">{e.year}</p>
            <h3 className="mt-1 text-xl font-semibold sm:text-2xl">{e.degree}</h3>
            <p className="mt-1 text-muted">
              {e.school}, {e.board}
            </p>
            <span className="mt-3 inline-block rounded-full border border-line bg-card/80 px-3 py-1 text-sm">{e.score}</span>
          </Reveal>
        ))}
      </div>

      <Skills />
    </section>
  );
}
