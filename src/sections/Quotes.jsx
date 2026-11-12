import { useEffect, useRef, useState } from "react";

// [quote, author, word to highlight]. Add, remove or reorder freely.
const quotes = [
  ["Success is the result of perfection, hard work, learning from failure, loyalty, and persistence.", "Colin Powell", "Success"],
  ["Talk is cheap. Show me the code.", "Linus Torvalds", "code"],
  ["Make it work, make it right, make it fast.", "Kent Beck", "work"],
  ["Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", "Martin Fowler", "humans"],
  ["Programs must be written for people to read, and only incidentally for machines to execute.", "Harold Abelson", "people"],
  ["The best way to predict the future is to invent it.", "Alan Kay", "invent"],
  ["Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.", "Antoine de Saint-Exupéry", "Perfection"],
  ["Premature optimization is the root of all evil.", "Donald Knuth", "optimization"],
  ["Don't comment bad code. Rewrite it.", "Brian Kernighan", "Rewrite"],
  ["It always seems impossible until it's done.", "Nelson Mandela"],
  ["Great things are done by a series of small things brought together.", "Vincent van Gogh"],
  ["First, solve the problem; then, write the code.", "John Johnson"],
  ["Experience is the name everyone gives to their mistakes.", "Oscar Wilde"],
  ["Learning never exhausts the mind.", "Leonardo da Vinci"],
  ["Action is the foundational key to all success.", "Pablo Picasso"],
  ["Believe you can and you're halfway there.", "Theodore Roosevelt"],
  ["It does not matter how slowly you go as long as you do not stop.", "Confucius"],
  ["Well done is better than well said.", "Benjamin Franklin"],
  ["Failure is simply the opportunity to begin again, this time more intelligently.", "Henry Ford"],
  ["Simplicity is prerequisite for reliability.", "Edsger W. Dijkstra"],
  ["The most damaging phrase in the language is, 'We've always done it this way.'", "Grace Hopper"],
  ["The secret of getting ahead is getting started.", "Mark Twain"],
  ["Stay hungry, stay foolish.", "Steve Jobs"],
  ["Innovation distinguishes between a leader and a follower.", "Steve Jobs"],
  ["Your limitation—it's only your imagination.", "Unknown"],
  ["Dream big. Start small. Act now.", "Robin Sharma"],
  ["Don't let yesterday take up too much of today.", "Will Rogers"],
  ["Great things never come from comfort zones.", "Unknown"],
  ["The harder you work for something, the greater you'll feel when you achieve it.", "Unknown"],
  ["Success is not final, failure is not fatal: it is the courage to continue that counts.", "Winston Churchill"],
  ["If you get tired, learn to rest, not to quit.", "Banksy"],
  ["Code is like humor. When you have to explain it, it's bad.", "Cory House"],
  ["Simplicity is the ultimate sophistication.", "Leonardo da Vinci"],
  ["The only way to do great work is to love what you do.", "Steve Jobs"],
];

const HOLD_MS = 5000; // how long a finished quote stays on screen
const FADE_MS = 600; // fade-out before the next quote starts typing
const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const textCls = "col-start-1 row-start-1 text-lg font-semibold leading-snug tracking-tight sm:text-2xl md:text-[1.7rem]";

// Types the quote one character at a time, waits 2 seconds, fades out, then moves to the next one.
export default function Quotes() {
  const [i, setI] = useState(0); // current quote
  const [n, setN] = useState(0); // characters shown so far
  const [phase, setPhase] = useState("typing"); // typing -> hold -> fade -> next quote
  const [inView, setInView] = useState(false);
  const box = useRef(null);

  // Only run while the section is on screen (no wasted work, and you see it start from the first letter)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(box.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const text = quotes[i][0];
    let t;
    if (phase === "typing") {
      if (reduced) {
        setN(text.length);
        setPhase("hold");
      } else if (n < text.length) {
        const pause = n > 0 && ",.;".includes(text[n - 1]); // small pause after punctuation, like real typing
        t = setTimeout(() => setN(n + 1), pause ? 220 : 28 + Math.random() * 26);
      } else {
        setPhase("hold");
      }
    } else if (phase === "hold") {
      t = setTimeout(() => setPhase("fade"), HOLD_MS);
    } else {
      t = setTimeout(() => {
        setI((i + 1) % quotes.length);
        setN(0);
        setPhase("typing");
      }, FADE_MS);
    }
    return () => clearTimeout(t);
  }, [inView, i, n, phase]);

  const [text, who, hl] = quotes[i];
  const typed = text.slice(0, n);
  const s = text.indexOf(hl);
  const e = s + hl.length;
  const done = phase !== "typing";

  return (
    <section ref={box} aria-label="Words to build by" className="mx-auto max-w-3xl overflow-x-clip px-5 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20">
      <style>{`@keyframes quote-caret{50%{opacity:0}}`}</style>

      <div className="relative px-3 py-8 text-center sm:px-12 sm:py-10">
        {/* soft color blobs and corner brackets */}
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full" style={{ background: "radial-gradient(circle, rgb(var(--accent) / 0.12), transparent 65%)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full" style={{ background: "radial-gradient(circle, rgb(var(--accent) / 0.1), transparent 65%)" }} />
        <span aria-hidden className="absolute left-0 top-0 h-6 w-6 rounded-tl-xl border-l-2 border-t-2 border-accent/70 sm:h-9 sm:w-9" />
        <span aria-hidden className="absolute bottom-0 right-0 h-6 w-6 rounded-br-xl border-b-2 border-r-2 border-accent/70 sm:h-9 sm:w-9" />

        <div className={`relative transition-opacity duration-500 ${phase === "fade" ? "opacity-0" : "opacity-100"}`}>
          <div className="mx-auto mb-4 grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent sm:mb-5 sm:h-11 sm:w-11">
            <span aria-hidden className="font-serif text-4xl font-bold not-italic leading-none sm:text-5xl" style={{ transform: "translateY(0.12em)" }}>“</span>
          </div>

          <p className="sr-only">{text} — {who}</p>

          {/* All quotes sit invisibly in one grid cell, so the box is always as tall as the longest one: no jumping while typing */}
          <div className="grid" aria-hidden>
            {quotes.map(([t], k) => (
              <p key={k} className={`${textCls} invisible`}>{t}</p>
            ))}
            <p className={`${textCls} self-center text-fg`}>
              {typed.slice(0, Math.min(n, s))}
              {n > s && <span className="text-accent">{typed.slice(s, e)}</span>}
              {n > e && typed.slice(e)}
              <span className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] bg-accent" style={{ animation: "quote-caret 1s steps(1) infinite" }} />
            </p>
          </div>

          {/* underline and author appear once the quote has finished typing */}
          <div className={`mt-5 transition-opacity duration-500 sm:mt-6 ${done ? "opacity-100" : "opacity-0"}`}>
            <span className="mx-auto block h-0.5 w-10 rounded-full bg-accent" />
            <p className="mt-3 text-sm text-muted sm:text-base">— {who}</p>
          </div>
        </div>
      </div>
    </section>
  );
}