import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section } from "@/components/site/PageShell";
import { GrowthAssessment } from "@/components/sections/GrowthAssessment";
import { getRequestOrigin } from "@/lib/origin.functions";

const TITLE = "Free Growth Readiness Assessment | ApexGrowth";
const DESCRIPTION =
  "Evaluate your lead response, follow-up, operations, and website conversion systems with ApexGrowth's free Growth Readiness Assessment.";

export const Route = createFileRoute("/resources/growth-readiness-assessment")({
  loader: async () => ({ origin: await getRequestOrigin() }),
  head: ({ loaderData }) => {
    const origin = loaderData?.origin ?? "https://apexgrwthsolutions.com";
    const url = `${origin}/resources/growth-readiness-assessment`;
    return {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free business assessment"
        title="Growth Readiness"
        highlight="Assessment."
        intro="See how prepared your business is to capture leads, follow up consistently, reduce manual work, and convert more opportunities. Your answers stay in your browser and are not saved or submitted."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Resources", to: "/resources" },
          { label: "Growth Readiness Assessment" },
        ]}
      />

      <Section>
        <GrowthAssessment />
      </Section>
    </PageShell>
  );
}
