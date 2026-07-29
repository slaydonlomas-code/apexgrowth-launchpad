import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection, LegalList } from "@/components/site/LegalPage";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — ApexGrowth" },
      { name: "description", content: "What cookies are, which types the ApexGrowth website may use, and how visitors can manage them." },
      { property: "og:title", content: "Cookie Policy — ApexGrowth" },
      { property: "og:description", content: "What cookies the ApexGrowth website may use and how to manage them." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LegalPage title="Cookie Policy" updated="January 2026">
      <LegalSection heading="What Are Cookies?">
        <p>
          Cookies are small text files placed on your device when you visit a website. They help sites function correctly, remember
          preferences, and understand how visitors interact with content. Similar technologies include local storage, pixels, and
          tags.
        </p>
      </LegalSection>

      <LegalSection heading="Types of Cookies This Site May Use">
        <LegalList items={[
          "Strictly necessary cookies — required for core site functionality, security, and remembering your cookie choice.",
          "Functional cookies — remember preferences such as previously entered form details or interface settings.",
          "Analytics cookies — help us understand which pages are viewed and how the site performs, so we can improve it.",
          "Third-party technologies — set by services we use, such as scheduling and form processing providers.",
        ]} />
        <p>Current third-party technologies in use: [List of Cookie Providers].</p>
      </LegalSection>

      <LegalSection heading="Your Cookie Choices">
        <p>
          When you first visit, a banner lets you accept cookies or continue with necessary cookies only. You can change your choice
          at any time by clearing this site's data in your browser, which will make the banner appear again on your next visit.
        </p>
      </LegalSection>

      <LegalSection heading="Managing Cookies in Your Browser">
        <p>
          Most browsers let you view, block, or delete cookies through their settings. Blocking some cookies may affect how parts of
          this website function. Browser help pages for Chrome, Safari, Firefox, and Edge explain the available controls.
        </p>
      </LegalSection>

      <LegalSection heading="Related Policies">
        <p>
          For more on how information is handled, see our Privacy Policy.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about cookies? Email <a href="mailto:apexgrowthsolutions@gmail.com">apexgrowthsolutions@gmail.com</a> or call{" "}
          <a href="tel:3373853084">337-385-3084</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
