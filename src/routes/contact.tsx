import { createFileRoute } from "@tanstack/react-router";
import { Phone, MailIcon, Calendar } from "lucide-react";
import { PageShell, Section, Eyebrow } from "@/components/site/PageShell";
import { ContactForm } from "@/components/site/ContactForm";
import { CONTACT } from "@/content/site";
import { getRequestOrigin } from "@/lib/origin.functions";

const TITLE = "Contact ApexGrowth — Talk to a Human";
const DESCRIPTION =
  "Call, email, or book time with ApexGrowth to talk through AI receptionists, automations, and growth systems for your service business.";

export const Route = createFileRoute("/contact")({
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
        { property: "og:url", content: `${origin}/contact` },
        { name: "twitter:title", content: TITLE },
        { name: "twitter:description", content: DESCRIPTION },
      ],
      links: [{ rel: "canonical", href: `${origin}/contact` }],
    };
  },
  component: Page,
});

function Page() {
  return (
    <PageShell>
      <section className="bg-hero grain pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[0.95fr_1.15fr] lg:items-start">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-3 text-4xl leading-[1.08] md:text-5xl">
              Talk to a <span className="text-gradient-gold">human.</span>
            </h1>
            <p className="mt-5 text-muted-foreground">
              Tell us how calls, leads, and follow-up are handled today. We will tell you honestly
              what is worth automating and what should stay with your team.
            </p>
            <div className="mt-10 divide-y divide-border border-y border-border">
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-4 py-4 text-foreground transition hover:text-primary"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card">
                  <Phone className="h-4 w-4 text-primary" />
                </span>
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-4 break-all py-4 text-foreground transition hover:text-primary"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-card">
                  <MailIcon className="h-4 w-4 text-primary" />
                </span>
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.calendly}
                target="_blank"
                rel="noreferrer"
                className="my-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/60 hover:text-primary"
              >
                <Calendar className="h-4 w-4 text-primary" /> Book a consultation
              </a>
            </div>
          </div>
          <ContactForm source="Contact page" />
        </div>
      </section>
      <Section>
        <p className="text-center text-sm text-muted-foreground">
          ApexGrowth works with contractors and service businesses throughout the United States.
        </p>
      </Section>
    </PageShell>
  );
}
