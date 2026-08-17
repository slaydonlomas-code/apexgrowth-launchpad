import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section, SectionHeading, Eyebrow } from "@/components/site/PageShell";
import { CapabilityList } from "@/components/sections/CapabilityList";
import { ContactForm } from "@/components/site/ContactForm";
import { getRequestOrigin } from "@/lib/origin.functions";

const TITLE = "Free AI Audit for Service Businesses — ApexGrowth";
const DESCRIPTION =
  "A free review of where calls, leads, and follow-up are leaking in your business, plus a prioritized roadmap of the automations worth building first.";

export const Route = createFileRoute("/ai-audit")({
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
        { property: "og:url", content: `${origin}/ai-audit` },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
      ],
      links: [{ rel: "canonical", href: `${origin}/ai-audit` }],
    };
  },
  component: Page,
});

const COVERS = [
  "A review of the repetitive tasks your team performs every week",
  "Where calls and leads are going unanswered today",
  "Response-time gaps after hours, on weekends, and during overflow",
  "Which AI employees or automations would help first",
  "A prioritized roadmap, in order of impact",
  "An honest note on anything that should stay human",
];

export default function noop() {}

function Page() {
  return (
    <PageShell>
      <section className="bg-hero grain pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>Free AI audit</Eyebrow>
            <h1 className="mt-3 text-4xl leading-[1.08] md:text-5xl">
              Find out what your business can <span className="text-gradient-gold">stop doing by hand.</span>
            </h1>
            <p className="mt-5 text-muted-foreground">
              A short, practical review of how calls, leads, scheduling, and follow-up are handled today — and which systems are
              worth building first. No cost, no obligation.
            </p>
            <div className="mt-8">
              <CapabilityList items={COVERS} columns={1} />
            </div>
          </div>
          <ContactForm source="AI Audit" />
        </div>
      </section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="What it is not"
          title="Not a sales pitch with a countdown timer."
          intro="If automation is not the right answer for part of your operation, we will say so. Anything we do recommend is scoped around your actual workflow, scripts, and systems before a single thing gets built."
        />
      </Section>
    </PageShell>
  );
}
