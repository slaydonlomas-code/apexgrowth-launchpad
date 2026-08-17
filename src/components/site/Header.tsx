import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { CONTACT } from "@/content/site";

const links = [
  { href: "/ai-employees", label: "AI Employees" },
  { href: "/automations", label: "Automations" },
  { href: "/growth-services", label: "Websites" },
  { href: "/industries", label: "Industries" },
  { href: "/resources", label: "Resources" },
  { href: "/#how-it-works", label: "About" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border bg-background/90 backdrop-blur-md shadow-[0_1px_0_0_var(--border)]"
          : "border-b border-transparent bg-background/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 md:px-8">
        <a href="/#top" className="flex items-center gap-2 rounded-md" aria-label="ApexGrowth home">
          <Logo size={32} />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={CONTACT.phoneHref}
            className="hidden items-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition hover:text-foreground xl:flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" /> {CONTACT.phone}
          </a>
          <a
            href="/ai-audit"
            className="rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold transition hover:opacity-90"
          >
            Get a Free AI Audit
          </a>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border bg-card text-foreground lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1 p-5">
            {[{ href: "/", label: "Home" }, ...links, { href: "/contact", label: "Contact" }].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-foreground transition hover:bg-muted"
              >
                {l.label}
              </a>
            ))}
            <a
              href={CONTACT.phoneHref}
              className="flex items-center gap-2 px-2 py-3 text-sm text-muted-foreground"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> {CONTACT.phone}
            </a>
            <a
              href="/ai-audit"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gold-gradient px-5 py-3.5 text-center text-sm font-semibold text-primary-foreground shadow-gold"
            >
              Get a Free AI Audit
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
