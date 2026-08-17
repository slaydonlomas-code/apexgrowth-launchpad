import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";

const company = [
  { href: "/#about", label: "About ApexGrowth" },
  { href: "/ai-employees", label: "AI Employees" },
  { href: "/automations", label: "Automations" },
  { href: "/ai-audit", label: "Free AI Audit" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Our Process" },
  { href: "/#results", label: "Results" },
  { href: "/#contact", label: "Contact" },
];

const services = [
  "Website Design",
  "Website Redesign",
  "Search Engine Optimization",
  "Conversion Optimization",
  "Mobile Optimization",
  "Website Maintenance",
];

const legal = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms-and-conditions", label: "Terms and Conditions" },
  { to: "/cookie-policy", label: "Cookie Policy" },
  { to: "/accessibility-statement", label: "Accessibility Statement" },
  { to: "/disclaimer", label: "Disclaimer" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo size={38} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            ApexGrowth designs high-converting websites and digital growth systems for businesses across the United States.
          </p>
          <a
            href="/ai-audit"
            className="mt-6 inline-flex rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90"
          >
            Get a Free AI Audit
          </a>
        </div>

        <FooterCol title="Company">
          {company.map((c) => (
            <li key={c.label}><a href={c.href} className="transition hover:text-foreground">{c.label}</a></li>
          ))}
        </FooterCol>

        <FooterCol title="Services">
          {services.map((s) => (
            <li key={s}><a href="/#services" className="transition hover:text-foreground">{s}</a></li>
          ))}
        </FooterCol>

        <div className="space-y-8">
          <FooterCol title="Legal">
            {legal.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-foreground">{l.label}</Link>
              </li>
            ))}
          </FooterCol>
          <FooterCol title="Contact">
            <li><a href="tel:3373853084" className="transition hover:text-foreground">337-385-3084</a></li>
            <li><a href="mailto:apexgrowthsolutions@gmail.com" className="break-all transition hover:text-foreground">apexgrowthsolutions@gmail.com</a></li>
            <li>
              <a href="https://calendly.com/slaydon-lomas/30min" target="_blank" rel="noreferrer" className="transition hover:text-foreground">
                Schedule on Calendly
              </a>
            </li>
          </FooterCol>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-border px-5 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:px-8">
        <div>© 2026 ApexGrowth. All rights reserved.</div>
        <div>Serving businesses nationwide across the United States.</div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">{title}</div>
      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}
