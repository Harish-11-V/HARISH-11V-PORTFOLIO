import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PageTransition } from "../components/Layout";
import { contactSchema, submitContactMessage } from "@/lib/contact.functions";
import { Check, Send, Loader2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Harish Portfolio" },
      { name: "description", content: "Send a message. I reply within 24 hours." },
      { property: "og:title", content: "Contact — Harish Portfolio" },
      { property: "og:description", content: "Send a message. I reply within 24 hours." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

const schema = contactSchema;

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [company, setCompany] = useState(""); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const send = useServerFn(submitContactMessage);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const r = schema.safeParse({ ...form, company });
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      await send({ data: r.data });
      setSent(true);
    } catch (err: any) {
      setServerError(err?.message ?? "Could not send your message. Please try again.");
    } finally {
      setBusy(false);
    }
  }


  return (
    <PageTransition variant="flip">
      <section className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Contact</p>
          <h1 className="mt-3 text-5xl sm:text-6xl font-bold">Say hello.</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Got a project, role, or idea? Drop a message.
          </p>
        </motion.div>

        <div className="mt-12 relative rounded-3xl border border-white/10 bg-card/40 backdrop-blur-xl p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                  className="mx-auto w-20 h-20 rounded-full bg-primary grid place-items-center glow-border"
                >
                  <Check size={36} className="text-primary-foreground" />
                </motion.div>
                <h2 className="mt-6 text-2xl font-bold">Message sent</h2>
                <p className="mt-2 text-muted-foreground">I'll get back to you within 24h.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-6 text-sm text-primary hover:underline"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {(["name", "email", "message"] as const).map((field, i) => (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                  >
                    <label className="block text-sm font-medium mb-2 capitalize">{field}</label>
                    {field === "message" ? (
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                        placeholder="Tell me about your project..."
                      />
                    ) : (
                      <input
                        type={field === "email" ? "email" : "text"}
                        value={form[field]}
                        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                        placeholder={field === "email" ? "you@example.com" : "Your name"}
                      />
                    )}
                    {errors[field] && (
                      <p className="mt-1.5 text-xs text-destructive">{errors[field]}</p>
                    )}
                  </motion.div>
                ))}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="hidden"
                />
                {serverError && <p className="text-xs text-destructive">{serverError}</p>}
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  type="submit"
                  disabled={busy}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground glow-hover disabled:opacity-60"
                >
                  {busy ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {busy ? "Sending..." : "Send message"}
                </motion.button>

              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}
