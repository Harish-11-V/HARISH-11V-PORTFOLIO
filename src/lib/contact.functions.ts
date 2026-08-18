import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name required").max(80, "Name too long"),
  email: z.string().trim().email("Valid email required").max(200),
  message: z.string().trim().min(5, "Tell me a bit more").max(1000, "Message too long"),
  // honeypot — must stay empty
  company: z.string().max(0).optional(),
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userAgent = getRequestHeader("user-agent")?.slice(0, 300) ?? null;

    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      message: data.message,
      user_agent: userAgent,
    });

    if (error) {
      console.error("contact insert failed", error);
      throw new Error("Could not send your message right now. Please try again.");
    }

    return { ok: true as const };
  });
