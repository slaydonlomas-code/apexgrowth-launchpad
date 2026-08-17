export interface ResourceBlock {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface Resource {
  slug: string;
  title: string;
  description: string;
  category: string;
  readMinutes: number;
  published: string; // ISO date
  intro: string;
  blocks: ResourceBlock[];
}

export const RESOURCES: Resource[] = [
  {
    slug: "after-hours-call-coverage-for-contractors",
    title: "After-Hours Call Coverage for Contractors: What Actually Works",
    description:
      "Voicemail, answering services, call forwarding, and AI receptionists compared for contractors who cannot answer the phone at night.",
    category: "Call handling",
    readMinutes: 6,
    published: "2026-01-15",
    intro:
      "Most service businesses lose work at night and on weekends, not because they are bad at sales, but because nobody is available to pick up. Here is an honest comparison of the options.",
    blocks: [
      {
        heading: "Why after-hours matters more for service trades",
        paragraphs: [
          "A homeowner with a leak, a failed furnace, or storm damage is in a problem-solving mindset right now. They are not scheduling research for later — they are calling until someone answers.",
          "The company that answers is not necessarily the best one. It is usually the first one that picked up.",
        ],
      },
      {
        heading: "Option 1: Voicemail",
        paragraphs: [
          "Cheapest and worst. A caller in an urgent situation rarely leaves a message, and when they do, the details are usually incomplete.",
        ],
      },
      {
        heading: "Option 2: Forwarding to a personal phone",
        paragraphs: [
          "Works until it does not. It puts the burden on one person, degrades quality of life fast, and coverage disappears the moment that person is asleep, driving, or on another call.",
        ],
      },
      {
        heading: "Option 3: A traditional answering service",
        paragraphs: [
          "Better than voicemail: a human answers. The weakness is depth — most services take a message without asking the questions a plumber or roofer actually needs answered, and the caller can tell they are talking to someone outside your business.",
        ],
      },
      {
        heading: "Option 4: An AI receptionist",
        paragraphs: [
          "A voice system answers with your business name, asks the exact intake questions you approved, screens urgency, and either routes an emergency to your on-call person or captures everything for the morning.",
          "It is not a replacement for your office staff. It is coverage for the hours no staff exists.",
        ],
        bullets: [
          "Answers overflow and after-hours calls consistently",
          "Asks your questions the same way every time",
          "Escalates real emergencies immediately",
          "Sends a written summary before your team starts the day",
        ],
      },
      {
        heading: "How to choose",
        bullets: [
          "Count how many calls you currently miss in a week — most owners underestimate this badly.",
          "Decide what genuinely counts as an emergency worth waking someone for.",
          "Write down the five questions you would want asked on every call.",
          "Pick the option that can consistently do those three things.",
        ],
      },
    ],
  },
  {
    slug: "what-an-ai-receptionist-can-and-cannot-do",
    title: "What an AI Receptionist Can and Cannot Do",
    description:
      "A straight explanation of where an AI receptionist genuinely helps a service business, and where a human still has to take the call.",
    category: "AI employees",
    readMinutes: 5,
    published: "2026-01-22",
    intro:
      "There is a lot of hype in this category. Here is a plain description of the work an AI receptionist handles well, and the work it should hand to a person.",
    blocks: [
      {
        heading: "What it does well",
        bullets: [
          "Answers calls nobody else can get to — overflow, evenings, weekends, holidays",
          "Asks a consistent set of intake questions on every single call",
          "Captures name, callback number, address, and reason for the call",
          "Screens for urgency using rules you define",
          "Sends a written summary to your team and your systems",
        ],
      },
      {
        heading: "What it should not do",
        bullets: [
          "Quote a price on a job that has not been seen",
          "Argue with an upset customer",
          "Make judgment calls about scope, liability, or warranty",
          "Pretend to be a human being when asked directly",
        ],
      },
      {
        heading: "The escalation rule",
        paragraphs: [
          "The most important setting is not the voice — it is the escalation rule. Decide up front which situations must reach a person immediately, and the system becomes a safety net rather than a wall.",
        ],
      },
      {
        heading: "What setup actually involves",
        paragraphs: [
          "Every system we build is configured around your call scripts, service area, hours, escalation rules, and the systems you already use. That configuration is the work; the technology is the easy part.",
        ],
      },
    ],
  },
  {
    slug: "missed-call-recovery-for-service-businesses",
    title: "Missed-Call Recovery: The Simplest Automation Worth Running",
    description:
      "Why an automatic text after every missed call is usually the highest-return automation a contractor can turn on first.",
    category: "Automations",
    readMinutes: 4,
    published: "2026-02-05",
    intro:
      "If you only automate one thing this year, make it this. It is cheap, it is fast to set up, and it addresses the most common way service businesses lose work.",
    blocks: [
      {
        heading: "The problem, stated honestly",
        paragraphs: [
          "You are going to miss calls. You are on a roof, in a crawlspace, driving, or in front of a paying customer. That is not a discipline problem.",
          "The issue is what happens next. Silence gives the caller a reason to keep working down their list.",
        ],
      },
      {
        heading: "What the automation does",
        paragraphs: [
          "The moment a call goes unanswered, the caller receives a text from your business number acknowledging the call and asking what they need. The conversation stays open instead of ending.",
        ],
      },
      {
        heading: "Why it works",
        bullets: [
          "It responds in seconds, when intent is highest",
          "Texting is lower friction than calling back and waiting",
          "It gives your team written details before they call back",
          "It costs nothing per missed call that you were not already losing",
        ],
      },
      {
        heading: "Getting the wording right",
        paragraphs: [
          "Keep it short, name your business, apologize briefly, and ask one question. Avoid marketing language — the caller wants a person, not a campaign.",
        ],
      },
    ],
  },
];

export const getResource = (slug: string) => RESOURCES.find((r) => r.slug === slug);
