import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero, Section, SectionHeading } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { SavingsCalculator } from "@/components/sections/SavingsCalculator";
import { getRequestOrigin } from "@/lib/origin.functions";

const TITLE = "Automation Savings Calculator | ApexGrowth";
const DESCRIPTION =
  "Estimate the time, labor costs, and revenue opportunities your service business could address with better follow-up and workflow automation.";

export const Route = createFileRoute("/resources/automation-savings-calculator")({
  loader: async () => ({ origin: await getRequestOrigin() }),
  head: ({ loaderData }) => {
    const origin = loaderData?.origin ?? "https://apexgrwthsolutions.com";
    const url = `${origin}/resources/automation-savings-calculator`;
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

const EXPLAINERS = [
  {
    h: "What this calculator estimates",
    p: "It combines two things most service businesses lose quietly: leads that never get a timely response, and hours spent on repetitive administrative work. Both are entered by you, and both are converted into a monthly and annual opportunity figure.",
  },
  {
    h: "How the lead side is calculated",
    p: "Your monthly leads are multiplied by the share you believe are missed or followed up late. That number is multiplied by your close rate, then by a conservative 35% recovery assumption — meaning the estimate only counts about a third of those leads as realistically winnable. The result is multiplied by your average customer value.",
  },
  {
    h: "How the labor side is calculated",
    p: "Weekly repetitive-work hours are converted to a monthly figure (4.33 weeks), multiplied by the share of that work that could reasonably be automated, then by your hourly labor cost. That gives an estimated monthly labor-time value.",
  },
  {
    h: "How to read the result",
    p: "Treat the output as a directional planning figure, not a promise. It is most useful for deciding whether follow-up automation is worth a conversation, and for spotting whether your bigger opportunity sits in lead response or in administrative time.",
  },
];

function Page() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Free tool"
        title="Automation Savings"
        highlight="Calculator."
        intro="Estimate the time, labor costs, and revenue opportunities your service business could address with better follow-up and workflow automation. Everything runs in your browser — nothing you enter is saved or sent anywhere."
        breadcrumbs={[
          { label: "Home", to: "/" },
          { label: "Resources", to: "/resources" },
          { label: "Automation Savings Calculator" },
        ]}
      >
        <span className="sr-only">Scroll to the calculator below</span>
      </PageHero>

      <Section>
        <SavingsCalculator />
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="How it works"
          title="What the numbers mean."
          center={false}
          intro="The math is simple on purpose, so you can sanity-check every figure it produces."
        />
        <div className="mt-12 divide-y divide-border border-y border-border">
          {EXPLAINERS.map((e, i) => (
            <Reveal key={e.h} delay={i * 70}>
              <div className="grid gap-4 py-8 md:grid-cols-[1fr_1.6fr] md:gap-12 md:py-10">
                <h2 className="text-xl leading-snug text-foreground md:text-2xl">{e.h}</h2>
                <p className="leading-relaxed text-muted-foreground">{e.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          These estimates are illustrative and based on the information and assumptions entered.
          Actual results depend on your business, implementation, lead quality, processes, and
          market conditions. ApexGrowth does not guarantee specific savings or revenue.
        </p>
      </Section>
    </PageShell>
  );
}
