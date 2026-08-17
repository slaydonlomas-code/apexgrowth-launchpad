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
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 70}>
              <a
                href={`#${a.slug}`}
                className="flex h-full flex-col rounded-2xl border border-border bg-background/50 p-6 transition hover:-translate-y-1 hover:border-primary/40"
              >
                <div className="text-xs font-medium uppercase tracking-[0.15em] text-primary">{a.flagship ? "Flagship" : "AI employee"}</div>
                <h3 className="mt-2 text-lg">{a.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{a.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
                  Read more <ArrowRight className="h-4 w-4" />
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
