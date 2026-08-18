import { createServerFn } from "@tanstack/react-start";

const RESUME_PATH = "Harish_Kumar_V_Resume.pdf";
const EXPIRES_IN = 120; // seconds

/**
 * Public: returns a short-lived signed URL for the private resume file.
 * The bucket itself stays private — no permanent public link exists.
 */
export const getResumeDownloadUrl = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data, error } = await supabaseAdmin.storage
    .from("resume")
    .createSignedUrl(RESUME_PATH, EXPIRES_IN, { download: RESUME_PATH });

  if (error || !data?.signedUrl) {
    return { url: null as string | null, error: "Resume is not available yet." };
  }

  return { url: data.signedUrl, error: null as string | null };
});

export const getResumePreviewUrl = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data, error } = await supabaseAdmin.storage
    .from("resume")
    .createSignedUrl(RESUME_PATH, EXPIRES_IN);

  if (error || !data?.signedUrl) {
    return { url: null as string | null, error: "Resume is not available yet." };
  }

  return { url: data.signedUrl, error: null as string | null };
});

export const RESUME_STORAGE_PATH = RESUME_PATH;
