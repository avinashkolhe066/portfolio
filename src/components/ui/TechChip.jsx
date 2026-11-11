import {
  Sparkles, Search, Brain, Eye, ScanText, Database, Network, Binary, Boxes, Lock, Plug, FlaskConical,
  Webhook, ShieldCheck, KeyRound, Building2, Zap, Timer, Gauge, ListTree, Workflow, Radio,
  ClipboardCheck, Bug, Repeat, RefreshCw, Layers,
} from "lucide-react";
import {
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiPython, SiFastapi, SiJavascript, SiGit,
  SiSocketdotio, SiStripe, SiOllama, SiGooglegemini,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

// [pattern, icon, brand color]. A null color means "use the theme accent". First match wins.
const rules = [
  [/mongodb/i, SiMongodb, "#47A248"],
  [/express/i, SiExpress, "currentColor"],
  [/react/i, SiReact, "#61DAFB"],
  [/node/i, SiNodedotjs, "#5FA04E"],
  [/fastapi/i, SiFastapi, "#009688"],
  [/python/i, SiPython, "#3776AB"],
  [/javascript/i, SiJavascript, "#F7DF1E"],
  [/\bjava\b/i, FaJava, "#E76F00"],
  [/\bsql\b/i, Database, null],
  [/\bgit\b|version control/i, SiGit, "#F05032"],
  [/socket/i, SiSocketdotio, "currentColor"],
  [/stripe/i, SiStripe, "#635BFF"],
  [/ollama/i, SiOllama, "currentColor"],
  [/gemini/i, SiGooglegemini, "#8E75B2"],
  [/trocr|\bocr\b/i, ScanText, null],
  [/dinov2|computer vision/i, Eye, null],
  [/chroma/i, Database, null],
  [/vector/i, Network, null],
  [/\brag\b|retrieval|semantic/i, Search, null],
  [/llm/i, Brain, null],
  [/prompt/i, Sparkles, null],
  [/\bdsa\b/i, Binary, null],
  [/\boop\b/i, Boxes, null],
  [/secure api/i, Lock, null],
  [/api integration/i, Plug, null],
  [/api testing|unit testing/i, FlaskConical, null],
  [/integration testing/i, ClipboardCheck, null],
  [/restful|rest api/i, Webhook, null],
  [/authentication/i, ShieldCheck, null],
  [/rbac/i, KeyRound, null],
  [/multi-tenant/i, Building2, null],
  [/event-driven/i, Zap, null],
  [/asynchronous/i, Timer, null],
  [/database design/i, Database, null],
  [/query/i, Gauge, null],
  [/indexing/i, ListTree, null],
  [/modell?ing/i, Workflow, null],
  [/real-time/i, Radio, null],
  [/debug/i, Bug, null],
  [/agile/i, Repeat, null],
  [/sdlc/i, RefreshCw, null],
  [/mern/i, Layers, null],
];

export function techIcon(name, Fallback = Sparkles) {
  const hit = rules.find(([re]) => re.test(name));
  return hit ? [hit[1], hit[2]] : [Fallback, null];
}

// A pill with a matching icon: brand logo for known tech, a themed line icon for concepts.
export default function TechChip({ name, fallback, className = "" }) {
  const [Icon, color] = techIcon(name, fallback);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/60 px-2.5 py-1.5 text-[13px] transition hover:-translate-y-0.5 hover:border-accent sm:gap-2 sm:px-3 sm:text-sm ${className}`}
    >
      <Icon size={15} color={color || undefined} className={color ? "shrink-0" : "shrink-0 text-accent"} />
      {name}
    </span>
  );
}
