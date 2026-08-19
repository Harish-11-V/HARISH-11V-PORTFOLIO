import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageTransition } from "../../components/Layout";
import {
  listContactMessages,
  updateMessageStatus,
  deleteMessage,
  getResumeFileInfo,
  getMyAdminStatus,
} from "@/lib/admin.functions";
import { RESUME_STORAGE_PATH } from "@/lib/resume.functions";
import { Mail, Trash2, Archive, Check, Upload, LogOut, Loader2, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Harish Portfolio" },
      { name: "description", content: "Manage contact messages and the resume file." },
      { property: "og:title", content: "Admin — Harish Portfolio" },
      { property: "og:description", content: "Manage contact messages and the resume file." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchStatus = useServerFn(getMyAdminStatus);
  const fetchMessages = useServerFn(listContactMessages);
  const fetchResume = useServerFn(getResumeFileInfo);
  const setStatus = useServerFn(updateMessageStatus);
  const removeMessage = useServerFn(deleteMessage);

  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<string | null>(null);

  const statusQ = useQuery({ queryKey: ["admin-status"], queryFn: () => fetchStatus() });
  const isAdmin = statusQ.data?.isAdmin ?? false;

  const messagesQ = useQuery({
    queryKey: ["admin-messages"],
    queryFn: () => fetchMessages(),
    enabled: isAdmin,
  });
  const resumeQ = useQuery({
    queryKey: ["admin-resume"],
    queryFn: () => fetchResume(),
    enabled: isAdmin,
  });

  const statusM = useMutation({
    mutationFn: (v: { id: string; status: "new" | "read" | "archived" }) => setStatus({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-messages"] }),
  });
  const deleteM = useMutation({
    mutationFn: (id: string) => removeMessage({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-messages"] }),
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadMsg(null);
    if (file.type !== "application/pdf") {
      setUploadMsg("Only PDF files are allowed.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setUploadMsg("File must be under 8 MB.");
      return;
    }
    setUploading(true);
    const { error } = await supabase.storage
      .from("resume")
      .upload(RESUME_STORAGE_PATH, file, { upsert: true, contentType: "application/pdf" });
    setUploading(false);
    setUploadMsg(error ? error.message : "Resume uploaded.");
    qc.invalidateQueries({ queryKey: ["admin-resume"] });
  }

  if (statusQ.isLoading) {
    return (
      <PageTransition variant="fade">
        <div className="min-h-[60vh] grid place-items-center">
          <Loader2 className="animate-spin text-primary" />
        </div>
      </PageTransition>
    );
  }

  if (!isAdmin) {
    return (
      <PageTransition variant="fade">
        <section className="mx-auto max-w-lg min-h-[60vh] flex flex-col items-center justify-center text-center">
          <ShieldAlert size={40} className="text-primary" />
          <h1 className="mt-6 text-3xl font-bold">Not authorised</h1>
          <p className="mt-3 text-muted-foreground text-sm">
            This account has no admin role yet. If you are the site owner and this is the first
            account, claim ownership below.
          </p>
          <button
            onClick={async () => {
              const { data } = await supabase.rpc("claim_first_admin");
              if (data) qc.invalidateQueries({ queryKey: ["admin-status"] });
              else setUploadMsg("Ownership already claimed by another account.");
            }}
            className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground glow-hover"
          >
            Claim owner access
          </button>
          {uploadMsg && <p className="mt-3 text-xs text-destructive">{uploadMsg}</p>}
          <button onClick={signOut} className="mt-6 text-sm text-primary hover:underline">
            Sign out
          </button>

        </section>
      </PageTransition>
    );
  }

  const messages = messagesQ.data ?? [];

  return (
    <PageTransition variant="blur">
      <section className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">Admin</p>
            <h1 className="mt-2 text-4xl font-bold">Control room</h1>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/5"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>

        {/* Resume management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 rounded-3xl border border-white/10 bg-card/40 backdrop-blur-xl p-6"
        >
          <h2 className="text-lg font-semibold">Resume file</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Stored privately. Visitors download it through short-lived secure links.
          </p>
          <ul className="mt-4 space-y-1 text-sm">
            {(resumeQ.data ?? []).map((f) => (
              <li key={f.name} className="text-muted-foreground">
                {f.name}
                {f.size ? ` · ${(f.size / 1024).toFixed(0)} KB` : ""}
              </li>
            ))}
            {(resumeQ.data ?? []).length === 0 && (
              <li className="text-muted-foreground">No file uploaded yet.</li>
            )}
          </ul>
          <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground glow-hover">
            {uploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
            Upload / replace PDF
            <input type="file" accept="application/pdf" className="hidden" onChange={onUpload} />
          </label>
          {uploadMsg && <p className="mt-3 text-xs text-muted-foreground">{uploadMsg}</p>}
        </motion.div>

        {/* Messages */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold">
            Messages{" "}
            <span className="text-muted-foreground text-sm font-normal">({messages.length})</span>
          </h2>
          {messagesQ.isLoading && <Loader2 className="mt-6 animate-spin text-primary" />}
          <div className="mt-5 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.article
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="rounded-2xl border border-white/10 bg-card/40 backdrop-blur-xl p-5"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-semibold">{m.name}</span>
                    <a
                      href={`mailto:${m.email}?subject=Re: your message`}
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <Mail size={13} /> {m.email}
                    </a>
                    <span className="ml-auto text-xs uppercase tracking-wider text-muted-foreground">
                      {m.status} · {new Date(m.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground whitespace-pre-wrap">
                    {m.message}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => statusM.mutate({ id: m.id, status: "read" })}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"
                    >
                      <Check size={13} /> Mark read
                    </button>
                    <button
                      onClick={() => statusM.mutate({ id: m.id, status: "archived" })}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"
                    >
                      <Archive size={13} /> Archive
                    </button>
                    <button
                      onClick={() => deleteM.mutate(m.id)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-destructive/40 text-destructive px-3 py-1.5 text-xs hover:bg-destructive/10"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
            {!messagesQ.isLoading && messages.length === 0 && (
              <p className="text-sm text-muted-foreground">No messages yet.</p>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
