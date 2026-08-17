import type { WorkflowStep } from "@/components/sections/WorkflowFlow";

export interface Automation {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  summary: string;
  capabilities: string[];
  workflow: WorkflowStep[];
  featured?: boolean;
}

export const AUTOMATIONS: Automation[] = [
  {
    slug: "missed-call-text-back",
    name: "Missed-Call Text-Back",
    tagline: "Every missed call gets an instant text",
    problem:
      "Contractors miss calls for good reasons: you are on a roof, under a sink, driving, or standing in a customer's kitchen. The caller does not know that. Silence is what gives them a reason to keep calling other companies.",
    summary:
      "The moment a call goes unanswered, the caller gets a text from your business number acknowledging the call and asking how you can help — so the conversation stays with you instead of moving down their list.",
    capabilities: [
      "Instant text after any unanswered call",
      "Message wording you write and approve",
      "Two-way conversation your team can take over at any time",
      "Different messages for business hours, after hours, and weekends",
      "Every missed call and reply logged in one place",
    ],
    workflow: [
      { label: "Call missed", detail: "Nobody picks up — you are on a job, driving, or it is after hours." },
      { label: "Text sent", detail: "Within seconds the caller gets a text from your number acknowledging the call." },
      { label: "Conversation", detail: "They reply with what they need; the system captures the details." },
      { label: "Human takeover", detail: "Your team steps into the thread when it is time to talk specifics." },
    ],
    featured: true,
  },
  {
    slug: "estimate-follow-up",
    name: "Estimate Follow-Up",
    tagline: "Open quotes get chased automatically",
    problem: "Estimates go quiet and nobody has time to follow up more than once.",
    summary:
      "A configured sequence checks in on open estimates on the schedule you set, and pulls a person in the moment the customer responds.",
    capabilities: [
      "Follow-up sequence timed to your sales cycle",
      "Stops immediately on reply, booking, or opt-out",
      "Notifies the right team member on re-engagement",
      "Reporting on which estimates are still open",
    ],
    workflow: [
      { label: "Quote delivered", detail: "The estimate is logged and the sequence begins." },
      { label: "Check-in one", detail: "A short, professional nudge goes out on your schedule." },
      { label: "Check-in two", detail: "A second touch offers to answer questions or adjust scope." },
      { label: "Handoff or close", detail: "A reply routes to a person; silence moves it to reactivation." },
    ],
  },
  {
    slug: "lead-reactivation",
    name: "Lead Reactivation",
    tagline: "Bring back the leads already in your database",
    problem: "Most businesses have hundreds of old leads that were never worked past the first attempt.",
    summary:
      "A permission-aware campaign that re-opens conversations with past leads and customers who are still legitimately contactable — no purchased lists, no spam blasts.",
    capabilities: [
      "Segments your existing list by age, service type, and status",
      "Respects opt-outs and contact-permission rules",
      "Conversational re-engagement rather than mass marketing blasts",
      "Warm replies routed straight to your team",
    ],
    workflow: [
      { label: "List review", detail: "We look at what is in your database and what is contactable." },
      { label: "Segment", detail: "Leads are grouped so the message actually fits their situation." },
      { label: "Re-engage", detail: "A short, human-sounding message opens the conversation." },
      { label: "Route replies", detail: "Interested responses go to a person immediately." },
    ],
  },
  {
    slug: "review-automation",
    name: "Review Requests",
    tagline: "Ask every happy customer, consistently",
    problem: "Reviews get requested when someone remembers, which means most jobs never get asked.",
    summary:
      "After a job is marked complete, the customer gets a review request. Every customer is asked the same way — no filtering or gating based on how they might rate you.",
    capabilities: [
      "Triggered when a job is marked complete",
      "Same request to every customer — no review gating",
      "Timed reminder if there is no response",
      "Simple reporting on requests sent",
    ],
    workflow: [
      { label: "Job completed", detail: "Completion in your system triggers the request." },
      { label: "Request sent", detail: "A short message with a direct link goes to the customer." },
      { label: "Reminder", detail: "One polite follow-up if there is no response." },
      { label: "Notify", detail: "Your team is alerted so responses can be acknowledged." },
    ],
  },
  {
    slug: "crm-automation",
    name: "CRM and Pipeline Automation",
    tagline: "Records that update themselves",
    problem: "Manual data entry is the first thing to go when the schedule gets busy.",
    summary:
      "Contacts, stages, notes, and tasks update from what actually happened so your pipeline is accurate enough to make decisions from.",
    capabilities: [
      "Automatic contact creation and deduplication",
      "Stage changes driven by real events",
      "Task assignment to the right owner",
      "Stale-opportunity alerts",
    ],
    workflow: [
      { label: "Event", detail: "A call, message, booking, or form submission occurs." },
      { label: "Write", detail: "The record is created or updated automatically." },
      { label: "Assign", detail: "A follow-up task is created for the responsible person." },
      { label: "Alert", detail: "Anything going stale gets surfaced before it is lost." },
    ],
  },
  {
    slug: "customer-follow-up",
    name: "Customer Follow-Up",
    tagline: "Stay in touch after the job is done",
    problem: "Repeat and referral work depends on being remembered, and most businesses go silent after the invoice.",
    summary:
      "Post-job check-ins, seasonal service reminders, and maintenance-plan touches that keep your business in front of customers you already earned.",
    capabilities: [
      "Post-job satisfaction check-ins",
      "Seasonal and maintenance reminders",
      "Referral asks at the right moment",
      "Full opt-out handling",
    ],
    workflow: [
      { label: "Job closed", detail: "The completed job enters the follow-up track." },
      { label: "Check-in", detail: "A short message confirms everything is holding up." },
      { label: "Reminder", detail: "Seasonal or maintenance touches go out on schedule." },
      { label: "Re-book", detail: "Interested customers are routed to scheduling." },
    ],
  },
  {
    slug: "custom-workflows",
    name: "Custom Workflows",
    tagline: "If your team repeats it, there is a chance we can automate it",
    problem: "Every business has its own repetitive steps that no off-the-shelf product covers.",
    summary:
      "We map the repetitive parts of your operation during the audit and build automations around the ones that are genuinely worth automating. Some things should stay human, and we will tell you when that is the case.",
    capabilities: [
      "Workflow mapping during your AI audit",
      "Built around your process, not a template",
      "Honest scoping — we say no when automation is the wrong tool",
      "Documented handoffs so your team knows what runs where",
    ],
    workflow: [
      { label: "Map", detail: "We document the repetitive steps your team performs today." },
      { label: "Prioritize", detail: "We rank them by time saved and risk of getting it wrong." },
      { label: "Build", detail: "We configure the workflow around your systems and rules." },
      { label: "Monitor", detail: "We watch it in the real world and adjust." },
    ],
  },
];
