import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { Eye } from "lucide-react";

// Free counter service with no signup (abacus.jasoncameron.dev).
// To start from zero before launch, change KEY (for example "visitors-launch").
const BASE = "https://abacus.jasoncameron.dev";
const NAMESPACE = "avinashkolhe-portfolio";
const KEY = "visitors";
const FLAG = "visit-counted-v2";
const REFRESH_MS = 15_000; // how often the number is re-checked while the page is open

let request; // one request per page load, even in React dev mode

const call = async (path) => {
  const res = await fetch(`${BASE}/${path}/${NAMESPACE}/${KEY}`);
  if (!res.ok) throw new Error(`counter returned ${res.status}`);
  const n = Number((await res.json())?.value);
  if (!Number.isFinite(n)) throw new Error("unexpected counter response");
  return n;
};

const load = () =>
  (request ||= (async () => {
    let counted = false;
    try { counted = localStorage.getItem(FLAG) === "1"; } catch { /* ignore */ }
    let n;
    if (counted) {
      try { n = await call("get"); } catch { n = await call("hit"); } // "get" fails if the counter doesn't exist yet
    } else {
      n = await call("hit"); // first visit from this browser: count it
      try { localStorage.setItem(FLAG, "1"); } catch { /* ignore */ }
    }
    return n;
  })());

// Rolls smoothly from the old number to the new one
function LiveNumber({ value }) {
  const ref = useRef(null);
  const prev = useRef(0);
  useEffect(() => {
    const controls = animate(prev.current, value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toLocaleString();
      },
    });
    prev.current = value;
    return () => controls.stop();
  }, [value]);
  return <span ref={ref}>0</span>;
}

export default function VisitorCounter() {
  const [state, setState] = useState({ status: "loading", n: 0 });

  // First load (counts this visit once per browser)
  useEffect(() => {
    let alive = true;
    load()
      .then((n) => alive && setState({ status: "ok", n }))
      .catch((err) => {
        console.error("Visitor counter:", err);
        if (alive) setState({ status: "error", n: 0 });
      });
    return () => { alive = false; };
  }, []);

  // Live updates: re-read the number every few seconds and when you return to the tab
  useEffect(() => {
    if (state.status !== "ok") return;
    const tick = () => {
      if (document.hidden) return;
      call("get")
        .then((n) => setState((s) => ({ ...s, n: Math.max(s.n, n) })))
        .catch(() => {});
    };
    const id = setInterval(tick, REFRESH_MS);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [state.status]);

  // Visitors see nothing if the service is down; in development you see a hint.
  if (state.status === "error" && !import.meta.env.DEV) return null;

  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card/60 px-4 py-1.5 text-sm text-muted">
      <Eye size={16} className="text-accent" />
      {state.status === "loading" && "Counting visitors..."}
      {state.status === "error" && "Visitor count unavailable (see browser console)"}
      {state.status === "ok" && (
        <>
          <span className="font-semibold text-fg">
            <LiveNumber value={state.n} />
          </span>
          visitors so far
          <span className="relative ml-1 flex h-2 w-2" title="Updates live">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
        </>
      )}
    </p>
  );
}