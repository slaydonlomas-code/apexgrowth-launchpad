import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection, LegalList } from "@/components/site/LegalPage";

export const Route = createFileRoute("/accessibility-statement")({
  head: () => ({
    meta: [
      { title: "Accessibility Statement — ApexGrowth" },
      { name: "description", content: "ApexGrowth's ongoing commitment to making our website usable for as many visitors as possible." },
      { property: "og:title", content: "Accessibility Statement — ApexGrowth" },
      { property: "og:description", content: "ApexGrowth's ongoing commitment to website accessibility." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LegalPage title="Accessibility Statement" updated="January 2026">
      <LegalSection heading="Our Commitment">
        <p>
          ApexGrowth is committed to improving the accessibility and usability of this website so that as many people as possible can
          use it comfortably, including people who use assistive technologies.
        </p>
      </LegalSection>

      <LegalSection heading="What We Work Toward">
        <LegalList items={[
          "Readable text sizes and sufficient color contrast.",
          "Descriptive labels on form fields and buttons.",
          "Keyboard-operable navigation and interactive elements.",
          "Meaningful headings and page structure.",
          "Responsive layouts that work across phones, tablets, and desktops.",
        ]} />
      </LegalSection>

      <LegalSection heading="Conformance Status">
        <p>
          We use the Web Content Accessibility Guidelines (WCAG) as a reference for our improvements. We have not completed a formal
          third-party accessibility audit, so we do not claim full conformance with any specific standard or legal requirement.
          Accessibility is an ongoing effort and some areas of the site may not yet meet every guideline.
        </p>
      </LegalSection>

      <LegalSection heading="Third-Party Content">
        <p>
          Some features may rely on third-party services, such as scheduling or form tools. We do not control the accessibility of
          those services.
        </p>
      </LegalSection>

      <LegalSection heading="Feedback">
        <p>
          If you encounter a barrier on this website, please tell us so we can address it. Email{" "}
          <a href="mailto:apexgrowthsolutions@gmail.com">apexgrowthsolutions@gmail.com</a> or call{" "}
          <a href="tel:3373853084">337-385-3084</a>. We aim to respond within [Response Timeframe].
        </p>
      </LegalSection>
    </LegalPage>
  );
}
