import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "../components/Layout";
import { TiltCard } from "../components/Effects";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Harish Kumar V" },
      { name: "description", content: "AI, ML, and full-stack projects built by Harish Kumar V — EduEase, Gen-AI Material Assistant, EduMate-AI, Pneumonia Detection with ViT." },
    ],
  }),
  component: Projects,
});

const PROJECTS = [
  {
    title: "EduEase — Interactive OD Approval",
    desc: "Digital platform that revolutionizes OD leave management by automating request & approval workflows — student submission with proof upload, faculty dashboards, real-time notifications & report generation. Achieved 70% faster processing, 60% improved faculty efficiency & 90% accuracy.",
    tag: "React.js · MongoDB · Node.js",
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    title: "Gen-AI Material Assistant",
    desc: "GenAI-powered Material Assistant automation using a RAG-based LLM/NLP architecture with React 18 + TypeScript, Supabase, and Gemini API/LLMs. Multi-stage criteria decision engine (35% design, 30% mechanical, 20% compliance, 15% cost) with AI ranking, dashboards, and an interactive RAG chatbot — reducing evaluation effort ~25–30% while improving NPD decision accuracy.",
    tag: "React 18 · TypeScript · Supabase · Gemini",
    color: "from-cyan-400 to-blue-600",
  },
  {
    title: "EduMate — AI Powered Adaptive Learning",
    desc: "Adaptive learning platform for personalized education and skill enhancement. Python + TensorFlow / PyTorch for AI recommendations (80% accuracy), OpenCV + WebRTC for real-time feedback (75% engagement lift), React interface (60% faster task completion), Twilio + AI chatbot for 70% faster responsiveness.",
    tag: "Python · TensorFlow · PyTorch · OpenCV · React",
    color: "from-emerald-400 to-teal-600",
  },
  {
    title: "Pneumonia Detection — ViT + MC Dropout",
    desc: "Deep learning framework using Vision Transformer, Monte Carlo Dropout, and Active Learning for automated pneumonia diagnosis from chest X-rays. 94.1% accuracy, 96% sensitivity, 0.98 AUC — outperforming ResNet-50. 85% predictions >90% confidence; active learning pushed performance to 89.26% while cutting labeling effort.",
    tag: "Python · PyTorch · ViT · OpenCV",
    color: "from-orange-400 to-pink-600",
  },
];

function Projects() {
  return (
    <PageTransition variant="curtain">
      <section className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Work</p>
          <h1 className="mt-3 text-5xl sm:text-6xl font-bold">Selected projects.</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            End-to-end products across AI, ML, and full-stack — built to solve real-world & socio-impactful problems.
          </p>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <TiltCard className="group relative rounded-3xl border border-white/10 bg-card/40 backdrop-blur-xl p-6 overflow-hidden block h-full">
                <a href="#" className="block">
                  <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br ${p.color} opacity-25 blur-3xl group-hover:opacity-70 transition-opacity duration-500`} />
                  <div className="relative" style={{ transform: "translateZ(40px)" }}>
                    <div className="flex items-start justify-between mb-6 gap-3">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 py-1 rounded-full border border-white/10">
                        {p.tag}
                      </span>
                      <ExternalLink size={16} className="text-muted-foreground group-hover:text-foreground transition shrink-0" />
                    </div>
                    <h3 className="text-2xl font-bold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(600px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--color-neon) 18%, transparent), transparent 40%)" }} />
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
