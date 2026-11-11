import { ArrowUp, Command } from "lucide-react";
import { profile } from "../data/portfolio";
import { scrollToTop } from "../lib/scrollTo";
import VisitorCounter from "../components/layout/VisitorCounter";
import Quotes from "./Quotes";

export default function Footer() {
  return (
    <>
      <Quotes />
      <footer className="mx-auto flex max-w-5xl flex-col gap-5 border-t border-line px-5 pb-28 pt-8 text-sm text-muted sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-6">
        <div className="space-y-3">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind and Framer Motion.
          </p>
          {/* Visitor count: needs the new VisitorCounter.jsx (the old counter service was shut down) */}
          <VisitorCounter />
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => window.dispatchEvent(new Event("open-palette"))}
            className="flex items-center gap-2 transition-colors hover:text-fg"
          >
            <Command size={16} /> Quick menu<span className="hidden sm:inline"> (Ctrl K)</span>
          </button>
          <button onClick={scrollToTop} className="flex items-center gap-2 transition-colors hover:text-fg">
            Back to top <ArrowUp size={16} />
          </button>
        </div>
      </footer>
    </>
  );
}