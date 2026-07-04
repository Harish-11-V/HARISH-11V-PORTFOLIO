import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition, PageMasthead } from "../components/Layout";
import { Download, Eye, FileText } from "lucide-react";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Résumé — Harish Kumar V" },
      { name: "description", content: "Download the full résumé of Harish Kumar V — B.Tech AI & ML, Rajalakshmi Engineering College." },
    ],
  }),
  component: Resume,
});

function Resume() {
  return (
    <PageTransition variant="flip">
      <div className="mx-auto max-w-[1400px]">
        <PageMasthead
          eyebrow="Chapter 06 · Curriculum Vitae"
          index="06"
          title="Take it"
          italic="with you."
          meta="PDF · 1 PAGE · UPDATED 2026"
          lede="The complete résumé — experience, stack, education, awards."
        />

        <div className="mt-20 grid grid-cols-12 gap-6 items-start">
          {/* Left: metadata / colophon */}
          <div className="col-span-12 md:col-span-4 space-y-8">
            <div>
              <span className="eyebrow">Document</span>
              <p className="mt-2 serif-italic text-2xl">Harish_Kumar_V_Resume.pdf</p>
            </div>
            <div className="border-t border-foreground/15 pt-6 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Author</span>
                <span>Harish Kumar V</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Program</span>
                <span>B.Tech AI & ML</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Institution</span>
                <span className="text-right">Rajalakshmi Engg. College</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span>Chennai, IN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Revision</span>
                <span className="font-mono">R.2026.01</span>
              </div>
            </div>
          </div>

          {/* Right: preview card as tall folio */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-7 md:col-start-6 relative"
          >
            <div className="absolute -inset-3 bg-copper/20 blur-3xl animate-pulse-glow" />
            <div className="relative border border-foreground/20 bg-card p-10 sm:p-14 aspect-[3/4] max-w-md mx-auto">
              <div className="flex items-baseline justify-between border-b border-foreground/20 pb-4">
                <span className="eyebrow">Résumé</span>
                <span className="font-mono text-[10px] tracking-widest text-muted-foreground">01 / 01</span>
              </div>
              <FileText size={28} className="mt-16 text-copper" strokeWidth={1.2} />
              <h2 className="mt-8 serif text-4xl leading-[0.95]">
                Harish
                <br />
                <span className="serif-italic text-copper">Kumar V.</span>
              </h2>
              <p className="mt-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                AI / ML · Frontend · IoT
              </p>

              <div className="mt-14 flex gap-2">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="/resume.pdf"
                  download
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-copper bg-copper px-4 py-3 text-xs font-mono uppercase tracking-widest text-primary-foreground hover:bg-transparent hover:text-copper transition-colors"
                >
                  <Download size={13} />
                  Download
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 border border-foreground/25 px-4 py-3 text-xs font-mono uppercase tracking-widest hover:border-copper hover:text-copper transition-colors"
                >
                  <Eye size={13} />
                  Preview
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 flex items-baseline justify-between">
          <span className="serif-italic text-2xl">— printed on demand.</span>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">Ed. R.2026.01</span>
        </div>
      </div>
    </PageTransition>
  );
}
