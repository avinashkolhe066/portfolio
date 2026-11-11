import { useState } from "react";
import { Mail, Phone, MapPin, Copy, Check, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "../data/portfolio";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";

const KEY = import.meta.env.VITE_WEB3FORMS_KEY; // set in .env (see steps)

const field =
  "block w-full min-w-0 rounded-2xl border border-line bg-card/80 px-4 py-3 text-base outline-none transition-colors focus:border-accent";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard blocked */ }
  };

  // Sends the message to your inbox through Web3Forms. Without a key it falls back to opening the visitor's email app.
  const submit = async (e) => {
    e.preventDefault();
    if (!KEY) {
      if (import.meta.env.DEV) {
        setStatus("nokey"); // tells you while developing that the key is missing
        return;
      }
      const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: KEY,
          subject: `Portfolio message from ${form.name}`,
          from_name: "Portfolio website",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        console.error("Web3Forms said:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("Could not reach Web3Forms:", err);
      setStatus("error");
    }
  };

  const links = [
    { Icon: Phone, short: "Call", text: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { Icon: FaLinkedin, short: "LinkedIn", text: "LinkedIn", href: profile.linkedin },
    { Icon: FaGithub, short: "GitHub", text: "GitHub", href: profile.github },
  ];

  return (
    <section id="contact" className="mx-auto max-w-5xl px-5 py-16 sm:px-6 sm:py-24">
      <SectionHeading title="Let's work together" sub="Let's build something impactful together in software and AI. Send a message and I'll reply soon." />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <Reveal className="min-w-0 space-y-3 md:space-y-5">
          <div className="flex items-center gap-3 rounded-2xl border border-line bg-card/80 py-3 pl-4 pr-2">
            <Mail className="shrink-0 text-accent" size={20} />
            <a href={`mailto:${profile.email}`} className="min-w-0 flex-1 break-all text-[15px] leading-snug hover:text-accent sm:text-base">
              {profile.email}
            </a>
            <button onClick={copy} aria-label="Copy email address" className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-line">
              {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-1 md:gap-5">
            {links.map(({ Icon, short, text, href }) => (
              <a
                key={text}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex min-w-0 flex-col items-center justify-center gap-1.5 rounded-2xl border border-line bg-card/80 px-2 py-3.5 text-sm transition-colors hover:border-accent active:border-accent md:flex-row md:justify-start md:gap-3 md:p-4 md:text-base"
              >
                <Icon className="shrink-0 text-accent" size={20} />
                <span className="md:hidden">{short}</span>
                <span className="hidden md:inline">{text}</span>
              </a>
            ))}
          </div>
          <p className="flex items-center gap-3 px-1 pt-1 text-muted md:pt-0">
            <MapPin size={18} className="text-accent" /> {profile.location}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={submit} className="min-w-0 space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm text-muted">Your name</span>
              <input required autoComplete="name" value={form.name} onChange={set("name")} className={field} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm text-muted">Your email</span>
              <input required type="email" inputMode="email" autoComplete="email" value={form.email} onChange={set("email")} className={field} />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm text-muted">Message</span>
              <textarea required rows={4} value={form.message} onChange={set("message")} className={field} />
            </label>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-fg px-7 py-3.5 text-sm font-semibold text-bg transition hover:opacity-90 active:scale-95 disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? "Sending..." : "Send message"} <Send size={16} />
            </button>
            {status === "sent" && (
              <p role="status" className="break-words text-sm sm:text-base text-emerald-500">
                Thanks! Your message was sent. I'll reply to your email soon.
              </p>
            )}
            {status === "nokey" && (
              <p role="alert" className="break-words text-sm sm:text-base text-amber-500">
                Developer note: the Web3Forms key was not found. Put a .env file next to package.json containing
                VITE_WEB3FORMS_KEY=your-key, then stop and restart npm run dev.
              </p>
            )}
            {status === "mailto" && (
              <p className="break-words text-sm sm:text-base text-muted">If your email app didn't open, please write to {profile.email}.</p>
            )}
            {status === "error" && (
              <p role="alert" className="break-words text-sm sm:text-base text-red-500">
                Couldn't send that. Please email me directly at {profile.email}.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}