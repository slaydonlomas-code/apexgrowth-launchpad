import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, Sparkles, TrendingUp, Smartphone, Target, MapPin,
  Layout, RefreshCw, Users, Calendar, Search, Mail, MessageSquare, Star, Megaphone, Bot, BarChart3,
  Phone, MailIcon, Check, ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { Estimator } from "@/components/site/Estimator";
import { ContactForm } from "@/components/site/ContactForm";
import { Logo } from "@/components/site/Logo";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => ({ origin: await getRequestOrigin() }),
  head: ({ loaderData }) => {
    const origin = loaderData?.origin ?? "";
    const ogImage = `${origin}/og-image.jpg`;
    const title = "ApexGrowth — Websites & Lead Generation for Local Businesses";
    const description = "Premium websites, lead capture systems, CRM setup, and growth automation designed to turn visitors into customers.";
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
    <div id="top" className="relative min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Trust />
        <Services />
        <Why />
        <Process />
        <Pricing />
        <EstimatorSection />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-hero grain pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-soft">
          <Sparkles className="h-3.5 w-3.5" /> Premium websites & growth systems
        </div>
        <h1 className="animate-fade-up mt-6 text-4xl leading-[1.05] md:text-6xl lg:text-7xl">
          Websites and lead systems <br className="hidden md:block" />
          built to <span className="text-gradient-gold">grow your business.</span>
        </h1>
        <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          ApexGrowth partners with local and service-based businesses to design high-converting websites, install lead capture systems, and automate growth — end to end.
        </p>
        <div className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90">
            Get a Free Quote <ArrowRight className="h-4 w-4" />
          </a>
          <a href="https://calendly.com/slaydon-lomas/30min" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-7 py-3.5 text-sm font-medium text-foreground transition hover:border-primary/60">
            Book a Call
          </a>
        </div>
        <div className="animate-fade-up mt-14 flex items-center justify-center gap-8 opacity-70">
          <Logo size={40} />
        </div>
      </div>
    </section>
  );
}

/* ---------- TRUST / VALUE ---------- */
const values = [
  { icon: TrendingUp, title: "More qualified leads", copy: "Systems that turn traffic into booked calls and inbound requests — not just clicks." },
  { icon: Smartphone, title: "Flawless on mobile", copy: "Mobile-first designs that load fast and convert on the device your customers actually use." },
  { icon: Target, title: "Conversion focused", copy: "Every section, button, and headline is placed to guide visitors toward the next step." },
  { icon: MapPin, title: "Built for local business", copy: "We understand service businesses, local SEO, and what it takes to win in your market." },
];
function Trust() {
  return (
    <section className="border-y border-border bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Why owners choose us</div>
            <h2 className="mt-3 text-3xl md:text-5xl">A better first impression. A steadier stream of leads.</h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="group h-full rounded-2xl border border-border bg-card/50 p-6 transition hover:-translate-y-1 hover:border-primary/40">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold-gradient text-primary-foreground shadow-gold">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.copy}</p>
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
  { icon: Layout, title: "Website Design", copy: "Custom, high-converting websites built for your brand." },
  { icon: RefreshCw, title: "Website Redesign", copy: "Modernize an outdated site into a premium digital presence." },
  { icon: Target, title: "Lead Generation", copy: "Funnels and forms that turn visitors into qualified inquiries." },
  { icon: Users, title: "CRM Setup", copy: "Organize every lead and client in one place — nothing slips through." },
  { icon: Calendar, title: "Booking Systems", copy: "Let customers book you 24/7 without back-and-forth calls." },
  { icon: Search, title: "SEO & Local SEO", copy: "Rank where your customers are searching, on Google and Maps." },
  { icon: Mail, title: "Email Marketing", copy: "Automated sequences that nurture leads and drive repeat sales." },
  { icon: MessageSquare, title: "SMS Automation", copy: "High-open, high-response messaging for offers and reminders." },
  { icon: Star, title: "Review Generation", copy: "Systematically build the online reputation you deserve." },
  { icon: Megaphone, title: "Paid Ads Management", copy: "Meta and Google campaigns focused on measurable ROI." },
  { icon: Bot, title: "AI Chatbot Integration", copy: "Capture and qualify leads around the clock." },
  { icon: BarChart3, title: "Analytics & Optimization", copy: "Track what matters and improve month over month." },
];
function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Services</div>
              <h2 className="mt-3 max-w-2xl text-3xl md:text-5xl">Everything you need to attract, capture, and close.</h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              A full stack of growth services — from your first website to a fully automated lead machine — delivered under one roof.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 60}>
              <div className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card/40 p-6 transition hover:border-primary/40 hover:bg-card/70">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-background/60 text-primary transition group-hover:bg-gold-gradient group-hover:text-primary-foreground group-hover:border-transparent">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY ---------- */
const differentiators = [
  "Conversion-driven design, not just aesthetics",
  "Mobile-first performance from day one",
  "Systems that generate leads — beyond a pretty website",
  "Clean, modern craftsmanship on every project",
  "Fast turnaround without cutting corners",
  "Growth-minded partnership, not one-and-done delivery",
];
function Why() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-card/30 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 md:grid-cols-2 md:px-8">
        <Reveal>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Why ApexGrowth</div>
            <h2 className="mt-3 text-3xl md:text-5xl leading-[1.1]">
              A partner obsessed with your <span className="text-gradient-gold">bottom line.</span>
            </h2>
            <p className="mt-6 text-muted-foreground">
              Most agencies deliver a website and walk away. We build the entire growth system — design, capture, follow-up, automation — and stay in it with you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="rounded-full bg-gold-gradient px-6 py-3 text-sm font-medium text-primary-foreground shadow-gold">
                Start your project
              </a>
              <a href="https://calendly.com/slaydon-lomas/30min" target="_blank" rel="noreferrer" className="rounded-full border border-border px-6 py-3 text-sm">
                Book a Call
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <ul className="grid gap-3">
            {differentiators.map((d) => (
              <li key={d} className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4">
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

/* ---------- PROCESS ---------- */
const steps = [
  { n: "01", t: "Discovery", c: "We learn your business, offer, customers, and where the opportunity really is." },
  { n: "02", t: "Strategy", c: "We map the site, funnels, and systems tailored to your growth goals." },
  { n: "03", t: "Build", c: "Design and engineering focused on brand, speed, and conversion." },
  { n: "04", t: "Launch", c: "Careful QA, integrations, tracking, and a smooth go-live." },
  { n: "05", t: "Optimize", c: "Ongoing analytics, iteration, and improvements to lift performance." },
];
function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Process</div>
            <h2 className="mt-3 text-3xl md:text-5xl">Deliberate. Transparent. Effective.</h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-card/40 p-6 transition hover:border-primary/40">
                <div className="text-3xl text-gradient-gold font-medium">{s.n}</div>
                <div className="mt-3 text-base">{s.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PRICING ---------- */
const tiers = [
  {
    name: "Starter Website",
    price: "$450–$500",
    sub: "One-time",
    tag: "Get online fast",
    features: ["1-page or basic multi-page site", "Mobile-friendly design", "Contact form", "Call button + map embed", "Simple branding", "Fast delivery"],
    best: "Businesses that need to get online quickly.",
    highlight: false,
  },
  {
    name: "Online Presence Setup",
    price: "$1,000–$2,500",
    sub: "One-time",
    tag: "Look the part",
    features: ["Full custom website (5–7 pages)", "Google Business Profile optimization", "Lead forms", "Basic SEO setup", "Mobile optimization", "Branding improvements"],
    best: "Businesses that want to look professional and get discovered.",
    highlight: false,
  },
  {
    name: "Lead Generation System",
    price: "$3,000–$6,000",
    sub: "+ $300–$800/mo",
    tag: "Most popular",
    features: ["Everything in Presence, plus:", "CRM setup", "Appointment booking system", "Email marketing setup", "SMS automation", "Review generation system", "Advanced local SEO"],
    best: "Businesses wanting consistent, predictable leads.",
    highlight: true,
  },
  {
    name: "Done-For-You Growth Machine",
    price: "$6,000–$15,000+",
    sub: "+ $800–$2,500/mo",
    tag: "Scale up",
    features: ["Everything in Lead Gen, plus:", "Facebook Ads management", "Google Ads management", "Landing pages", "AI chatbot for leads", "Full analytics tracking", "Monthly optimization"],
    best: "Businesses ready for full growth and scaling.",
    highlight: false,
  },
];
function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 border-y border-border bg-card/30 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Pricing</div>
            <h2 className="mt-3 text-3xl md:text-5xl">Engagements sized to where you are.</h2>
            <p className="mt-4 text-muted-foreground">Transparent tiers. Every project is scoped and confirmed in discovery.</p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-4">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 70}>
              <div className={`relative flex h-full flex-col rounded-2xl border p-7 transition ${
                t.highlight
                  ? "border-primary/60 bg-gradient-to-b from-primary/10 to-transparent shadow-gold"
                  : "border-border bg-background/50 hover:border-primary/40"
              }`}>
                {t.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-primary-foreground shadow-gold">
                    Most popular
                  </div>
                )}
                <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">{t.tag}</div>
                <div className="mt-3 text-xl">{t.name}</div>
                <div className="mt-4 flex items-baseline gap-2">
                  <div className="text-3xl text-gradient-gold font-medium">{t.price}</div>
                </div>
                <div className="text-xs text-muted-foreground">{t.sub}</div>
                <ul className="mt-6 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-xs text-muted-foreground italic">Best for: {t.best}</p>
                <a
                  href="#contact"
                  className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition ${
                    t.highlight
                      ? "bg-gold-gradient text-primary-foreground shadow-gold hover:opacity-90"
                      : "border border-border text-foreground hover:border-primary/60"
                  }`}
                >
                  Request this tier
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- ESTIMATOR ---------- */
function EstimatorSection() {
  return (
    <section id="estimator" className="scroll-mt-24 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Interactive Estimator</div>
            <h2 className="mt-3 text-3xl md:text-5xl">Model your engagement.</h2>
            <p className="mt-4 text-muted-foreground">A quick way to explore scope. Actual scope is confirmed during discovery.</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Estimator />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
const testimonials = [
  { name: "Marcus D.", role: "Owner, D&C Contracting", quote: "Our new site brought in more qualified leads in the first month than our old site did in a year. ApexGrowth clearly knows what they're doing." },
  { name: "Erin P.", role: "Founder, Bright Smile Dental", quote: "The booking system alone saved us hours a week. It looks like a million dollars and works even better." },
  { name: "Jared M.", role: "Owner, Coastal HVAC", quote: "They didn't just build a website — they built a system that actually generates business. Best money we've spent." },
];
function Testimonials() {
  return (
    <section className="border-y border-border bg-card/30 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Client results</div>
            <h2 className="mt-3 text-3xl md:text-5xl">Trusted by growing local businesses.</h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-background/60 p-7">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-4 flex-1 text-foreground/90 leading-relaxed">"{t.quote}"</blockquote>
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

/* ---------- FAQ ---------- */
const faqs = [
  { q: "How much does a project cost?", a: "Projects range from $450 for a Starter site to $15,000+ for a full growth machine, plus optional monthly retainers. Every scope is confirmed in a discovery call before any commitment." },
  { q: "How long does a build take?", a: "Starter sites launch in about a week. Presence sites take 2–3 weeks. Lead Gen and Growth engagements typically go live in 3–5 weeks depending on scope." },
  { q: "How many revisions are included?", a: "Every tier includes structured revision rounds at design and pre-launch stages. We work closely so you're never surprised at handoff." },
  { q: "Do you handle SEO?", a: "Yes. Foundational and local SEO is included from the Presence tier upward, and advanced ongoing SEO is available as a monthly add-on." },
  { q: "Can I book a consultation before deciding?", a: "Absolutely — the discovery call is free. Book a time on our Calendly and we'll map out what would move the needle for your business." },
  { q: "Do you set up CRMs and automation?", a: "Yes. Lead Gen and Growth engagements include CRM setup, booking, email/SMS automation, and review generation." },
  { q: "What happens after launch?", a: "You can continue with a monthly retainer for hosting, updates, optimization, and marketing, or run it yourself — your call." },
];
function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-24 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Frequently asked</div>
            <h2 className="mt-3 text-3xl md:text-5xl">Questions, answered.</h2>
          </div>
        </Reveal>
        <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card/40">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-background/40"
                  aria-expanded={isOpen}
                >
                  <span className="text-base text-foreground">{f.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`} />
                </button>
                <div className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="min-h-0 px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
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
    <section id="contact" className="scroll-mt-24 border-t border-border bg-hero grain py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Start your project</div>
          <h2 className="mt-3 text-3xl md:text-5xl leading-[1.1]">
            Let's build something <span className="text-gradient-gold">that grows your business.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Tell us about your business. We'll follow up within one business day to schedule a discovery call.
          </p>
          <div className="mt-8 space-y-4">
            <a href="tel:3373853084" className="flex items-center gap-3 text-foreground/90 hover:text-primary transition">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background/50"><Phone className="h-4 w-4 text-primary" /></span>
              337-385-3084
            </a>
            <div className="flex items-center gap-3 text-foreground/90">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background/50"><MailIcon className="h-4 w-4 text-primary" /></span>
              apexgrowthsolutions@gmail.com
            </div>
            <a
              href="https://calendly.com/slaydon-lomas/30min"
              target="_blank" rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm transition hover:border-primary/60"
            >
              <Calendar className="h-4 w-4 text-primary" /> Book a 30-min call
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Logo size={40} />

          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Premium websites and lead generation systems for local and service-based businesses. Built for growth, not just launch.
          </p>
          <a
            href="https://calendly.com/slaydon-lomas/30min"
            target="_blank" rel="noreferrer"
            className="mt-6 inline-flex rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-gold"
          >
            Book a Call
          </a>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Navigation</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="#services" className="hover:text-foreground">Services</a></li>
            <li><a href="#process" className="hover:text-foreground">Process</a></li>
            <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
            <li><a href="#estimator" className="hover:text-foreground">Estimator</a></li>
            <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
            <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Contact</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="tel:3373853084" className="hover:text-foreground">337-385-3084</a></li>
            <li>apexgrowthsolutions@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-border px-5 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:px-8">
        <div>© {new Date().getFullYear()} ApexGrowth. All rights reserved.</div>
        <div>Premium websites & growth systems</div>
      </div>
    </footer>
  );
}
