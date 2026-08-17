import type { WorkflowStep } from "@/components/sections/WorkflowFlow";

export interface Industry {
  slug: string;
  name: string;
  headline: string;
  problems: string[];
  workflow: WorkflowStep[];
  automations: string[];
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "roofing",
    name: "Roofing",
    headline: "Storm weeks create more calls than any office can answer.",
    problems: [
      "Demand arrives in spikes — a storm can generate a month of calls in two days.",
      "Crews are on roofs and physically cannot answer the phone.",
      "Insurance and inspection scheduling drags out the sales cycle.",
      "Large estimates go quiet and rarely get more than one follow-up.",
    ],
    workflow: [
      { label: "Storm or referral call", detail: "Every call is answered, including the surge nobody could staff for." },
      { label: "Inspection booked", detail: "Address, roof age, damage type, and insurance status captured up front." },
      { label: "Estimate delivered", detail: "The quote is logged and a follow-up sequence starts automatically." },
      { label: "Job and review", detail: "Scheduling confirmations, completion follow-up, and a review request." },
    ],
    automations: ["Missed-call text-back during storm surges", "Inspection scheduling and reminders", "Estimate follow-up sequences", "Review requests after completion"],
  },
  {
    slug: "hvac",
    name: "HVAC",
    headline: "The first hot week of summer decides your quarter.",
    problems: [
      "Seasonal demand spikes overwhelm the phone exactly when revenue is highest.",
      "Emergency no-cool and no-heat calls need triage, not voicemail.",
      "Maintenance plan renewals get forgotten in the busy season.",
      "Techs in attics and crawlspaces cannot return calls quickly.",
    ],
    workflow: [
      { label: "Call answered", detail: "Peak-season overflow gets picked up instead of rolling to voicemail." },
      { label: "Triage", detail: "No-cool and no-heat emergencies are separated from routine service." },
      { label: "Dispatch or book", detail: "Urgent jobs alert the on-call tech; routine work gets a scheduled window." },
      { label: "Maintenance follow-up", detail: "Plan renewals and seasonal tune-up reminders go out on schedule." },
    ],
    automations: ["After-hours emergency triage", "Seasonal tune-up reminders", "Maintenance plan renewals", "Appointment confirmations and reminders"],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    headline: "Plumbing emergencies do not wait until Monday.",
    problems: [
      "A large share of high-value calls arrive nights and weekends.",
      "Callers with an active leak will hang up and dial the next company in seconds.",
      "Answering services take a message without capturing what a plumber needs to know.",
      "Techs on a job cannot break away to book the next one.",
    ],
    workflow: [
      { label: "After-hours call", detail: "Answered live instead of hitting voicemail at 11 PM." },
      { label: "Emergency screening", detail: "Active leak, no water, or backup gets flagged immediately." },
      { label: "On-call alert", detail: "Real emergencies reach the on-call plumber with the details already gathered." },
      { label: "Next-day booking", detail: "Non-urgent work is scheduled into the next available window." },
    ],
    automations: ["24/7 emergency intake", "On-call escalation rules", "Missed-call text-back", "Post-job follow-up and review requests"],
  },
];

export const OTHER_TRADES = [
  "Electrical",
  "Remodeling and construction",
  "Landscaping and lawn care",
  "Painting",
  "Pest control",
  "Garage doors",
  "Flooring",
  "Cleaning services",
  "Pool service",
  "Restoration",
];
