import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection, LegalList } from "@/components/site/LegalPage";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — ApexGrowth" },
      { name: "description", content: "General informational disclaimer for the ApexGrowth website, including results and third-party services." },
      { property: "og:title", content: "Disclaimer — ApexGrowth" },
      { property: "og:description", content: "General informational disclaimer for the ApexGrowth website." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LegalPage title="Disclaimer" updated="January 2026">
      <LegalSection heading="General Information Only">
        <p>
          The content on this website is provided for general informational purposes. It does not constitute professional, legal,
          financial, or marketing advice for any specific business or situation.
        </p>
      </LegalSection>

      <LegalSection heading="No Guarantee of Results">
        <LegalList items={[
          "Results vary by business, industry, market, budget, competition, and timing.",
          "We do not guarantee specific search engine rankings or placement.",
          "We do not guarantee any particular volume of leads, calls, form submissions, or sales.",
          "We do not guarantee revenue, profit, or business outcomes of any kind.",
        ]} />
        <p>
          Any examples, descriptions of past work, or discussion of improvements are illustrative and are not a promise of comparable
          results for your business.
        </p>
      </LegalSection>

      <LegalSection heading="Third-Party Links and Services">
        <p>
          This site may reference or link to third-party websites, platforms, and tools. Those services operate independently and
          maintain their own terms, pricing, policies, and availability. We are not responsible for their content or performance.
        </p>
      </LegalSection>

      <LegalSection heading="Accuracy and Changes">
        <p>
          We work to keep information current, but content may become outdated or contain errors. Services, capabilities, and
          descriptions may change without notice.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about this disclaimer? Email <a href="mailto:apexgrowthsolutions@gmail.com">apexgrowthsolutions@gmail.com</a> or
          call <a href="tel:3373853084">337-385-3084</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
