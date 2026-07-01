import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "../components/Layout";
import { Mail, Rocket } from "lucide-react";

export const Route = createFileRoute("/cta")({
  head: () => ({
    meta: [
      { title: "Let's build — Harish Portfolio" },
      { name: "description", content: "Ready to start something great? Hire me for your next project." },
    ],
  }),
  component: CTA,
});

function CTA() {
  return (
    <PageTransition variant="scale">
      <section className="mx-auto max-w-4xl min-h-[80vh] flex flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm font-semibold text-primary uppercase tracking-widest"
        >
          Let's collaborate
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-4 text-5xl sm:text-7xl font-bold leading-[1.05]"
        >
          Have an idea? <br />
          <span className="text-gradient">Let's make it real.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg text-muted-foreground max-w-xl"
        >
          From concept to launch — I'll partner with you to ship something memorable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, filter: "blur(0.4px)" }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-primary blur-2xl opacity-60 animate-pulse-glow" />
            <Link
              to="/contact"
              className="relative inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground glow-hover"
            >
              <Mail size={18} />
              Contact me
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-bold text-foreground hover:bg-white/10"
            >
              <Rocket size={18} />
              See projects
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
