import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HeroScene } from "../components/HeroScene";
import { PageTransition } from "../components/Layout";
import { ArrowRight, Sparkles, Trophy, Code2, Rocket } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dev.Folio — Hero" },
      { name: "description", content: "Developer, designer, and builder of immersive web experiences." },
    ],
  }),
  component: Index,
});

const stagger = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function Index() {
  return (
    <PageTransition variant="fade">
      <section className="relative mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 items-center min-h-[80vh]">
        <motion.div variants={stagger} initial="initial" animate="animate" className="relative z-10">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs text-muted-foreground mb-6">
            <Sparkles size={14} className="text-primary" />
            Available for new projects
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
            I craft <span className="text-gradient">immersive</span><br />
            digital experiences.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 text-lg text-muted-foreground max-w-lg">
            Full-stack developer specializing in 3D web, motion design, and performant interfaces. I turn ambitious ideas into cinematic products.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-hover"
            >
              Hire me
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-foreground hover:bg-white/5"
            >
              View work
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[400px] sm:h-[500px] lg:h-[600px]"
        >
          <HeroScene />
        </motion.div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl mt-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-5 gap-10"
        >
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">About</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold">A builder driven by detail.</h2>
          </div>
          <div className="lg:col-span-3 space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>
              Hi, I'm <span className="text-foreground font-semibold">Alex Carter</span>. For 6+ years I've shipped products at the intersection of engineering and design — from real-time 3D dashboards to AI-powered creative tools.
            </p>
            <p>
              I care about milliseconds, easing curves, and the small moments that make software feel alive.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { icon: Trophy, label: "Awards", value: "12+" },
            { icon: Rocket, label: "Products shipped", value: "40+" },
            { icon: Code2, label: "Open-source stars", value: "8.4k" },
            { icon: Sparkles, label: "Happy clients", value: "60+" },
          ].map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-white/10 bg-card/40 backdrop-blur-xl p-6 glow-hover"
            >
              <Icon className="text-primary mb-4" size={24} />
              <div className="text-3xl font-bold">{value}</div>
              <div className="text-sm text-muted-foreground mt-1">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </PageTransition>
  );
}
