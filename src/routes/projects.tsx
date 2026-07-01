import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "../components/Layout";
import { TiltCard } from "../components/Effects";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Harish Portfolio" },
      { name: "description", content: "A selection of recent product, 3D, and tooling work." },
    ],
  }),
  component: Projects,
});

const PROJECTS = [
  { title: "Lumen Studio", desc: "Real-time collaborative 3D scene editor used by motion teams.", tag: "WebGL · React", color: "from-fuchsia-500 to-purple-600" },
  { title: "Orbit AI", desc: "AI-assisted prompt sandbox for designers — 12k weekly actives.", tag: "AI · Next.js", color: "from-cyan-400 to-blue-600" },
  { title: "Drift OS", desc: "Operating-system-like dashboard for distributed remote teams.", tag: "SaaS · TypeScript", color: "from-emerald-400 to-teal-600" },
  { title: "Pulse Charts", desc: "Animated charting library with 1M+ npm downloads.", tag: "OSS · D3", color: "from-orange-400 to-pink-600" },
  { title: "Nimbus Cloud", desc: "Edge-native storage UI with realtime sync visualization.", tag: "Infra · Rust", color: "from-violet-500 to-indigo-700" },
  { title: "Echo Notes", desc: "Voice-first note app with on-device transcription.", tag: "Mobile · ML", color: "from-rose-400 to-red-600" },
];

function Projects() {
  return (
    <PageTransition variant="curtain">
      <section className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Work</p>
          <h1 className="mt-3 text-5xl sm:text-6xl font-bold">Selected projects.</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl">
            Things I've designed, built, and shipped. Hover to feel the depth.
          </p>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 py-1 rounded-full border border-white/10">
                        {p.tag}
                      </span>
                      <ExternalLink size={16} className="text-muted-foreground group-hover:text-foreground transition" />
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
