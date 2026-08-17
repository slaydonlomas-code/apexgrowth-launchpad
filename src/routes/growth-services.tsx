import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, SectionHeading, CtaBand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Globe, Search, Target, Gauge, Smartphone, ShieldCheck } from "lucide-react";
import { getRequestOrigin } from "@/lib/origin.functions";

const TITLE = "Growth Services: Web Design, SEO & Lead Generation — ApexGrowth";
const DESCRIPTION =
  "Websites, SEO, lead generation, and conversion work that feed the AI systems handling your calls, follow-up, and booking.";

export const Route = createFileRoute("/growth-services")({
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
        { property: "og:url", content: `${origin}/growth-services` },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
      ],
      links: [{ rel: "canonical", href: `${origin}/growth-services` }],
    };
  },
  component: Page,
});

const SERVICES = [
  {
    icon: Globe,
    t: "Website design & rebuilds",
    c: "Fast, credible sites that make the phone ring and hand every lead straight to your AI systems.",
  },
  {
    icon: Search,
    t: "SEO",
    c: "Technical foundations, service pages, and content built so the right customers find you organically.",
  },
  {
    icon: Target,
    t: "Lead generation",
    c: "Paid and organic campaigns pointed at pages designed to convert, not just look good.",
  },
  {
    icon: Gauge,
    t: "Conversion optimization",
    c: "Clearer offers, better forms, faster load times — more booked work from the traffic you already have.",
  },
  {
    icon: Smartphone,
    t: "Mobile experience",
    c: "Most service-business traffic is on a phone with one hand free. That is the design constraint.",
  },
  {
    icon: ShieldCheck,
    t: "Maintenance & support",
    c: "Updates, monitoring, and fixes so the system that captures your leads never quietly breaks.",
  },
];

function Page() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Growth services"
        title="The traffic side of the system,"
        highlight="handled too."
        intro="AI employees answer and follow up. Growth services make sure there is something worth answering. We still build the websites, SEO, and campaigns that generate the calls — now feeding directly into automation."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Growth Services" }]}
      />

      <Section>
        <SectionHeading
          eyebrow="What we offer"
          title="Marketing that hands off cleanly to your digital workforce."
        />
        <div className="mt-12 grid gap-x-12 border-t border-border md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Reveal key={s.t} delay={(i % 3) * 70}>
              <div className="flex h-full items-start gap-5 border-b border-border py-7">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/5 text-primary">
                  <s.icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.c}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="How they fit together"
          title="Generating leads you cannot answer is an expensive mistake."
          intro="Spending more on marketing while calls roll to voicemail just raises the cost of every lost job. That is why we usually fix coverage and follow-up first, then turn up the volume."
        />
      </Section>

      <CtaBand
        title="Not sure which side needs work first?"
        copy="The free AI audit looks at both — where leads come from and what happens to them after they arrive."
        location="growth-services-footer"
      />
    </PageShell>
  );
}
