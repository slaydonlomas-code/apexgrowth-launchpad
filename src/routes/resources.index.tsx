import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero, Section, CtaBand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";
import { RESOURCES } from "@/content/resources";
import { getRequestOrigin } from "@/lib/origin.functions";

const TITLE = "Resources for Service Businesses — ApexGrowth";
const DESCRIPTION =
  "Practical guides on call coverage, follow-up, and what AI can and cannot do for contractors and service businesses.";

export const Route = createFileRoute("/resources/")({
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
        { property: "og:url", content: `${origin}/resources` },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
      ],
      links: [{ rel: "canonical", href: `${origin}/resources` }],
    };
  },
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Resources"
        title="Straight answers about"
        highlight="AI, calls, and follow-up."
        intro="No hype and no magic. These are the same explanations we give owners before they decide whether automation is worth it."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Resources" }]}
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {RESOURCES.map((r, i) => (
            <Reveal key={r.slug} delay={(i % 2) * 90}>
              <Link
                to="/resources/$slug"
                params={{ slug: r.slug }}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card/40 p-8 transition hover:border-primary/40"
              >
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                  <span>{r.category}</span>
                  <span className="text-muted-foreground/60">{r.readMinutes} min read</span>
                </div>
                <h2 className="mt-4 text-xl leading-snug text-foreground md:text-2xl">{r.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{r.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm text-primary">
                  Read the guide <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Rather have it applied to your business?"
        copy="The free AI audit turns these ideas into a specific, prioritized plan for your operation."
        location="resources-footer"
      />
    </PageShell>
  );
}
