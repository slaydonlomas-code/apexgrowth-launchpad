import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  PhoneOff,
  Clock,
  MessageSquareOff,
  TrendingDown,
  Globe,
  Search,
  Target,
} from "lucide-react";
import {
  PageShell,
  Section,
  SectionHeading,
  Eyebrow,
  PrimaryCta,
  SecondaryCta,
} from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { CoverageTimeline } from "@/components/sections/CoverageTimeline";
import { WorkflowFlow } from "@/components/sections/WorkflowFlow";
import { FaqList, faqSchema, type FaqItem } from "@/components/sections/Faq";
import { AGENTS, getAgent } from "@/content/agents";
import { AUTOMATIONS } from "@/content/automations";
import { INDUSTRIES } from "@/content/industries";
import { CONTACT } from "@/content/site";
import { getRequestOrigin } from "@/lib/origin.functions";

const TITLE = "ApexGrowth | AI Automation, Websites & Growth";
const DESCRIPTION =
  "AI employees, business automations, and high-converting websites built for service businesses.";


const FAQS: FaqItem[] = [
  {
    q: "What exactly is an AI employee?",
    a: "A configured system that handles one job in your business end to end — answering the phone, following up on estimates, confirming appointments — using rules, scripts, and escalation paths you approve.",
  },
  {
    q: "Is this going to replace my office staff?",
    a: "No. It covers hours and overflow no person can cover, and takes repetitive follow-up off their plate. Relationships, judgment calls, and difficult conversations stay with your team.",
  },
  {
    q: "Do you work with businesses outside my area?",
    a: "We work with service businesses across the entire United States. Everything is built and supported remotely.",
  },
  {
    q: "How is this different from an answering service?",
    a: "An answering service takes a message. An AI employee asks your intake questions, screens urgency, books into your calendar, escalates emergencies, and hands your team a complete summary.",
  },
  {
    q: "Will it be built around how we already work?",
    a: "Yes. Every system is configured around your workflow, your scripts, your service area rules, and your existing tools before anything goes live.",
  },
  {
    q: "What does it cost?",
    a: "It depends on how many systems you need and how complex your workflows are. The free AI audit gives you a scoped recommendation and pricing before you commit to anything.",
  },
  {
    q: "How long until it's running?",
    a: "Simple automations like missed-call text-back move quickly. Full AI receptionist setups take longer because the scripts and escalation rules need to be right. We give you a timeline during the audit.",
  },
  {
    q: "Do you still build websites and do SEO?",
    a: "Yes. Web design, SEO, and lead generation are still part of what we do — they feed the systems that answer and follow up.",
  },
];

export const Route = createFileRoute("/")({
  loader: async () => ({ origin: await getRequestOrigin() }),
  head: ({ loaderData }) => {
    const origin = loaderData?.origin ?? "";
    const ogImage = `${origin}/og-image.jpg`;
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${origin}/` },
        { property: "og:image", content: ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "ApexGrowth — AI Employees. Automations. Websites." },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: `${origin}/` }],

      scripts: [{ type: "application/ld+json", children: JSON.stringify(faqSchema(FAQS)) }],
    };
  },
  component: Home,
});

function Home() {
  return (
    <PageShell>
      <Hero />
      <WhatWeDo />
      <Problem />
      <Workforce />
      <Coverage />
      <Agents />
      <Automations />
      <Industries />
      <Process />
      <GrowthServices />
      <Faq />
      <Contact />
    </PageShell>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-hero grain pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div>
          <Eyebrow>AI automation agency for local &amp; service businesses</Eyebrow>
          <h1 className="animate-fade-up mt-4 text-4xl leading-[1.07] md:text-5xl lg:text-[3.4rem]">
            AI employees and automation systems that{" "}
            <span className="text-gradient-gold">
              respond faster, follow up, and book more work.
            </span>
          </h1>
          <p className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            ApexGrowth builds AI employees and connected automations for local and service
            businesses — systems that answer every inquiry, qualify and schedule it, keep follow-up
            consistent, and cut the manual work your team does by hand.
          </p>
          <div className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row">
            <PrimaryCta location="home-hero" />
            <a
              href="#what-we-do"
              data-cta="secondary"
              data-cta-location="home-hero"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-medium text-foreground transition hover:border-primary/60 hover:text-primary"
            >
              See What We Do
            </a>
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Serving service businesses across the United States
          </p>
        </div>
        <Reveal delay={120}>
          <OperationsFlow />
        </Reveal>
      </div>
    </section>
  );
}

const OPS_INPUTS = ["Calls", "Web Leads", "Missed Calls", "Form Submissions"];
const OPS_OUTCOMES = [
  { t: "Qualification", d: "Intake questions asked, urgency scored" },
  { t: "Scheduling", d: "Booked into your calendar" },
  { t: "CRM Update", d: "Contact and job details written back" },
  { t: "Follow-Up", d: "Sequenced until answered or closed" },
  { t: "Booked Work", d: "Job on the schedule, team notified" },
];

function OperationsFlow() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-elegant md:p-8">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          AI Operations
        </div>
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <span
            className="h-2 w-2 rounded-full bg-green"
            style={{ animation: "pulse-soft 2.4s ease-in-out infinite" }}
          />
          Live · 24/7
        </span>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-[0.9fr_auto_1.1fr] md:items-center">
        <ul className="space-y-2.5">
          {OPS_INPUTS.map((i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground"
            >
              {i}
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" aria-hidden="true" />
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center" aria-hidden="true">
          <svg
            width="56"
            height="140"
            viewBox="0 0 56 140"
            className="hidden md:block text-primary/45"
            fill="none"
          >
            {[24, 52, 80, 108].map((y) => (
              <path
                key={y}
                d={`M0 ${y} C 28 ${y}, 28 70, 56 70`}
                stroke="currentColor"
                strokeWidth="1.25"
              />
            ))}
          </svg>
          <div className="h-8 w-px bg-primary/30 md:hidden" />
        </div>

        <div>
          <div className="rounded-2xl border border-primary/30 bg-primary/5 px-5 py-4">
            <div className="text-sm font-semibold text-foreground">
              ApexGrowth AI Operations Hub
            </div>
            <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Routing, qualification, and follow-up logic configured around your workflow
            </div>
          </div>
          <ul className="mt-4 space-y-2">
            {OPS_OUTCOMES.map((o) => (
              <li
                key={o.t}
                className="flex items-start gap-3 rounded-xl border border-border bg-background px-4 py-2.5"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green"
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-sm text-foreground">{o.t}</span>
                  <span className="block text-xs text-muted-foreground">{o.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const PILLARS = [
  {
    n: "01",
    k: "AI Employees",
    c: "AI receptionists and digital workers that answer, qualify, schedule, and follow up.",
    label: "Explore AI Employees",
    to: "/ai-employees",
  },
  {
    n: "02",
    k: "Automations",
    c: "Connect repetitive workflows so your team spends less time on manual work.",
    label: "Explore Automations",
    to: "/automations",
  },
  {
    n: "03",
    k: "Websites & Growth",
    c: "High-converting websites, landing pages, SEO, and lead-generation infrastructure.",
    label: "Explore Websites",
    to: "/growth-services",
  },
] as const;

function WhatWeDo() {
  return (
    <Section id="what-we-do">
      <SectionHeading
        eyebrow="What we do"
        title="Build the systems that help your business grow."
        center={false}
      />
      <div className="mt-14 divide-y divide-border border-y border-border">
        {PILLARS.map((p, i) => (
          <Reveal key={p.n} delay={i * 80}>
            <div className="grid gap-6 py-10 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-12 md:py-14">
              <div className="text-sm font-medium tracking-[0.18em] text-primary/70">{p.n}</div>
              <div className="max-w-2xl">
                <h3 className="text-2xl leading-snug text-foreground md:text-3xl">{p.k}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{p.c}</p>
              </div>
              <Link
                to={p.to}
                data-cta="secondary"
                data-cta-location="home-what-we-do"
                className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:gap-3"
              >
                {p.label} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const LEAKS = [
  {
    icon: PhoneOff,
    t: "Calls after hours",
    c: "High-intent callers reach voicemail and dial the next company on the list.",
    cost: "Lost before you ever knew they called",
  },
  {
    icon: Clock,
    t: "Slow response",
    c: "The first business to respond usually wins the job, regardless of who's better.",
    cost: "Won by whoever answered first",
  },
  {
    icon: MessageSquareOff,
    t: "Estimates that go quiet",
    c: "Most quotes get one follow-up, then sit until they're dead.",
    cost: "Work already priced, never closed",
  },
  {
    icon: TrendingDown,
    t: "Manual admin and old leads",
    c: "Notes, records, and months of past inquiries sit unworked because nobody has the hours.",
    cost: "Pipeline you already paid for",
  },
];

function Problem() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="The problem"
        title="You're not losing jobs to better companies. You're losing them to faster ones."
        intro="Every service business leaks work in the same four places — and every one of them is a coverage problem, not an effort problem."
        center={false}
      />
      <div className="mt-12 border-t border-border">
        {LEAKS.map((l, i) => (
          <Reveal key={l.t} delay={(i % 4) * 60}>
            <div className="grid items-start gap-4 border-b border-border py-7 md:grid-cols-[auto_minmax(0,15rem)_1fr_auto] md:items-center md:gap-8">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
                <l.icon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <h3 className="text-lg text-foreground">{l.t}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{l.c}</p>
              <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground md:text-right">
                {l.cost}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Workforce() {
  return (
    <Section id="how-it-works">
      <SectionHeading
        eyebrow="The idea"
        title="Automate the work slowing your team down."
        intro="Your people handle relationships, judgment, and the work itself. Digital workers handle answering, qualifying, scheduling, CRM updates, and follow-up — every hour of every day, exactly the same way."
      />
      <div className="mt-14">
        <TeamGrid />
      </div>
    </Section>
  );
}

function Coverage() {
  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="Coverage"
        title="What a week looks like with digital coverage."
        intro="Same business, same team — the difference is what happens in the hours nobody can staff."
      />
      <div className="mt-12">
        <CoverageTimeline />
      </div>
      <div className="mt-10 flex justify-center">
        <PrimaryCta location="home-coverage" />
      </div>
    </Section>
  );
}

function Agents() {
  const flagship = getAgent("ai-receptionist")!;
  const supporting = AGENTS.filter((a) => a.slug !== "ai-receptionist");
  return (
    <Section id="ai-employees">
      <SectionHeading
        eyebrow="AI employees"
        title="Your digital workforce."
        intro="Each one handles a specific job, configured around your workflow, scripts, and tools."
        center={false}
      />

      <Reveal>
        <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
          <div className="grid gap-10 p-8 md:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" /> Flagship
              </span>
              <h3 className="mt-4 text-2xl md:text-4xl">{flagship.name}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{flagship.summary}</p>
              <div className="mt-8">
                <Link
                  to="/ai-employees/ai-receptionist"
                  data-cta="secondary"
                  data-cta-location="home-flagship"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold transition hover:opacity-90"
                >
                  Explore the AI Receptionist <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6">
              <WorkflowFlow steps={flagship.workflow} title="How a call is handled" />
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-12">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          The supporting roles
        </div>
        <div className="mt-5 border-t border-border">
          {supporting.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 60}>
              <div className="grid gap-2 border-b border-border py-6 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-10">
                <h3 className="text-base font-semibold text-foreground">{a.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{a.summary}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <SecondaryCta label="See all AI employees" to="/ai-employees" location="home-agents" />
      </div>
    </Section>
  );
}

function Automations() {
  const featured = AUTOMATIONS.find((a) => a.featured) ?? AUTOMATIONS[0]!;
  const rest = AUTOMATIONS.filter((a) => a.slug !== featured.slug);
  return (
    <Section tone="muted" id="automations">
      <SectionHeading
        eyebrow="Automations"
        title="The follow-up your team means to do."
        intro="Connected workflows that run quietly in the background between a lead arriving and a job getting closed."
        center={false}
      />

      <Reveal>
        <div className="mt-12 rounded-3xl border border-border bg-card p-8 shadow-elegant md:p-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-primary">Most requested</div>
              <h3 className="mt-2 text-2xl md:text-3xl">{featured.name}</h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {featured.summary}
            </p>
          </div>
          <div className="mt-8">
            <WorkflowFlow steps={featured.workflow} />
          </div>
        </div>
      </Reveal>

      <div className="mt-12 border-t border-border">
        {rest.map((a, i) => (
          <Reveal key={a.slug} delay={(i % 3) * 60}>
            <div className="grid gap-2 border-b border-border py-6 md:grid-cols-[auto_minmax(0,16rem)_1fr] md:items-center md:gap-8">
              <span className="text-xs tracking-[0.16em] text-primary/70">
                {String(i + 2).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold text-foreground">{a.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{a.summary}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <SecondaryCta label="See all automations" to="/automations" location="home-automations" />
      </div>
    </Section>
  );
}

function Industries() {
  return (
    <Section id="industries">
      <SectionHeading
        eyebrow="Industries"
        title="Built for the trades where a missed call is a lost job."
        intro="Roofing, HVAC, and plumbing are where these systems earn their keep fastest — but any business running on calls, appointments, and quotes fits."
        center={false}
      />
      <div className="mt-12 space-y-5">
        {INDUSTRIES.map((ind, i) => (
          <Reveal key={ind.slug} delay={(i % 3) * 70}>
            <Link
              to="/industries"
              hash={ind.slug}
              className="group grid gap-6 rounded-2xl border border-border bg-card p-7 transition hover:border-primary/40 hover:shadow-elegant md:grid-cols-[minmax(0,20rem)_1fr] md:gap-10 md:p-8"
            >
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-primary">{ind.name}</div>
                <h3 className="mt-3 text-xl leading-snug text-foreground">{ind.headline}</h3>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  See the workflow{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
              <ol className="grid gap-3 sm:grid-cols-2">
                {ind.workflow.map((w, wi) => (
                  <li
                    key={w.label}
                    className="flex gap-3 rounded-xl border border-border bg-background px-4 py-3"
                  >
                    <span className="text-xs font-medium text-primary/70">{wi + 1}</span>
                    <span className="text-sm text-foreground">{w.label}</span>
                  </li>
                ))}
              </ol>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const STEPS = [
  {
    n: "01",
    t: "Discovery",
    c: "We map how calls, leads, scheduling, and follow-up actually work in your business today.",
  },
  {
    n: "02",
    t: "Strategy",
    c: "You get a prioritized plan: which systems to build first, what they'll handle, and what stays human.",
  },
  {
    n: "03",
    t: "Build & configure",
    c: "Scripts, intake questions, escalation rules, and integrations are configured around your workflow and approved by you.",
  },
  {
    n: "04",
    t: "Launch & optimize",
    c: "We go live, monitor real conversations and outcomes, and tune the system as your business changes.",
  },
];

function Process() {
  return (
    <Section tone="muted" id="process">
      <SectionHeading
        eyebrow="Our process"
        title="Deliberate, transparent, and built around you."
      />
      <div className="relative mt-14">
        <div
          className="pointer-events-none absolute left-[7px] top-2 bottom-2 w-px bg-primary/20 md:left-0 md:right-0 md:top-[7px] md:bottom-auto md:h-px md:w-auto"
          aria-hidden="true"
        />
        <ol className="grid gap-10 md:grid-cols-4 md:gap-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={(i % 4) * 80}>
              <li className="relative pl-8 md:pl-0 md:pt-8">
                <span
                  className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background md:top-0"
                  aria-hidden="true"
                />
                <div className="text-xs tracking-[0.18em] text-primary/70">{s.n}</div>
                <h3 className="mt-2 text-lg text-foreground">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.c}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

const GROWTH = [
  { icon: Globe, t: "Web design & rebuilds", c: "Fast, credible sites that make the phone ring." },
  { icon: Search, t: "SEO", c: "Get found by the customers already searching for your service." },
  { icon: Target, t: "Lead generation", c: "Campaigns pointed at pages built to convert." },
];

function GrowthServices() {
  return (
    <Section id="growth-services">
      <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <Eyebrow>Growth services</Eyebrow>
            <h2 className="mt-3 text-2xl md:text-3xl">The acquisition side, too.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Web design, SEO, and lead generation remain part of what we do — they're the
              infrastructure that feeds the AI systems answering and following up.
            </p>
            <div className="mt-7">
              <SecondaryCta
                label="Explore websites & growth"
                to="/growth-services"
                location="home-growth"
              />
            </div>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {GROWTH.map((g) => (
              <li key={g.t} className="flex items-start gap-4 py-5">
                <g.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="text-base text-foreground">{g.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{g.c}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Faq() {
  return (
    <Section tone="muted" id="faq">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Frequently asked" title="Questions, answered." />
        <div className="mt-12">
          <FaqList items={FAQS} />
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border bg-hero grain py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <Eyebrow>Get a free AI audit</Eyebrow>
          <h2 className="mt-3 text-3xl leading-[1.1] md:text-5xl">
            Find out what your business can{" "}
            <span className="text-gradient-gold">stop doing by hand.</span>
          </h2>
          <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">
            Tell us how calls and follow-up are handled today. We'll come back with a prioritized
            plan — including the parts we think should stay human.
          </p>
          <dl className="mt-10 space-y-4 border-t border-border pt-8 text-sm">
            <div className="flex flex-wrap gap-x-3">
              <dt className="text-muted-foreground">Phone</dt>
              <dd>
                <a
                  href={CONTACT.phoneHref}
                  className="font-medium text-foreground hover:text-primary"
                >
                  {CONTACT.phone}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap gap-x-3">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-medium text-foreground hover:text-primary"
                >
                  {CONTACT.email}
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap gap-x-3">
              <dt className="text-muted-foreground">Prefer to talk?</dt>
              <dd>
                <a
                  href={CONTACT.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground hover:text-primary"
                >
                  Book a 30-minute call
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <ContactForm source="Homepage" />
      </div>
    </section>
  );
}
