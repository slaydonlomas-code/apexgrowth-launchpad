import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(5).max(40),
  business: z.string().trim().max(200).optional().default(""),
  website: z.string().trim().max(300).optional().default(""),
  budget: z.string().trim().max(80).optional().default(""),
  details: z.string().trim().min(5).max(4000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO = process.env.CONTACT_TO_EMAIL || "apexgrowthsolutions@gmail.com";
    const FROM = process.env.CONTACT_FROM_EMAIL || "ApexGrowth <onboarding@resend.dev>";

    const subject = `New inquiry — ${data.name}${data.business ? ` (${data.business})` : ""}`;
    const html = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:auto;padding:24px;background:#0f0f10;color:#f5f5f5;border-radius:12px">
        <h2 style="color:#d4af5a;margin:0 0 12px">New ApexGrowth Inquiry</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6">
          <tr><td style="padding:6px 0;color:#a1a1aa;width:150px">Name</td><td>${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding:6px 0;color:#a1a1aa">Email</td><td>${escapeHtml(data.email)}</td></tr>
          <tr><td style="padding:6px 0;color:#a1a1aa">Phone</td><td>${escapeHtml(data.phone)}</td></tr>
          <tr><td style="padding:6px 0;color:#a1a1aa">Business</td><td>${escapeHtml(data.business || "-")}</td></tr>
          <tr><td style="padding:6px 0;color:#a1a1aa">Website</td><td>${escapeHtml(data.website || "-")}</td></tr>
          <tr><td style="padding:6px 0;color:#a1a1aa">Budget</td><td>${escapeHtml(data.budget || "-")}</td></tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#1a1a1c;border-radius:8px;white-space:pre-wrap">${escapeHtml(data.details)}</div>
        <p style="color:#71717a;font-size:12px;margin-top:16px">Sent from apexgrowth.com contact form.</p>
      </div>`;

    if (!RESEND_API_KEY) {
      console.warn("[contact] RESEND_API_KEY not set — logging submission only.", data);
      return { ok: true, delivered: false };
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: data.email,
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("[contact] Resend failed", res.status, body);
      throw new Error(`Email delivery failed (${res.status})`);
    }
    return { ok: true, delivered: true };
  });

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
