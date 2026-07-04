import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition, PageMasthead } from "../components/Layout";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Harish Kumar V" },
      { name: "description", content: "AI, ML, and full-stack projects by Harish Kumar V — EduEase, Gen-AI Material Assistant, EduMate-AI, Pneumonia Detection with ViT." },
    ],
  }),
  component: Projects,
});

const PROJECTS = [
  {
    n: "01",
    title: "EduEase",
    subtitle: "Interactive OD Approval System",
    year: "2025",
    desc: "Digital platform that automates OD leave management — student submission with proof upload, faculty dashboards, real-time notifications, report generation.",
    metrics: [
      { k: "Processing", v: "70% faster" },
      { k: "Efficiency", v: "+60%" },
      { k: "Accuracy", v: "90%" },
    ],
    stack: ["React.js", "MongoDB", "Node.js"],
  },
  {
    n: "02",
    title: "Gen-AI Material Assistant",
    subtitle: "RAG-based decision engine for NPD",
    year: "2026",
    desc: "GenAI-powered material assistant using RAG-based LLM/NLP. Multi-stage criteria decision engine — design, mechanical, compliance, cost — with AI ranking, dashboards, and an interactive RAG chatbot.",
    metrics: [
      { k: "Design weight", v: "35%" },
      { k: "Effort saved", v: "~25–30%" },
      { k: "NPD accuracy", v: "↑" },
    ],
    stack: ["React 18", "TypeScript", "Supabase", "Gemini API"],
  },
  {
    n: "03",
    title: "EduMate",
    subtitle: "AI-Powered Adaptive Learning",
    year: "2025",
    desc: "Adaptive learning platform for personalized education. TensorFlow / PyTorch for AI recommendations, OpenCV + WebRTC for real-time feedback, React interface, Twilio + AI chatbot.",
    metrics: [
      { k: "AI accuracy", v: "80%" },
      { k: "Engagement", v: "+75%" },
      { k: "Task time", v: "60% ↓" },
    ],
    stack: ["Python", "TensorFlow", "PyTorch", "OpenCV", "React"],
  },
  {
    n: "04",
    title: "Pneumonia Detection",
    subtitle: "ViT + MC Dropout + Active Learning",
    year: "2025",
    desc: "Deep learning framework for pneumonia diagnosis from chest X-rays. Vision Transformer with Monte Carlo Dropout and Active Learning — outperforms ResNet-50 while cutting labeling effort.",
    metrics: [
      { k: "Accuracy", v: "94.1%" },
      { k: "Sensitivity", v: "96%" },
      { k: "AUC", v: "0.98" },
    ],
    stack: ["Python", "PyTorch", "ViT", "OpenCV"],
  },
];

function Projects() {
  return (
    <PageTransition variant="curtain">
      <div className="mx-auto max-w-[1400px]">
        <PageMasthead
          eyebrow="Chapter 02 · Selected Works"
          index="02"
          title="Selected"
          italic="projects."
          meta="04 ENTRIES · 2024–2026"
          lede="End-to-end products across AI, ML and full-stack — built to solve real-world & socio-impactful problems."
        />

        <div className="mt-16 space-y-0">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="group block border-b border-foreground/15 py-10 relative"
            >
              <div className="grid grid-cols-12 gap-4 items-start">
                <div className="col-span-2 md:col-span-1">
                  <span className="serif-italic text-copper text-3xl">{p.n}</span>
                </div>

                <div className="col-span-10 md:col-span-6">
                  <h3 className="serif text-4xl sm:text-5xl leading-[0.95] group-hover:text-copper transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 serif-italic text-lg text-muted-foreground">
                    {p.subtitle}
                  </p>
                  <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {p.desc}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-mono text-muted-foreground">
                    {p.stack.map((s) => (
                      <span key={s} className="uppercase tracking-widest">· {s}</span>
                    ))}
                  </div>
                </div>

                <div className="col-span-12 md:col-span-4 md:col-start-8 mt-6 md:mt-0">
                  <div className="grid grid-cols-3 gap-3">
                    {p.metrics.map((m) => (
                      <div key={m.k} className="border border-foreground/15 p-3">
                        <div className="serif text-xl text-copper">{m.v}</div>
                        <div className="mt-1 text-[9px] font-mono tracking-widest uppercase text-muted-foreground">{m.k}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
                    <span>{p.year}</span>
                    <span className="inline-flex items-center gap-1 group-hover:text-copper transition">
                      View piece
                      <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* copper sweep on hover */}
              <motion.div
                className="pointer-events-none absolute left-0 bottom-0 h-px bg-copper"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
              />
            </motion.a>
          ))}
        </div>

        <div className="mt-16 flex items-baseline justify-between">
          <span className="serif-italic text-2xl">— end of catalogue.</span>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
            04 / 04
          </span>
        </div>
      </div>
    </PageTransition>
  );
}
