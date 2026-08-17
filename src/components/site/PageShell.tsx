import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";
import { Reveal } from "@/components/site/Reveal";
import { CTA } from "@/content/site";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div id="top" className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">{children}</div>;
}

export function PrimaryCta({
  label = CTA.primary.label,
  to = CTA.primary.to,
  className = "",
  location,
}: {
  label?: string;
  to?: string;
  className?: string;
  location?: string;
}) {
  return (
    <Link
      to={to as never}
      data-cta="primary"
      data-cta-location={location}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90 ${className}`}
    >
      {label} <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function SecondaryCta({
  label = CTA.secondary.label,
  to = CTA.secondary.to,
  className = "",
  location,
}: {
  label?: string;
  to?: string;
  className?: string;
  location?: string;
}) {
  return (
    <Link
      to={to as never}
      data-cta="secondary"
      data-cta-location={location}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-7 py-3.5 text-sm font-medium text-foreground transition hover:border-primary/60 ${className}`}
    >
      {label}
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  highlight,
  intro,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  intro: string;
  breadcrumbs?: Array<{ label: string; to?: string }>;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-hero grain pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-[520px] w-[520px] translate-x-1/3 rounded-full bg-primary/10 blur-[130px]" />
      </div>
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
            {breadcrumbs.map((b, i) => (
              <span key={b.label} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3 w-3" />}
                {b.to ? (
                  <Link to={b.to as never} className="transition hover:text-foreground">{b.label}</Link>
                ) : (
                  <span className="text-foreground/80">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="animate-fade-up mt-4 max-w-3xl text-4xl leading-[1.08] md:text-5xl lg:text-6xl">
          {title} {highlight && <span className="text-gradient-gold">{highlight}</span>}
        </h1>
        <p className="animate-fade-up mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>
        <div className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row">{children ?? <><PrimaryCta location="hero" /><SecondaryCta location="hero" /></>}</div>
      </div>
    </section>
  );
}

export function Section({
  id,
  children,
  tone = "base",
  className = "",
}: {
  id?: string;
  children: ReactNode;
  tone?: "base" | "muted";
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 md:py-28 ${tone === "muted" ? "border-y border-border bg-card/30" : "bg-background"} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  center?: boolean;
}) {
  return (
    <Reveal>
      <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-3 text-3xl md:text-5xl">{title}</h2>
        {intro && <p className="mt-4 leading-relaxed text-muted-foreground">{intro}</p>}
      </div>
    </Reveal>
  );
}

export function CtaBand({
  title,
  copy,
  location,
}: {
  title: string;
  copy: string;
  location: string;
}) {
  return (
    <section className="border-y border-border bg-hero grain py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <Reveal>
          <h2 className="text-3xl md:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{copy}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryCta location={location} />
            <SecondaryCta label="Talk to a Human" to="/contact" location={location} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
