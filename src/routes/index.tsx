import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, Sparkles, TrendingUp, Smartphone, Target, Gauge,
  Layout, RefreshCw, Search, MousePointerClick, Wrench, Check, ChevronDown,
  Phone, MailIcon, Calendar, Star, Building2, HardHat, Home as HomeIcon,
  Wind, Droplets, UtensilsCrossed, Stethoscope, Briefcase, ShoppingCart, Store,
} from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CookieBanner } from "@/components/site/CookieBanner";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { Logo } from "@/components/site/Logo";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => ({ origin: await getRequestOrigin() }),
  head: ({ loaderData }) => {
    const origin = loaderData?.origin ?? "";
    const ogImage = `${origin}/og-image.jpg`;
    const title = "ApexGrowth — Websites Built to Help Your Business Grow";
    const description = "ApexGrowth designs high-converting websites, SEO, and digital growth systems that help businesses attract more customers and generate more qualified leads.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${origin}/` },
        { property: "og:image", content: ogImage },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: `${origin}/` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
});

function Home() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Trust />
        <Services />
        <Consultation />
        <Industries />
        <Process />
        <Why />
        <Results />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-hero grain pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-[520px] w-[520px] translate-x-1/3 rounded-full bg-primary/10 blur-[130px]" />
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-soft">
            <Sparkles className="h-3.5 w-3.5" /> Web design & digital growth
          </div>
          <h1 className="animate-fade-up mt-6 text-4xl leading-[1.06] md:text-5xl lg:text-6xl">
            Websites built to help your <span className="text-gradient-gold">business grow.</span>
          </h1>
          <p className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            ApexGrowth designs high-converting websites and digital growth systems that help businesses attract more customers,
            build credibility, and generate more qualified leads online.
          </p>
          <div className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90">
              Book a Free Consultation <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#services" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-7 py-3.5 text-sm font-medium text-foreground transition hover:border-primary/60">
              Explore Our Services
            </a>
          </div>
          <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span>Serving businesses nationwide</span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
            <span>Conversion-focused design</span>
            <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
            <span>SEO-ready structure</span>
          </div>
        </div>
        <Reveal delay={120}>
          <HeroMockup />
        </Reveal>
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="overflow-hidden rounded-2xl border border-border bg-card/70 shadow-elegant backdrop-blur">
        <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
          <div className="ml-3 h-5 flex-1 rounded-full border border-border bg-background/70" />
        </div>
        <div className="p-5">
          <div className="rounded-xl border border-border bg-background/60 p-5">
            <Logo size={26} />
            <div className="mt-4 h-2.5 w-2/3 rounded-full bg-gold-gradient opacity-80" />
            <div className="mt-2.5 h-2 w-full rounded-full bg-muted" />
            <div className="mt-2 h-2 w-4/5 rounded-full bg-muted" />
            <div className="mt-4 flex gap-2">
              <div className="h-7 w-28 rounded-full bg-gold-gradient" />
              <div className="h-7 w-24 rounded-full border border-border" />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {["Traffic", "Leads", "Calls"].map((label) => (
              <div key={label} className="rounded-xl border border-border bg-background/50 p-3">
                <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</div>
                <div className="mt-2 flex items-end gap-1">
                  {[40, 62, 48, 80, 96].map((h, i) => (
                    <span key={i} className="w-1.5 rounded-sm bg-gold-gradient" style={{ height: `${h * 0.28}px`, opacity: 0.4 + i * 0.14 }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-background/50 p-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">New inquiry</div>
              <div className="mt-1 h-2 w-28 rounded-full bg-muted" />
            </div>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gold-gradient text-primary-foreground">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card/90 px-5 py-4 shadow-elegant backdrop-blur sm:block">
        <div className="text-[10px] uppercase tracking-[0.15em] text-gold-soft">Built for conversion</div>
        <div className="mt-1 text-sm text-foreground">Clear next step on every page</div>
      </div>
    </div>
  );
}

/* ---------- TRUST ---------- */
const values = [
  { icon: Layout, title: "Custom, conversion-focused design", copy: "Websites designed around your brand, services, and the customers you want to reach." },
  { icon: Smartphone, title: "Mobile-friendly development", copy: "Responsive layouts that look and work right on phones, tablets, and desktops." },
  { icon: Search, title: "Search engine optimization", copy: "Clean structure, page content, and metadata built with search visibility in mind." },
  { icon: Gauge, title: "Fast, reliable performance", copy: "Lightweight builds that load quickly and stay dependable as your business grows." },
  { icon: MousePointerClick, title: "Clear calls to action", copy: "Every page guides visitors toward calling, submitting a form, or booking time." },
  { icon: Wrench, title: "Ongoing growth and support", copy: "Continued updates, monitoring, and improvements after your site goes live." },
];
function Trust() {
  return (
    <section className="border-y border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Why work with us</div>
            <h2 className="mt-3 text-3xl md:text-5xl">A stronger first impression, built to convert.</h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 80}>
              <div className="h-full rounded-2xl border border-border bg-card/50 p-6 transition hover:-translate-y-1 hover:border-primary/40">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold-gradient text-primary-foreground shadow-gold">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SERVICES ---------- */
const services = [
  { icon: Layout, title: "Custom Website Design", copy: "Modern, professional websites designed around each business's brand, goals, services, and target customers." },
  { icon: RefreshCw, title: "Website Redesign", copy: "Transform outdated, confusing, or underperforming websites into modern experiences that are easier to navigate and designed to generate more leads." },
  { icon: Search, title: "Search Engine Optimization", copy: "Optimize website structure, page content, metadata, speed, and local visibility to help improve your presence in search results." },
  { icon: Target, title: "Conversion Optimization", copy: "Improve calls to action, forms, page layouts, messaging, and customer journeys so more visitors call, submit a form, or schedule a consultation." },
  { icon: Smartphone, title: "Mobile Optimization", copy: "Ensure every website looks professional, loads correctly, and is easy to use across phones, tablets, laptops, and desktops." },
  { icon: Wrench, title: "Website Maintenance & Support", copy: "Ongoing website updates, performance monitoring, technical support, and improvements as your business grows." },
];
function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Services</div>
              <h2 className="mt-3 max-w-2xl text-3xl md:text-5xl">What we do for growing businesses.</h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Design, development, search visibility, and ongoing optimization — delivered as one coordinated effort instead of
              disconnected projects.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 70}>
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-card/40 p-7 transition hover:-translate-y-1 hover:border-primary/40 hover:bg-card/70">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-background/60 text-primary transition group-hover:border-transparent group-hover:bg-gold-gradient group-hover:text-primary-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
                <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition group-hover:gap-3">
                  Learn more <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONSULTATION (replaces pricing) ---------- */
function Consultation() {
  return (
    <section className="border-y border-border bg-card/30 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Our approach</div>
          <h2 className="mt-3 text-3xl md:text-5xl">Solutions built around your business.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            Every business has different goals, challenges, and growth opportunities. Instead of offering a one-size-fits-all
            package, we recommend the right solution after learning more about your business.
          </p>
          <a href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90">
            Get a Free Consultation <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- INDUSTRIES ---------- */
const industries = [
  { icon: HomeIcon, label: "Home services" },
  { icon: HardHat, label: "Contractors" },
  { icon: Building2, label: "Roofing companies" },
  { icon: Wind, label: "HVAC companies" },
  { icon: Droplets, label: "Plumbing companies" },
  { icon: UtensilsCrossed, label: "Restaurants" },
  { icon: Store, label: "Local service businesses" },
  { icon: Briefcase, label: "Professional services" },
  { icon: Stethoscope, label: "Healthcare practices" },
  { icon: ShoppingCart, label: "E-commerce businesses" },
];
function Industries() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Industries</div>
            <h2 className="mt-3 text-3xl md:text-5xl">Digital solutions for growing businesses.</h2>
            <p className="mt-4 text-muted-foreground">
              We work with businesses throughout the United States. These are examples of the industries we support — not a
              complete list. If your business needs a better online presence, we can help.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {industries.map((it, i) => (
            <Reveal key={it.label} delay={(i % 5) * 60}>
              <div className="flex h-full items-center gap-3 rounded-xl border border-border bg-card/40 px-4 py-4 transition hover:border-primary/40">
                <it.icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground/90">{it.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
const steps = [
  { n: "01", t: "Discovery", c: "We learn about the business, its customers, current challenges, and growth goals." },
  { n: "02", t: "Strategy", c: "We create a website and digital strategy based on the business's goals and target audience." },
  { n: "03", t: "Design and Development", c: "We design and build a professional, responsive, and conversion-focused website." },
  { n: "04", t: "Launch and Growth", c: "We launch the website, test its performance, and continue improving its ability to generate results." },
];
function Process() {
  return (
    <section id="process" className="scroll-mt-24 border-y border-border bg-card/30 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Our process</div>
            <h2 className="mt-3 text-3xl md:text-5xl">Deliberate, transparent, and effective.</h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="relative h-full rounded-2xl border border-border bg-background/50 p-7 transition hover:-translate-y-1 hover:border-primary/40">
                <div className="text-3xl font-medium text-gradient-gold">{s.n}</div>
                <div className="mt-3 text-lg">{s.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-12 text-center">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90">
              Book a Free Consultation <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- WHY ---------- */
const differentiators = [
  "Personalized strategy for each business",
  "Modern, professional design",
  "Conversion-focused layouts",
  "SEO-ready website structure",
  "Responsive, straightforward communication",
  "Solutions designed for long-term growth",
  "No generic, one-size-fits-all approach",
];
function Why() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 md:grid-cols-2 md:px-8">
        <Reveal>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Why ApexGrowth</div>
            <h2 className="mt-3 text-3xl leading-[1.1] md:text-5xl">
              A partner focused on your <span className="text-gradient-gold">long-term growth.</span>
            </h2>
            <p className="mt-6 text-muted-foreground">
              Many websites are built to look finished and then left alone. We build for the way customers actually make decisions —
              clear messaging, easy navigation, and an obvious next step — then keep improving it after launch.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="rounded-full bg-gold-gradient px-6 py-3 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90">
                Book a Free Consultation
              </a>
              <a href="https://calendly.com/slaydon-lomas/30min" target="_blank" rel="noreferrer" className="rounded-full border border-border px-6 py-3 text-sm transition hover:border-primary/60">
                Schedule on Calendly
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <ul className="grid gap-3">
            {differentiators.map((d) => (
              <li key={d} className="flex items-start gap-3 rounded-xl border border-border bg-card/40 p-4">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-gradient text-primary-foreground">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm text-foreground/90">{d}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- RESULTS ---------- */
const projects = [
  {
    type: "Home services company",
    title: "Outdated site rebuilt for lead capture",
    challenge: "An aging website that was difficult to read on mobile and gave visitors no clear way to request service.",
    solution: "A rebuilt, mobile-first site with service pages, a persistent call button, and a short request form on every page.",
    outcome: "A clearer, faster site with a single obvious next step on each page.",
  },
  {
    type: "Professional services firm",
    title: "Credibility-first redesign",
    challenge: "A generic template that did not reflect the quality of the firm's work or explain its services clearly.",
    solution: "A custom design system, restructured service content, and a consultation flow built around the firm's process.",
    outcome: "A presentation that matches the standard of the work being offered.",
  },
  {
    type: "Local retail & service business",
    title: "Search-ready site structure",
    challenge: "Pages with thin content and no metadata, making the business hard to find in search results.",
    solution: "Rewritten page structure, descriptive titles and metadata, improved page speed, and local listing alignment.",
    outcome: "A technically sound foundation for ongoing search visibility work.",
  },
];
const testimonials = [
  { name: "Marcus D.", role: "Owner, D&C Contracting", quote: "Our new site brought in more qualified leads in the first month than our old site did in a year. ApexGrowth clearly knows what they're doing." },
  { name: "Erin P.", role: "Founder, Bright Smile Dental", quote: "The booking system alone saved us hours a week. It looks like a million dollars and works even better." },
  { name: "Jared M.", role: "Owner, Coastal HVAC", quote: "They didn't just build a website — they built a system that actually generates business. Best money we've spent." },
];
function Results() {
  return (
    <section id="results" className="scroll-mt-24 border-y border-border bg-card/30 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Results</div>
            <h2 className="mt-3 text-3xl md:text-5xl">The kind of work we do.</h2>
            <p className="mt-4 text-muted-foreground">
              Representative examples of the challenges we solve and the improvements we make. Results vary by business, market, and
              timeline.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/60 transition hover:-translate-y-1 hover:border-primary/40">
                <div className="relative aspect-[16/10] border-b border-border bg-hero p-5">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-card/60 p-4">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                      <span className="h-2 w-2 rounded-full bg-muted-foreground/20" />
                    </div>
                    <div>
                      <div className="h-2.5 w-2/3 rounded-full bg-gold-gradient opacity-80" />
                      <div className="mt-2 h-2 w-full rounded-full bg-muted" />
                      <div className="mt-1.5 h-2 w-5/6 rounded-full bg-muted" />
                      <div className="mt-3 h-6 w-24 rounded-full bg-gold-gradient opacity-90" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-xs uppercase tracking-[0.15em] text-gold-soft">{p.type}</div>
                  <h3 className="mt-2 text-lg">{p.title}</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Challenge</dt>
                      <dd className="mt-1 text-foreground/85">{p.challenge}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Solution</dt>
                      <dd className="mt-1 text-foreground/85">{p.solution}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.15em] text-muted-foreground">Outcome</dt>
                      <dd className="mt-1 text-foreground/85">{p.outcome}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-background/60 p-7">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, idx) => <Star key={idx} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-4 flex-1 leading-relaxed text-foreground/90">"{t.quote}"</blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <div className="text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- ABOUT ---------- */
function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">About</div>
            <h2 className="mt-3 text-3xl leading-[1.1] md:text-5xl">
              A web design and digital growth agency for <span className="text-gradient-gold">businesses that are ready.</span>
            </h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              ApexGrowth helps businesses across the United States improve how they show up online. We design and build websites,
              improve search visibility, and refine the details that determine whether a visitor becomes a customer.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We keep engagements personal and direct. You work with the people building your site, decisions are explained in plain
              language, and the work is scoped around your actual goals rather than a preset package.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="rounded-full bg-gold-gradient px-6 py-3 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90">
                Book a Free Consultation
              </a>
              <a href="tel:3373853084" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm transition hover:border-primary/60">
                <Phone className="h-4 w-4 text-primary" /> 337-385-3084
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Who we help", c: "Local, service-based, professional, and e-commerce businesses nationwide." },
              { t: "What we focus on", c: "Clarity, credibility, speed, and a straightforward path to contact." },
              { t: "How we work", c: "Discovery first, strategy second, build third, improvement ongoing." },
              { t: "What you get", c: "A site your team can be proud of and customers can actually use." },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl border border-border bg-card/40 p-6">
                <div className="text-base">{b.t}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.c}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const faqs = [
  { q: "What types of businesses do you work with?", a: "We work with a wide range of businesses, including home services, contractors, roofing, HVAC, plumbing, restaurants, professional services, healthcare practices, e-commerce, and other local service businesses. These are examples rather than a complete list." },
  { q: "Do you only work with businesses in one state?", a: "No. ApexGrowth works with businesses throughout the United States. Our process is handled remotely through calls, email, and shared project updates." },
  { q: "How long does it take to build a website?", a: "Timelines depend on the size of the site, the number of pages, and how quickly content and feedback are available. We provide a realistic timeline after learning about your project during the free consultation." },
  { q: "Can you redesign my existing website?", a: "Yes. Website redesign is one of our core services. We can modernize the design, restructure the content, improve mobile usability, and make it easier for visitors to take the next step." },
  { q: "Do you provide SEO services?", a: "Yes. We optimize website structure, page content, metadata, page speed, and local visibility. We do not guarantee specific rankings, as search results depend on many factors outside any agency's control." },
  { q: "Will my website work on mobile devices?", a: "Yes. Every site we build is developed responsively and tested across phones, tablets, laptops, and desktops." },
  { q: "Do you provide ongoing support?", a: "Yes. We offer ongoing updates, performance monitoring, technical support, and continued improvements after launch." },
  { q: "How much does a website cost?", a: "Cost depends on the size of the project, the features required, the amount of content, and your goals. Because every business is different, we recommend a solution after learning about your needs. Schedule a free consultation for a personalized recommendation." },
  { q: "What happens during the free consultation?", a: "We ask about your business, your current website, your customers, and your goals. We then discuss the opportunities we see and recommend practical next steps. There is no obligation to move forward." },
];
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-24 border-y border-border bg-card/30 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Frequently asked</div>
            <h2 className="mt-3 text-3xl md:text-5xl">Questions, answered.</h2>
          </div>
        </Reveal>
        <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-background/50">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-card/40"
                  aria-expanded={isOpen}
                >
                  <span className="text-base text-foreground">{f.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`} />
                </button>
                <div className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="min-h-0 px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-hero grain py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Free consultation</div>
          <h2 className="mt-3 text-3xl leading-[1.1] md:text-5xl">
            Ready to improve your <span className="text-gradient-gold">online presence?</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Tell us about your business, current website, and growth goals. We'll discuss the opportunities we see and recommend the
            best next steps during a free consultation.
          </p>
          <div className="mt-8 space-y-4">
            <a href="tel:3373853084" className="flex items-center gap-3 text-foreground/90 transition hover:text-primary">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background/50"><Phone className="h-4 w-4 text-primary" /></span>
              337-385-3084
            </a>
            <a href="mailto:apexgrowthsolutions@gmail.com" className="flex items-center gap-3 break-all text-foreground/90 transition hover:text-primary">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background/50"><MailIcon className="h-4 w-4 text-primary" /></span>
              apexgrowthsolutions@gmail.com
            </a>
            <a
              href="https://calendly.com/slaydon-lomas/30min"
              target="_blank" rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm transition hover:border-primary/60"
            >
              <Calendar className="h-4 w-4 text-primary" /> Book Your Free Consultation
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
