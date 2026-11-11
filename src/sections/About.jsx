import { useState } from "react";
import { MapPin } from "lucide-react";
import { profile } from "../data/portfolio";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import TiltCard from "../components/ui/TiltCard";
import NowBuilding from "../components/ui/NowBuilding";

export default function About() {
  const [broken, setBroken] = useState(false);

  return (
    <section id="about" className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-6 sm:py-24 md:min-h-screen md:grid-cols-2 md:gap-14">
      {/* The profile card is a dark artwork, so it keeps its own look in every theme mode */}
      <Reveal className="relative mx-auto w-full max-w-sm md:max-w-lg">
        <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-accent/20 md:-inset-6 md:bg-accent/25 md:blur-3xl" />
        <TiltCard max={5} className="overflow-hidden rounded-[1.5rem] border border-accent/40 bg-[#0a0a0e] shadow-xl sm:rounded-[2rem]">
          {broken ? (
            <div className="grid aspect-square place-items-center font-serif text-7xl italic text-accent">AK</div>
          ) : (
            <img
              src={profile.photo}
              alt="Avinash Kolhe, software developer profile card"
              width="1254"
              height="1254"
              loading="lazy"
              decoding="async"
              onError={() => setBroken(true)}
              className="block aspect-square w-full"
            />
          )}
        </TiltCard>
      </Reveal>

      <div>
        <SectionHeading title={`Hi, I'm ${profile.firstName}.`} />
        <Reveal delay={0.1}>
          <p className="max-w-prose text-base leading-relaxed text-muted sm:text-lg">{profile.summary}</p>
        </Reveal>
        <Reveal delay={0.15} className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-2 sm:gap-6">
          <div>
            <h3 className="mb-1.5 font-medium">Languages</h3>
            <p className="text-muted">{profile.languages.join(", ")}</p>
          </div>
          <div>
            <h3 className="mb-1.5 font-medium">Outside of code</h3>
            <p className="text-muted">{profile.interests.join(", ")}</p>
          </div>
        </Reveal>
        <Reveal delay={0.2} className="mt-6 flex items-center gap-2 text-muted sm:mt-8">
          <MapPin size={16} className="text-accent" /> {profile.location}
        </Reveal>
        <Reveal delay={0.25} className="mt-6 sm:mt-8">
          <NowBuilding />
        </Reveal>
      </div>
    </section>
  );
}
