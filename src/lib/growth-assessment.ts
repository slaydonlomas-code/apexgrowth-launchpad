// Growth Readiness Assessment — deterministic, client-side scoring only.
// No network calls, no persistence, no AI.

export type CategoryId = "leadResponse" | "leadFollowUp" | "operations" | "websiteConversion";

export interface AssessmentQuestion {
  id: string;
  category: CategoryId;
  prompt: string;
  options: { label: string; points: 0 | 1 | 2 | 3 }[];
}

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  leadResponse: "Lead Response",
  leadFollowUp: "Lead Follow-Up",
  operations: "Operations",
  websiteConversion: "Website Conversion",
};

/** Tie-break priority for the lowest-scoring category. */
export const CATEGORY_ORDER: CategoryId[] = [
  "leadResponse",
  "leadFollowUp",
  "operations",
  "websiteConversion",
];

export const QUESTIONS: AssessmentQuestion[] = [
  {
    id: "lr1",
    category: "leadResponse",
    prompt: "How quickly does your business usually respond to a new lead?",
    options: [
      { label: "Immediately or within 5 minutes", points: 3 },
      { label: "Within 30 minutes", points: 2 },
      { label: "Within a few hours", points: 1 },
      { label: "The next day or inconsistently", points: 0 },
    ],
  },
  {
    id: "lr2",
    category: "leadResponse",
    prompt: "What happens when your business misses a phone call?",
    options: [
      { label: "The caller receives an immediate automated response", points: 3 },
      { label: "Someone consistently calls back within a few minutes", points: 2 },
      { label: "Someone calls back when available", points: 1 },
      { label: "There is no consistent process", points: 0 },
    ],
  },
  {
    id: "lr3",
    category: "leadResponse",
    prompt: "How are new leads qualified and routed?",
    options: [
      { label: "Automatically using a defined process", points: 3 },
      { label: "Manually using a consistent process", points: 2 },
      { label: "It depends on who receives the lead", points: 1 },
      { label: "There is no defined process", points: 0 },
    ],
  },
  {
    id: "lf1",
    category: "leadFollowUp",
    prompt: "What happens when a new lead does not respond?",
    options: [
      { label: "A structured multi-step follow-up sequence begins automatically", points: 3 },
      { label: "The team follows a consistent manual sequence", points: 2 },
      { label: "One or two follow-ups are usually attempted", points: 1 },
      { label: "Follow-up is inconsistent or rarely happens", points: 0 },
    ],
  },
  {
    id: "lf2",
    category: "leadFollowUp",
    prompt: "How are estimates, quotes, or proposals followed up?",
    options: [
      { label: "Automatically with personalized reminders", points: 3 },
      { label: "Manually according to a consistent schedule", points: 2 },
      { label: "When someone remembers or has time", points: 1 },
      { label: "They are generally not followed up", points: 0 },
    ],
  },
  {
    id: "lf3",
    category: "leadFollowUp",
    prompt: "Does your business reactivate older leads and past customers?",
    options: [
      { label: "Yes, through recurring automated campaigns", points: 3 },
      { label: "Yes, through occasional organized outreach", points: 2 },
      { label: "Only occasionally and without a set process", points: 1 },
      { label: "No", points: 0 },
    ],
  },
  {
    id: "op1",
    category: "operations",
    prompt: "How are appointments scheduled and confirmed?",
    options: [
      { label: "Online scheduling with automatic confirmations and reminders", points: 3 },
      { label: "Digital scheduling with some manual communication", points: 2 },
      { label: "Mostly through calls, texts, or back-and-forth messages", points: 1 },
      { label: "There is no consistent scheduling process", points: 0 },
    ],
  },
  {
    id: "op2",
    category: "operations",
    prompt: "Where is lead and customer information tracked?",
    options: [
      { label: "In a CRM with automated pipeline updates", points: 3 },
      { label: "In a CRM that is updated manually", points: 2 },
      { label: "Across spreadsheets, inboxes, notes, or multiple tools", points: 1 },
      { label: "There is no central tracking system", points: 0 },
    ],
  },
  {
    id: "op3",
    category: "operations",
    prompt: "How much repetitive administrative work does your team perform?",
    options: [
      { label: "Very little because most recurring tasks are automated", points: 3 },
      { label: "Some, but the most important workflows are organized", points: 2 },
      { label: "A significant amount each week", points: 1 },
      { label: "Manual work regularly slows down the business", points: 0 },
    ],
  },
  {
    id: "wc1",
    category: "websiteConversion",
    prompt: "Does your website clearly explain what you offer and what visitors should do next?",
    options: [
      { label: "Yes, with clear service positioning and calls to action", points: 3 },
      { label: "Mostly, although some pages could be clearer", points: 2 },
      { label: "The messaging or next step is often unclear", points: 1 },
      { label: "The website is outdated, incomplete, or difficult to use", points: 0 },
    ],
  },
  {
    id: "wc2",
    category: "websiteConversion",
    prompt: "Can website visitors easily contact, call, or schedule with your business?",
    options: [
      { label: "Yes, through several clear and working conversion paths", points: 3 },
      { label: "Yes, through one primary contact method", points: 2 },
      { label: "It is possible, but not obvious or convenient", points: 1 },
      { label: "No reliable conversion path exists", points: 0 },
    ],
  },
  {
    id: "wc3",
    category: "websiteConversion",
    prompt: "Does your business measure website leads and conversions?",
    options: [
      { label: "Yes, with analytics and conversion events configured", points: 3 },
      { label: "Basic traffic and some lead activity are measured", points: 2 },
      { label: "Analytics exists, but the business rarely reviews it", points: 1 },
      { label: "No meaningful tracking is configured", points: 0 },
    ],
  },
];

export interface CategoryRecommendation {
  service: string;
  serviceHref: string;
  focus: string;
  actions: string[];
}

export const RECOMMENDATIONS: Record<CategoryId, CategoryRecommendation> = {
  leadResponse: {
    service: "AI Employees",
    serviceHref: "/ai-employees",
    focus:
      "Immediate lead response, missed-call recovery, qualification, and scheduling — so no opportunity waits on someone being available.",
    actions: [
      "Put an immediate first response in place for every new call, form, and message, so no lead waits on availability.",
      "Add missed-call recovery that texts the caller back automatically and keeps the conversation going.",
      "Define how leads are qualified and routed, then let an AI receptionist handle the intake and booking.",
    ],
  },
  leadFollowUp: {
    service: "Automations",
    serviceHref: "/automations",
    focus:
      "Multi-step lead follow-up, estimate follow-up, and lead reactivation — so interest does not quietly go cold.",
    actions: [
      "Build a structured multi-step follow-up sequence that starts automatically when a lead goes quiet.",
      "Add automated estimate and proposal reminders on a consistent schedule until the customer responds.",
      "Run a recurring reactivation campaign to older leads and past customers you already paid to acquire.",
    ],
  },
  operations: {
    service: "Automations",
    serviceHref: "/automations",
    focus:
      "CRM workflows, scheduling, reminders, pipeline updates, and repetitive administrative work — so the team spends time on customers.",
    actions: [
      "Move scheduling online with automatic confirmations and reminders to cut back-and-forth messaging.",
      "Centralize leads and customers in one CRM and automate the pipeline stage updates.",
      "Identify the three most repetitive weekly tasks and automate the data entry and reminders behind them.",
    ],
  },
  websiteConversion: {
    service: "Websites & Growth",
    serviceHref: "/growth-services",
    focus:
      "Messaging, calls to action, lead capture, mobile experience, conversion tracking, and SEO foundations.",
    actions: [
      "Sharpen the messaging so every page states what you do and what the visitor should do next.",
      "Add clear, working conversion paths — call, text, form, and scheduling — visible on mobile without scrolling.",
      "Configure analytics with real conversion events so you can see which pages actually produce leads.",
    ],
  },
};

export type ReadinessLevel = "Foundational" | "Developing" | "Growth Ready" | "Optimized";

export function readinessLevel(score: number): ReadinessLevel {
  if (score < 40) return "Foundational";
  if (score < 60) return "Developing";
  if (score < 80) return "Growth Ready";
  return "Optimized";
}

export function scoreRange(score: number): string {
  if (score < 40) return "0-39";
  if (score < 60) return "40-59";
  if (score < 80) return "60-79";
  return "80-100";
}

export const LEVEL_SUMMARY: Record<ReadinessLevel, string> = {
  Foundational:
    "The core systems that capture and convert demand are mostly manual right now. That is a common starting point, and it means a few focused changes can make a visible difference quickly.",
  Developing:
    "You have real processes in place, but they depend on people remembering to run them. Making the most important ones automatic is the next step.",
  "Growth Ready":
    "Your systems are solid and mostly consistent. The remaining gains come from closing the specific gaps below rather than rebuilding anything.",
  Optimized:
    "Your lead capture, follow-up, and operations are running at a high standard. Focus on refinement and on protecting the systems as volume grows.",
}

export interface AssessmentResult {
  overall: number;
  categories: Record<CategoryId, number>;
  level: ReadinessLevel;
  strongest: CategoryId;
  lowest: CategoryId;
  recommendation: CategoryRecommendation;
}

/** answers: question id -> points. Returns null unless every question is answered. */
export function scoreAssessment(answers: Record<string, number>): AssessmentResult | null {
  if (QUESTIONS.some((q) => typeof answers[q.id] !== "number")) return null;

  const categories = {} as Record<CategoryId, number>;
  for (const cat of CATEGORY_ORDER) {
    const qs = QUESTIONS.filter((q) => q.category === cat);
    const earned = qs.reduce((sum, q) => sum + answers[q.id], 0);
    const max = qs.length * 3;
    categories[cat] = Math.round((earned / max) * 100);
  }

  const overall = Math.round(
    CATEGORY_ORDER.reduce((sum, c) => sum + categories[c], 0) / CATEGORY_ORDER.length,
  );

  // Ties resolve to the earliest category in CATEGORY_ORDER.
  const lowest = CATEGORY_ORDER.reduce((best, c) =>
    categories[c] < categories[best] ? c : best,
  );
  const strongest = CATEGORY_ORDER.reduce((best, c) =>
    categories[c] > categories[best] ? c : best,
  );

  return {
    overall,
    categories,
    level: readinessLevel(overall),
    strongest,
    lowest,
    recommendation: RECOMMENDATIONS[lowest],
  };
}
