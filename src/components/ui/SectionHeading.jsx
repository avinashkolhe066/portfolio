import Reveal from "./Reveal";

export default function SectionHeading({ title, sub }) {
  return (
    <Reveal className="mb-8 max-w-2xl sm:mb-12">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-3 text-base text-muted sm:text-lg">{sub}</p>}
    </Reveal>
  );
}
