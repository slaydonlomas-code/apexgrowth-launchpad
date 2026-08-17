import type { WorkflowStep } from "@/components/sections/WorkflowFlow";

export interface Agent {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  summary: string;
  capabilities: string[];
  workflow: WorkflowStep[];
  flagship?: boolean;
}

export const AGENTS: Agent[] = [
  {
    slug: "ai-receptionist",
    name: "AI Receptionist",
    tagline: "Answers every call, day or night",
    problem:
      "Your receptionist can only be on one call at a time, and nobody can staff a phone twenty-four hours a day. The problem was never the employee — it was the coverage.",
    summary:
      "A voice system that answers calls your team cannot get to: overflow, lunch breaks, evenings, weekends, and holidays. It greets the caller in your business's voice, captures the details you need, and hands the conversation to a person when it should be a person.",
    capabilities: [
      "Answers overflow, after-hours, weekend, and holiday calls",
      "Greets callers using scripts and language you approve",
      "Captures name, phone number, address, and the reason for the call",
      "Screens urgency and flags emergencies for immediate human attention",
      "Books or requests appointments based on rules you set",
      "Sends a call summary to your team and your CRM",
      "Transfers or escalates to a person when the caller asks",
    ],
    workflow: [
      { label: "Call comes in", detail: "Rings your line first. The system picks up only when nobody does, or on the hours you choose." },
      { label: "Greeting and intake", detail: "Answers with your business name and works through the questions you approved." },
      { label: "Qualify and route", detail: "Screens urgency, service type, and location, then escalates to a person when the rules say to." },
      { label: "Summary and follow-up", detail: "Sends the call details to your team, logs it in your system, and texts the caller a confirmation." },
    ],
    flagship: true,
  },
  {
    slug: "ai-lead-agent",
    name: "AI Lead Agent",
    tagline: "Responds to new leads in seconds",
    problem:
      "A form fills out at 9 PM and gets a reply at 10 AM. In that window the customer keeps calling other companies — a delayed response gives them a reason to.",
    summary:
      "Watches every lead source you connect — website forms, missed calls, ad leads — and responds immediately with a real conversation instead of an autoresponder.",
    capabilities: [
      "Instant first response to web form, chat, and ad leads",
      "Asks qualifying questions in your own words",
      "Collects service type, address, timeline, and contact preferences",
      "Sorts urgent requests from tire-kickers before your team spends time",
      "Hands a qualified, summarized lead to a person",
      "Logs everything to your CRM or inbox",
    ],
    workflow: [
      { label: "Lead arrives", detail: "Form submission, chat, missed call, or ad lead lands in one place." },
      { label: "Immediate reply", detail: "The lead hears back within seconds, not hours, by text or voice." },
      { label: "Qualification", detail: "Your questions get asked consistently every single time." },
      { label: "Handoff", detail: "A summarized, prioritized lead reaches your team ready to work." },
    ],
  },
  {
    slug: "ai-follow-up-agent",
    name: "AI Follow-Up Agent",
    tagline: "Keeps estimates and quotes from going cold",
    problem:
      "Most estimates are lost to silence, not to a competitor's price. Nobody on a busy crew has time to chase every open quote.",
    summary:
      "Runs the follow-up sequence your team means to run: checking in on open estimates, answering simple questions, and bringing warm prospects back to a human at the right moment.",
    capabilities: [
      "Automated check-ins on open estimates at intervals you choose",
      "Polite, on-brand messaging that stops when the customer says stop",
      "Answers to common questions about timing, scope, and next steps",
      "Alerts your team the moment a prospect re-engages",
      "Stops the sequence automatically once a job is booked",
    ],
    workflow: [
      { label: "Estimate sent", detail: "The system records the quote and starts the sequence you configured." },
      { label: "Timed check-ins", detail: "Follow-up messages go out on schedule instead of whenever someone remembers." },
      { label: "Reply detected", detail: "Any response pauses the sequence and notifies a person right away." },
      { label: "Close or close out", detail: "Booked jobs end the sequence; quiet ones move to long-term reactivation." },
    ],
  },
  {
    slug: "ai-scheduling-agent",
    name: "AI Scheduling Agent",
    tagline: "Books, confirms, and reduces no-shows",
    problem:
      "Scheduling by phone tag burns hours a week, and unconfirmed appointments turn into wasted truck rolls.",
    summary:
      "Handles the back-and-forth of getting an appointment on the calendar and keeping it there, inside the availability rules and service areas you define.",
    capabilities: [
      "Offers appointment windows based on your real availability rules",
      "Confirms bookings by text or email",
      "Sends reminders ahead of the appointment",
      "Handles reschedule requests without a phone call",
      "Respects service areas, job types, and crew capacity limits",
    ],
    workflow: [
      { label: "Request received", detail: "A caller or lead asks for a time, or your team triggers scheduling." },
      { label: "Availability offered", detail: "Only the windows your rules allow are offered." },
      { label: "Confirmation", detail: "The customer gets a written confirmation immediately." },
      { label: "Reminders", detail: "Timed reminders and easy rescheduling cut down no-shows." },
    ],
  },
  {
    slug: "ai-crm-assistant",
    name: "AI CRM Assistant",
    tagline: "Keeps your records clean without the data entry",
    problem:
      "Notes live on truck dashboards and in text threads. When the record is incomplete, follow-up does not happen and revenue leaks quietly.",
    summary:
      "Writes what happened into your system of record so your pipeline reflects reality — call summaries, lead status, next steps, and tasks, without anyone typing them in.",
    capabilities: [
      "Creates and updates contact records automatically",
      "Writes call and message summaries into the record",
      "Moves leads through pipeline stages based on what happened",
      "Creates follow-up tasks for the right person",
      "Flags stale opportunities before they go cold",
    ],
    workflow: [
      { label: "Interaction happens", detail: "A call, text, or form submission occurs anywhere in the system." },
      { label: "Summarize", detail: "The key details are extracted into a short, readable summary." },
      { label: "Update records", detail: "Contact, stage, and notes are written to your system of record." },
      { label: "Assign next step", detail: "A task lands with the person who owns the next action." },
    ],
  },
];

export const getAgent = (slug: string) => AGENTS.find((a) => a.slug === slug);
