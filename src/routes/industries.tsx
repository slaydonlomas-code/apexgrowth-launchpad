import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, SectionHeading, CtaBand } from "@/components/site/PageShell";
import { IndustrySection } from "@/components/sections/IndustrySection";
import { Reveal } from "@/components/site/Reveal";
import { INDUSTRIES, OTHER_TRADES } from "@/content/industries";
import { getRequestOrigin } from "@/lib/origin.functions";

const TITLE = "AI Automation for Roofing, HVAC & Plumbing — ApexGrowth";
const DESCRIPTION =
  "How AI employees and automations fit the way roofing, HVAC, and plumbing companies actually run — storm surges, emergency triage, and after-hours calls included.";

export const Route = createFileRoute("/industries")({
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
        { property: "og:url", content: `${origin}/industries` },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
      ],
      links: [{ rel: "canonical", href: `${origin}/industries` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
              { "@type": "ListItem", position: 2, name: "Industries", item: `${origin}/industries` },
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
        eyebrow="Industries"
        title="Built for the trades where"
        highlight="a missed call is a lost job."
        intro="The same three problems show up in every service business: the phone rings when nobody can answer it, urgent work needs triage, and estimates go quiet. What changes is the vocabulary and the timing."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Industries" }]}
      />

      <Section>
        <div className="space-y-2">
          {INDUSTRIES.map((industry) => (
            <IndustrySection key={industry.slug} industry={industry} />
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Also a fit"
          title="Not on the list above?"
          intro="If your business runs on inbound calls, scheduled appointments, and quotes that need following up, the same systems apply. We serve businesses across the United States."
        />
        <div className="mt-10 flex flex-wrap gap-3">
          {OTHER_TRADES.map((t, i) => (
            <Reveal key={t} delay={(i % 6) * 50}>
              <span className="inline-flex rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm text-muted-foreground">
                {t}
              </span>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="See what this looks like in your operation."
        copy="The free AI audit maps your current call flow, follow-up, and scheduling — then shows what is worth automating first."
        location="industries-footer"
      />
    </PageShell>
  );
}
