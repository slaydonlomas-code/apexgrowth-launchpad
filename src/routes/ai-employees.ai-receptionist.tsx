import { createFileRoute } from "@tanstack/react-router";
import {
  PageShell,
  PageHero,
  Section,
  SectionHeading,
  CtaBand,
  PrimaryCta,
  SecondaryCta,
} from "@/components/site/PageShell";
import { CoverageTimeline } from "@/components/sections/CoverageTimeline";
import { WorkflowFlow } from "@/components/sections/WorkflowFlow";
import { CapabilityList } from "@/components/sections/CapabilityList";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { FaqSection, faqSchema, type FaqItem } from "@/components/sections/Faq";
import { Reveal } from "@/components/site/Reveal";
import { getAgent } from "@/content/agents";
import { getRequestOrigin } from "@/lib/origin.functions";

const agent = getAgent("ai-receptionist")!;

const TITLE = "AI Receptionist for Service Businesses — ApexGrowth";
const DESCRIPTION =
  "An AI receptionist that answers overflow, after-hours, and weekend calls in your business's voice, captures the details you need, and escalates real emergencies to a person.";

const FAQS: FaqItem[] = [
  {
    q: "Does it sound robotic?",
    a: "It is a natural-sounding voice system, and we configure the greeting, tone, and phrasing with you. It will not claim to be a human being if a caller asks directly — pretending damages trust far more than being an assistant does.",
  },
  {
    q: "What happens if it cannot answer a question?",
    a: "It follows the escalation rules you set. That can mean transferring to a person, taking a message with the specific details you asked for, or alerting your on-call contact immediately for emergencies.",
  },
  {
    q: "Do we control what it says?",
    a: "Yes. The greeting, intake questions, service area rules, hours, escalation triggers, and booking rules are all approved by you before launch and can be changed afterward.",
  },
  {
    q: "Does it replace our office staff?",
    a: "No. It covers the hours and overflow no staff can cover. Your team keeps the relationships, the judgment calls, and the conversations that need a person.",
  },
  {
    q: "Will it answer every call?",
    a: "You choose. Most businesses ring their own line first and let the system pick up only when nobody answers, or during defined after-hours windows.",
  },
  {
    q: "How long does setup take?",
    a: "It depends on how complex your call handling and escalation rules are. We scope the timeline during your free AI audit before any commitment.",
  },
];

export const Route = createFileRoute("/ai-employees/ai-receptionist")({
  loader: async () => ({ origin: await getRequestOrigin() }),
  head: ({ loaderData }) => {
    const origin = loaderData?.origin ?? "";
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${origin}/ai-employees/ai-receptionist` },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
      ],
      links: [{ rel: "canonical", href: `${origin}/ai-employees/ai-receptionist` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI Receptionist",
            serviceType: "AI phone answering for service businesses",
            provider: { "@type": "Organization", name: "ApexGrowth", url: `${origin}/` },
            areaServed: "US",
            description: DESCRIPTION,
          }),
        },
        { type: "application/ld+json", children: JSON.stringify(faqSchema(FAQS)) },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
              {
                "@type": "ListItem",
                position: 2,
                name: "AI Employees",
                item: `${origin}/ai-employees`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "AI Receptionist",
                item: `${origin}/ai-employees/ai-receptionist`,
              },
            ],
          }),
        },
      ],
    };
  },
  component: Page,
});

const GAPS = [
  {
    t: "Two calls at once",
    c: "One person can only be on one call. The second caller hears voicemail — or nothing.",
  },
  {
    t: "Lunch and drive time",
    c: "The phone still rings while your office is eating and your techs are between jobs.",
  },
  {
    t: "Evenings and weekends",
    c: "A large share of high-intent calls come in when no office is staffed.",
  },
  { t: "Sick days and turnover", c: "Coverage should not collapse because one person is out." },
];

function Page() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Flagship AI employee"
        title="Your receptionist shouldn't have to work 24/7"
        highlight="for your business to answer 24/7."
        intro="An AI receptionist answers the calls your team cannot get to — overflow, lunch breaks, evenings, weekends, holidays — using your greeting, your questions, and your escalation rules."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "AI Employees", to: "/ai-employees" },
          { label: "AI Receptionist" },
        ]}
      />

      <Section>
        <SectionHeading
          eyebrow="The real problem"
          title="The problem is coverage, not the employee."
          intro="Your office staff is not failing. There are simply more hours in the week than any person can answer a phone."
        />
        <div className="mt-12 border-t border-border">
          {GAPS.map((g, i) => (
            <Reveal key={g.t} delay={(i % 4) * 60}>
              <div className="grid items-start gap-x-10 gap-y-2 border-b border-border py-6 md:grid-cols-[auto_minmax(0,16rem)_1fr] md:items-center">
                <span className="text-xs tracking-[0.16em] text-primary/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-semibold text-foreground">{g.t}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{g.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <PrimaryCta location="receptionist-top" />
          <SecondaryCta label="Talk to a Human" to="/contact" location="receptionist-top" />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Coverage"
          title="A normal week, with and without digital coverage."
        />
        <div className="mt-12">
          <CoverageTimeline />
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="The call flow" title="What happens when the phone rings." />
        <div className="mt-12">
          <WorkflowFlow steps={agent.workflow} />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Capabilities" title="What it handles on every call." />
        <div className="mt-12">
          <CapabilityList items={agent.capabilities} columns={2} />
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <PrimaryCta location="receptionist-mid" />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Escalation"
          title="A person takes over the moment it matters."
          intro="Emergencies, complaints, pricing decisions, and any caller who asks for a human are routed to your team using rules you set. The system is a safety net, not a wall."
        />
        <div className="mt-14">
          <TeamGrid />
        </div>
      </Section>

      <FaqSection items={FAQS} eyebrow="Common questions" title="What owners ask us." />

      <CtaBand
        title="See what your call coverage actually looks like."
        copy="The free AI audit reviews how your calls are handled today and what an AI receptionist would realistically change."
        location="receptionist-footer"
      />
    </PageShell>
  );
}
