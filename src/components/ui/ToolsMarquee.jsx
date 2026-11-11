import { memo } from "react";
import { Brain, Search, Database, Bot, Sparkles, Eye, FileText } from "lucide-react";
import {
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiPython, SiFastapi,
  SiJavascript, SiGit, SiGithub, SiSocketdotio, SiStripe,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

// [Icon, label, color]. Edit these two lists to change what scrolls by.
const stack = [
  [SiReact, "React", "#61DAFB"], [SiNodedotjs, "Node.js", "#5FA04E"], [SiExpress, "Express", "currentColor"],
  [SiMongodb, "MongoDB", "#47A248"], [SiPython, "Python", "#3776AB"], [SiFastapi, "FastAPI", "#009688"],
  [SiJavascript, "JavaScript", "#F7DF1E"], [FaJava, "Java", "#E76F00"], [Database, "SQL", "currentColor"],
  [SiGit, "Git", "#F05032"], [SiGithub, "GitHub", "currentColor"], [SiSocketdotio, "Socket.IO", "currentColor"],
  [SiStripe, "Stripe", "#635BFF"],
];
const A = "rgb(var(--accent))";
const ai = [
  [Bot, "Agentic AI", A], [Search, "RAG", A], [Brain, "LLM Orchestration", A],
  [Sparkles, "Prompt Engineering", A], [Search, "Semantic Search", A],
  [Database, "Vector Embeddings", A], [FileText, "OCR (TrOCR)", A],
  [Eye, "Computer Vision (DINOv2)", A], [Database, "ChromaDB", A],
  [Bot, "Ollama", A], [Sparkles, "Gemini API", A],
];

const fade = "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)";

// Pure CSS animation (transform only): runs on the GPU with no JavaScript per frame.
const Row = memo(function Row({ items, reverse = false, duration }) {
  const loop = [...items, ...items]; // doubled so the loop is seamless
  return (
    <div className="overflow-hidden py-1" style={{ maskImage: fade, WebkitMaskImage: fade }}>
      <div
        className="flex w-max gap-3 pr-3 will-change-transform animate-marquee motion-reduce:animate-none"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {loop.map(([Icon, name, color], i) => (
          <span key={name + i} className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-card/80 px-3.5 py-2 text-sm">
            <Icon size={16} color={color} />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
});

export default function ToolsMarquee() {
  return (
    <div className="space-y-3">
      <Row items={stack} duration={45} />
      <Row items={ai} reverse duration={55} />
    </div>
  );
}
