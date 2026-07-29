import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection, LegalList } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ApexGrowth" },
      { name: "description", content: "How ApexGrowth collects, uses, and protects information submitted through our website forms and analytics." },
      { property: "og:title", content: "Privacy Policy — ApexGrowth" },
      { property: "og:description", content: "How ApexGrowth collects, uses, and protects information submitted through our website." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <LegalPage title="Privacy Policy" updated="January 2026">
      <LegalSection heading="Overview">
        <p>
          This Privacy Policy explains how ApexGrowth ("ApexGrowth," "we," "us") handles information collected through this website.
          By using the site, you agree to the practices described here.
        </p>
      </LegalSection>

      <LegalSection heading="Information We Collect">
        <p>We may collect the following categories of information:</p>
        <LegalList items={[
          "Contact details you submit through our consultation or contact forms, such as your name, email address, phone number, business name, and current website.",
          "Project details you choose to share, including goals, budget range, and any message content you write.",
          "Website usage information such as pages visited, referring pages, approximate location derived from IP address, browser type, and device type.",
          "Cookies and similar technologies as described in our Cookie Policy.",
        ]} />
      </LegalSection>

      <LegalSection heading="How We Use Information">
        <LegalList items={[
          "To respond to inquiries and schedule consultations.",
          "To prepare proposals and recommendations for your business.",
          "To operate, secure, maintain, and improve the website.",
          "To send project-related communications you have requested.",
          "To comply with legal obligations.",
        ]} />
        <p>We do not sell your personal information.</p>
      </LegalSection>

      <LegalSection heading="Third-Party Service Providers">
        <p>
          We use third-party services to operate this website and our business. These may include form processing, scheduling,
          hosting, email, and website analytics providers. These providers process information on our behalf and have their own
          privacy policies. Current providers include [List of Service Providers].
        </p>
      </LegalSection>

      <LegalSection heading="Data Retention">
        <p>
          We retain inquiry and client information for as long as necessary to respond to your request, provide services, and meet
          recordkeeping or legal requirements. Retention period: [Retention Period].
        </p>
      </LegalSection>

      <LegalSection heading="Data Security">
        <p>
          We take reasonable technical and organizational measures intended to protect information submitted through this website.
          No method of transmission or storage over the internet can be guaranteed to be completely secure.
        </p>
      </LegalSection>

      <LegalSection heading="Your Privacy Rights">
        <p>
          Depending on where you live, you may have rights to request access to, correction of, or deletion of your personal
          information, or to object to certain processing. To make a request, contact us using the details below. We may need to
          verify your identity before responding.
        </p>
      </LegalSection>

      <LegalSection heading="Children's Privacy">
        <p>This website is intended for business audiences and is not directed to children.</p>
      </LegalSection>

      <LegalSection heading="Changes to This Policy">
        <p>We may update this Privacy Policy from time to time. The updated date at the top of this page reflects the latest revision.</p>
      </LegalSection>

      <LegalSection heading="Contact Us">
        <p>
          Questions about privacy? Email <a href="mailto:apexgrowthsolutions@gmail.com">apexgrowthsolutions@gmail.com</a> or call{" "}
          <a href="tel:3373853084">337-385-3084</a>. Mailing address: [Company Mailing Address].
        </p>
      </LegalSection>
    </LegalPage>
  );
}
