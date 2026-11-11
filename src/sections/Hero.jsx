import { m } from "framer-motion";
import { Download, ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "../data/portfolio";
import { scrollToId } from "../lib/scrollTo";
import MagneticButton from "../components/ui/MagneticButton";
import TypingText from "../components/ui/TypingText";
import HeroBackground from "../components/background/HeroBackground";
import ToolsMarquee from "../components/ui/ToolsMarquee";

const headline = [{ t: "Building" }, { t: "Intelligent", serif: true }, { t: "Systems" }];
const socials = [
  [FaGithub, "GitHub", profile.github],
  [FaLinkedin, "LinkedIn", profile.linkedin],
  [Mail, "Email", `mailto:${profile.email}`],
];

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh flex-col items-center justify-center px-5 pb-28 pt-14 text-center sm:px-6">
      <HeroBackground />
      <div className="mb-6 flex animate-[fadeIn_0.6s_ease-out_both] items-center gap-2 rounded-full border border-line bg-card/80 px-3.5 py-1.5 text-xs text-muted sm:mb-8 sm:px-4 sm:text-sm">
        <span className="h-2 w-2 rounded-full bg-emerald-500" /> Always Building, Always Learning
      </div>

      <h1 className="max-w-5xl text-[2.6rem] font-semibold leading-[1.1] tracking-tight min-[400px]:text-5xl sm:text-7xl lg:text-8xl">
        {headline.map((w, k) => (
          <span key={w.t} className="mr-2.5 inline-block overflow-hidden pb-2 align-bottom sm:mr-5">
            <m.span
              className={`inline-block ${w.serif ? "font-serif font-bold italic text-accent" : ""}`}
              initial={{ y: "110%" }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 + k * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {w.t}
            </m.span>
          </span>
        ))}
      </h1>

      <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}
        className="mt-6 max-w-2xl space-y-2 text-base text-muted sm:mt-8 sm:text-lg">
        <p className="min-h-[3.25rem] sm:min-h-0">
          I'm <span className="font-medium text-fg">{profile.firstName}</span>, a{" "}
          <span className="font-medium text-fg"><TypingText words={profile.roles} /></span>
        </p>
        <p>{profile.intro}</p>
        <p className="font-serif italic">{profile.accentLine}</p>
      </m.div>

      <div className="mt-8 flex w-full max-w-sm animate-[fadeIn_0.6s_0.7s_ease-out_both] flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
        <MagneticButton href="#contact" onClick={(e) => { e.preventDefault(); scrollToId("contact"); }} className="bg-fg text-bg hover:opacity-90 sm:px-7">
          Get in touch <ArrowRight size={16} />
        </MagneticButton>
        <MagneticButton href={profile.resume} download className="border border-line bg-card/80 text-fg hover:bg-card sm:px-7">
          Download CV <Download size={16} />
        </MagneticButton>
      </div>

      <div className="mt-8 flex animate-[fadeIn_0.6s_0.85s_ease-out_both] items-center gap-3 sm:mt-10">
        {socials.map(([Icon, name, href]) => (
          <a
            key={name}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={name}
            title={name}
            className="grid h-12 w-12 place-items-center rounded-full border border-line bg-card/80 text-muted transition hover:-translate-y-1.5 hover:scale-110 hover:border-accent hover:text-accent active:scale-95"
          >
            <Icon size={20} />
          </a>
        ))}
      </div>

      <div className="-mx-5 mt-10 animate-[fadeIn_0.6s_1s_ease-out_both] self-stretch sm:-mx-6 sm:mt-12">
        <ToolsMarquee />
      </div>
    </section>
  );
}
