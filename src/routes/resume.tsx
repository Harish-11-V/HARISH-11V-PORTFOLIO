import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { useState } from "react";
import { PageTransition } from "../components/Layout";
import { getResumeDownloadUrl, getResumePreviewUrl } from "@/lib/resume.functions";
import { Download, FileText, Eye, Loader2 } from "lucide-react";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume — Harish Portfolio" },
      { name: "description", content: "Download Harish Kumar V's AI & ML developer resume." },
      { property: "og:title", content: "Resume — Harish Portfolio" },
      { property: "og:description", content: "Download Harish Kumar V's AI & ML developer resume." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Resume,
});

function Resume() {
  const getDownload = useServerFn(getResumeDownloadUrl);
  const getPreview = useServerFn(getResumePreviewUrl);
  const [busy, setBusy] = useState<"download" | "preview" | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function open(kind: "download" | "preview") {
    setBusy(kind);
    setError(null);
    try {
      const res = kind === "download" ? await getDownload() : await getPreview();
      if (!res.url) {
        setError(res.error ?? "Resume is not available yet.");
        return;
      }
      window.open(res.url, kind === "download" ? "_self" : "_blank");
    } catch {
      setError("Could not generate a secure link. Please try again.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <PageTransition variant="flip">
      <section className="mx-auto max-w-4xl min-h-[70vh] flex flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-sm font-semibold text-primary uppercase tracking-widest"
        >Curriculum Vitae</motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="mt-3 text-5xl sm:text-6xl font-bold"
        >
          Take it with you.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="mt-4 text-lg text-muted-foreground max-w-lg"
        >
          The full resume — experience, stack, education, awards.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
          style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          className="mt-12 group relative w-full max-w-md"
        >
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-primary via-accent to-pink-500 opacity-50 blur-2xl group-hover:opacity-80 transition-opacity" />
          <div className="relative rounded-3xl border border-white/15 bg-card/70 backdrop-blur-xl p-8">
            <FileText size={42} className="text-primary mb-6" />
            <h2 className="text-2xl font-bold">Harish_Kumar_V_Resume.pdf</h2>
            <p className="mt-2 text-sm text-muted-foreground">B.Tech AI & ML · Rajalakshmi Engineering College</p>
            <div className="mt-8 flex gap-3">
              <motion.a
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                href="/resume.pdf" download
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground glow-hover"
              >
                <Download size={16} />
                Download
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                href="/resume.pdf" target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold hover:bg-white/5"
              >
                <Eye size={16} />
                Preview
              </motion.a>
            </div>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}
