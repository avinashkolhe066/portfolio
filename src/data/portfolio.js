// Every piece of resume content lives here. Edit once, the whole site updates.
export const profile = {
  name: "Avinash Kolhe",
  firstName: "Avinash",
  roles: ["Full Stack Software Engineer", "AI / ML Engineer", "Agentic AI Developer", "RAG & LLM Builder"],
  intro:
    "I build intelligent, scalable applications using Agentic AI, computer vision and OCR, from the database to the interface.",
  accentLine: "First Runner-Up at the ICAIM GenAI competition.",
  summary:
    "Full-Stack software and AI/ML Engineer with hands-on experience building intelligent, scalable applications using Agentic AI, computer vision, and OCR. Skilled in the MERN stack, Python, FastAPI, and REST API development, with a strong ability to turn complex ideas into practical solutions. First Runner-Up at the ICAIM GenAI competition, driven by innovation, problem-solving, and continuous learning.",
  email: "avinashkolhe066@gmail.com",
  phone: "+91 93214 28153",
  location: "Mumbai, India",
  linkedin: "https://linkedin.com/in/avinash-kolhe-739224256",
  github: "https://github.com/avinashkolhe066",
  resume: "/Avinash_Kolhe_Resume.pdf",
  photo: "/avinash.webp",
  languages: ["English", "Marathi", "Hindi"],
  interests: ["Vibe Coding", "PC Gaming", "Traveling", "Trekking"],
};

export const education = [
  { degree: "Master of Computer Applications (MCA)", school: "Thakur Institute of Management Studies, Career Development & Research", board: "University of Mumbai", year: "2025 – 2027" },
  { degree: "Bachelor of Computer Application (BCA)", school: "Yashwantrao Chavan Maharashtra Open University", board: "YCMOU", year: "2022 - 2025" },
];

export const skills = {
  Languages: ["SQL", "JavaScript", "Python", "Java (DSA)"],
  "Web stack (MERN)": ["MongoDB", "Express.js", "React", "Node.js"],
  "AI / ML engineering": [
    "Retrieval-Augmented Generation (RAG)", "LLM Orchestration", "Semantic Search", "Vector Embeddings",
    "Prompt Engineering", "Computer Vision", "OCR",
  ],
  "Software engineering": [
    "DSA", "OOP", "RESTful API Design", "Authentication & Authorization", "RBAC",
    "Multi-Tenant Architecture", "Event-Driven Architecture", "Asynchronous Programming",
  ],
  "Backend & databases": [
    "Database Design", "Query Optimization", "Data Indexing", "Data Modelling", "API Integration",
    "Real-Time Communication", "Secure API Development", "Integration Testing",
  ],
  "Development practices": ["Git / Version Control", "Debugging", "Unit Testing", "API Testing", "Agile", "SDLC"],
};

export const certifications = [
  { title: "Generative AI Certification", by: "IBM", date: "February 2026" },
  { title: "The Joy of Computing Using Python", by: "NPTEL", date: "" },
  { title: "Cloud Computing", by: "NPTEL", date: "" },
];

export const projects = [
  {
    title: "Agentic AI",
    slug: "rag-platform", // screenshot file: public/projects/rag-platform.png
    subtitle: "AI document intelligence and operations system",
    year: "2026",
    repo: "https://github.com/avinashkolhe066/my_rag_project",
    stack: ["FastAPI", "Node.js", "React", "Ollama (Qwen2.5:7B)", "Gemini API", "Stripe"],
    points: [
      "Full-stack AI platform on React, Node.js, Express and Python FastAPI, with document Q&A across PDF, CSV, JSON and TXT.",
      "Agentic AI with Ollama (Qwen2.5:7B) and the Gemini API for document processing, citation-based responses and automated quiz generation.",
      "JWT auth, role-based access control, Cloudinary storage, Stripe payments, automated certificates and dynamic PDF reports through modular REST APIs.",
    ],
  },
  {
    title: "EduVerify",
    slug: "eduverify", // screenshot file: public/projects/eduverify.png
    subtitle: "AI-powered handwriting recognition system",
    year: "2026", // write "In progress, 2026" to show the "Now building" chip
    repo: "https://github.com/avinashkolhe066/Handwriting-Recognition",
    stack: ["MERN", "FastAPI", "TrOCR", "DINOv2", "ChromaDB", "Socket.IO", "Ollama"],
    points: [
      "Full-stack MERN app with Python FastAPI microservices for digital assignment recognition across Student, Admin and Super Admin roles, later extended to React Native.",
      "Three-stage AI pipeline with Microsoft TrOCR, Meta DINOv2 and ChromaDB for handwriting recognition, authenticity verification and plagiarism detection.",
      "JWT auth, real-time Socket.IO notifications and an Ollama-powered admin assistant that automates grading and feedback.",
    ],
  },
];

export const achievements = [
  { title: "First Runner-Up", detail: "GenAI Competition, ICAIM event: a competitive AI/ML build-and-pitch challenge." },
  { title: "Participant", detail: "IndiaNext 2026 Hackathon: built a team software solution under time constraints." },
  { title: "Active member", detail: "College Coding Club: collaborative software development and technical projects." },
];