import type { ReactNode } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section className="bg-hero grain border-b border-border pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Legal</div>
            <h1 className="mt-3 text-4xl md:text-5xl">{title}</h1>
            <p className="mt-4 text-sm text-muted-foreground">Last updated: {updated}</p>
          </div>
        </section>
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <div className="mb-12 rounded-2xl border border-primary/25 bg-card p-6 text-sm leading-relaxed text-muted-foreground shadow-elegant">
              <strong className="text-foreground">Please note:</strong> This page is a general
              template maintained by ApexGrowth. It is not legal advice and should be reviewed by a
              qualified attorney before publication. Bracketed items such as [Company Legal Name]
              are placeholders that still need company-specific information.
            </div>
            <div className="space-y-12">{children}</div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl text-foreground md:text-2xl">{heading}</h2>
      <div className="mt-4 max-w-prose space-y-4 text-[0.95rem] leading-7 text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-2">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}
