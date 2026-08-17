import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, SectionHeading, CtaBand } from "@/components/site/PageShell";
import { AutomationSection } from "@/components/sections/AutomationSection";
import { AUTOMATIONS } from "@/content/automations";
import { getRequestOrigin } from "@/lib/origin.functions";

const TITLE = "AI Automations for Contractors — ApexGrowth";
const DESCRIPTION =
  "Missed-call text-back, estimate follow-up, lead reactivation, review requests, and custom workflows built around how your service business already runs.";

export const Route = createFileRoute("/automations")({
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
        { property: "og:url", content: `${origin}/automations` },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
      ],
      links: [{ rel: "canonical", href: `${origin}/automations` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
              { "@type": "ListItem", position: 2, name: "Automations", item: `${origin}/automations` },
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
        eyebrow="Automations"
        title="The follow-up your team means to do,"
        highlight="running on its own."
        intro="Automations handle the repeatable steps between a lead coming in and a job getting closed — the ones that quietly get skipped when the schedule fills up."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Automations" }]}
      />

      <Section>
        <SectionHeading
          eyebrow="Start here"
          title="Missed-call text-back is where most businesses start."
          intro="It is the fastest to turn on and it addresses the most common way service businesses lose work."
        />
        <div className="mt-12">
          {AUTOMATIONS.filter((a) => a.featured).map((a) => (
            <AutomationSection key={a.slug} automation={a} />
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="The rest of the stack" title="Automations we build most often." />
        <div className="mt-6">
          {AUTOMATIONS.filter((a) => !a.featured).map((a) => (
            <AutomationSection key={a.slug} automation={a} />
          ))}
        </div>
      </Section>

      <CtaBand
        title="Which of these is worth building first?"
        copy="The free AI audit reviews your current process and returns a prioritized list — including the parts we think should stay human."
        location="automations-footer"
      />
    </PageShell>
  );
}
