import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell, PageHero, Section, SectionHeading, CtaBand, PrimaryCta, SecondaryCta } from "@/components/site/PageShell";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { AgentSection } from "@/components/sections/AgentSection";
import { CoverageTimeline } from "@/components/sections/CoverageTimeline";
import { Reveal } from "@/components/site/Reveal";
import { AGENTS } from "@/content/agents";
import { getRequestOrigin } from "@/lib/origin.functions";

const TITLE = "AI Employees for Service Businesses — ApexGrowth";
const DESCRIPTION =
  "Give your team digital teammates: an AI receptionist, lead agent, follow-up agent, scheduling agent, and CRM assistant built around how your business already works.";

export const Route = createFileRoute("/ai-employees/")({
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
        { property: "og:url", content: `${origin}/ai-employees` },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
      ],
      links: [{ rel: "canonical", href: `${origin}/ai-employees` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
              { "@type": "ListItem", position: 2, name: "AI Employees", item: `${origin}/ai-employees` },
            ],
          }),
        },
      ],
    };
  },
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Digital workforce"
        title="Give your team"
        highlight="digital teammates."
        intro="AI employees handle the repeatable work that never stops — answering, qualifying, scheduling, and following up — so the people you employ can focus on relationships, judgment, and the work itself."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "AI Employees" }]}
      />

      <Section tone="muted">
        <SectionHeading
          eyebrow="How the split works"
          title="Humans do the human work. Digital teammates cover the rest."
          intro="We are not trying to replace your staff. We are trying to make sure a call at 8 PM, a form at midnight, and an estimate nobody chased do not quietly cost you jobs."
        />
        <div className="mt-14">
          <TeamGrid />
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="The coverage gap"
          title="The problem is coverage, not the employee."
          intro="Nobody can staff a phone twenty-four hours a day. Here is what a normal week looks like with and without digital coverage."
        />
        <div className="mt-12">
          <CoverageTimeline />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Meet the team"
          title="Five digital teammates."
          intro="Each one is built and configured around your workflow, scripts, and systems. Start with one — most businesses do — and add the others as they earn their place."
          center={false}
        />
        <div className="mt-12 border-t border-border">
          {AGENTS.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 60}>
              <a
                href={`#${a.slug}`}
                className="group grid items-baseline gap-x-8 gap-y-2 border-b border-border py-6 transition hover:bg-card/70 md:grid-cols-[auto_minmax(0,16rem)_1fr_auto] md:items-center md:px-2"
              >
                <span className="text-xs tracking-[0.16em] text-primary/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-semibold text-foreground">{a.name}</span>
                  {a.flagship && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" /> Flagship
                    </span>
                  )}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">{a.tagline}</span>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary md:justify-self-end">
                  Read more{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>


      <Section>
        {AGENTS.map((a) => (
          <AgentSection key={a.slug} agent={a} link={a.flagship ? "/ai-employees/ai-receptionist" : undefined} />
        ))}
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="How we build"
          title="Configured around your business, not a template."
          intro="Your scripts, your service area, your hours, your escalation rules, and the systems you already use. We scope all of it during your free AI audit before anything is built."
        />
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <PrimaryCta location="ai-employees-build" />
          <SecondaryCta label="See the automations" to="/automations" location="ai-employees-build" />
        </div>
      </Section>

      <CtaBand
        title="Not sure which teammate to start with?"
        copy="The free AI audit maps where calls, leads, and follow-up are leaking, then recommends the one or two systems worth building first."
        location="ai-employees-footer"
      />

      <Section>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Prefer to talk it through?{" "}
            <Link to="/contact" className="text-primary underline underline-offset-4">
              Contact ApexGrowth
            </Link>
          </p>
        </div>
      </Section>
    </PageShell>
  );
}
