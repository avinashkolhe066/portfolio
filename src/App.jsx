import { useState } from "react";
import { LazyMotion } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import useSmoothScroll from "./hooks/useSmoothScroll";
import LiveScene from "./components/background/LiveScene";
import Dock from "./components/layout/Dock";
import Preloader from "./components/layout/Preloader";
import ScrollProgress from "./components/layout/ScrollProgress";
import CustomCursor from "./components/layout/CustomCursor";
import CommandPalette from "./components/layout/CommandPalette";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Education from "./sections/Education";
import Projects from "./sections/Projects";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const loadFeatures = () => import("./lib/motionFeatures").then((m) => m.default);

function Shell() {
  const [ready, setReady] = useState(false);
  useSmoothScroll();
  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <ScrollProgress />
      <CustomCursor />
      <CommandPalette />
      <LiveScene />
      <main>
        {ready && <Hero />}
        <About />
        <Education />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      {ready && <Dock />}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LazyMotion features={loadFeatures}>
        <Shell />
      </LazyMotion>
    </ThemeProvider>
  );
}
