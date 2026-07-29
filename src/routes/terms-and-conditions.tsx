import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection, LegalList } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions — ApexGrowth" },
      { name: "description", content: "The terms that govern use of the ApexGrowth website, including intellectual property, acceptable use, and liability." },
      { property: "og:title", content: "Terms and Conditions — ApexGrowth" },
      { property: "og:description", content: "The terms that govern use of the ApexGrowth website." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LegalPage title="Terms and Conditions" updated="January 2026">
      <LegalSection heading="Acceptance of Terms">
        <p>
          By accessing or using the ApexGrowth website, you agree to these Terms and Conditions. If you do not agree, please do not
          use the site. These terms apply to the website only; services are governed by a separate written agreement.
        </p>
      </LegalSection>

      <LegalSection heading="Use of the Website">
        <p>
          You may use this website for lawful purposes related to learning about our services and contacting us. Information on the
          site is provided for general informational purposes and may change without notice.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual Property">
        <p>
          The content, design, layout, graphics, logos, and code on this website are owned by ApexGrowth or its licensors and are
          protected by applicable intellectual property laws. You may not copy, reproduce, republish, or redistribute site content
          without written permission, except for ordinary personal or internal business reference.
        </p>
      </LegalSection>

      <LegalSection heading="Acceptable Use">
        <p>You agree not to:</p>
        <LegalList items={[
          "Use the site in a way that violates any applicable law or regulation.",
          "Attempt to gain unauthorized access to the site, its servers, or connected systems.",
          "Introduce malicious code, scrape at a disruptive volume, or interfere with site operation.",
          "Submit false, misleading, or unlawful information through our forms.",
        ]} />
      </LegalSection>

      <LegalSection heading="Third-Party Links and Services">
        <p>
          This site may link to third-party websites or tools, including scheduling and form services. We do not control those
          services and are not responsible for their content, availability, or policies. Your use of them is subject to their terms.
        </p>
      </LegalSection>

      <LegalSection heading="No Warranties">
        <p>
          The website is provided "as is" and "as available" without warranties of any kind, whether express or implied, to the
          fullest extent permitted by law.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of Liability">
        <p>
          To the maximum extent permitted by law, ApexGrowth will not be liable for indirect, incidental, special, consequential, or
          punitive damages arising from your use of, or inability to use, this website.
        </p>
      </LegalSection>

      <LegalSection heading="Governing Law">
        <p>These terms are governed by the laws of [Governing State/Jurisdiction], without regard to conflict of law principles.</p>
      </LegalSection>

      <LegalSection heading="Changes to These Terms">
        <p>We may revise these terms at any time. Continued use of the website after changes are posted constitutes acceptance.</p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms? Email <a href="mailto:apexgrowthsolutions@gmail.com">apexgrowthsolutions@gmail.com</a> or call{" "}
          <a href="tel:3373853084">337-385-3084</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
