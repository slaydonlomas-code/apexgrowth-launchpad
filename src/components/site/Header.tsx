import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
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

const automationsSubmenu = [
  { href: "/automations", label: "Automations Overview" },
  { href: "/resources/automation-savings-calculator", label: "Automation Savings Calculator" },
  { href: "/resources/growth-readiness-assessment", label: "Growth Readiness Assessment" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [autoOpen, setAutoOpen] = useState(false);
  const [mobileAutoOpen, setMobileAutoOpen] = useState(false);
  const autoRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setAutoOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (autoRef.current && !autoRef.current.contains(e.target as Node)) setAutoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setAutoOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setAutoOpen(false), 140);
  };

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
          {links.map((l) =>
            l.label === "Automations" ? (
              <div
                key={l.href}
                ref={autoRef}
                className="relative"
                onMouseEnter={openMenu}
                onMouseLeave={scheduleClose}
                onFocus={openMenu}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setAutoOpen(false);
                }}
              >
                <div className="flex items-center gap-1">
                  <a
                    href={l.href}
                    className="rounded-md text-sm font-medium text-muted-foreground transition hover:text-foreground"
                  >
                    {l.label}
                  </a>
                  <button
                    type="button"
                    aria-expanded={autoOpen}
                    aria-controls="automations-submenu"
                    aria-label="Toggle Automations submenu"
                    onClick={() => setAutoOpen((v) => !v)}
                    className="rounded-md p-1 text-muted-foreground transition hover:text-foreground"
                  >
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition ${autoOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <ul
                  id="automations-submenu"
                  hidden={!autoOpen}
                  className="absolute left-0 top-full z-50 mt-3 w-72 rounded-2xl border border-border bg-card p-2 shadow-elegant"
                >
                  {automationsSubmenu.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        onClick={() => setAutoOpen(false)}
                        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <span className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground">
                      AI Growth Audit
                      <span className="rounded-full bg-green/10 px-2 py-0.5 text-xs font-medium text-green">
                        Coming Soon
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="rounded-md text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                {l.label}
              </a>
            ),
          )}
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
            {[{ href: "/", label: "Home" }, ...links, { href: "/contact", label: "Contact" }].map(
              (l) =>
                l.label === "Automations" ? (
                  <div key={l.href}>
                    <div className="flex items-center gap-2">
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="flex-1 rounded-lg px-2 py-3 text-base font-medium text-foreground transition hover:bg-muted"
                      >
                        {l.label}
                      </a>
                      <button
                        type="button"
                        aria-expanded={mobileAutoOpen}
                        aria-controls="mobile-automations-submenu"
                        aria-label="Toggle Automations submenu"
                        onClick={() => setMobileAutoOpen((v) => !v)}
                        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border text-foreground"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition ${mobileAutoOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <ul
                      id="mobile-automations-submenu"
                      hidden={!mobileAutoOpen}
                      className="mt-1 space-y-1 border-l border-border pl-3"
                    >
                      {automationsSubmenu.map((s) => (
                        <li key={s.href}>
                          <a
                            href={s.href}
                            onClick={() => {
                              setOpen(false);
                              setMobileAutoOpen(false);
                            }}
                            className="flex min-h-11 items-center rounded-lg px-2 py-3 text-sm font-medium text-foreground transition hover:bg-muted"
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                      <li>
                        <span className="flex min-h-11 items-center justify-between gap-3 rounded-lg px-2 py-3 text-sm text-muted-foreground">
                          AI Growth Audit
                          <span className="rounded-full bg-green/10 px-2 py-0.5 text-xs font-medium text-green">
                            Coming Soon
                          </span>
                        </span>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-3 text-base font-medium text-foreground transition hover:bg-muted"
                  >
                    {l.label}
                  </a>
                ),
            )}
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
