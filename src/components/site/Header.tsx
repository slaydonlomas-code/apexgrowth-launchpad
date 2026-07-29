import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "@/components/site/Logo";

const links = [
  { href: "/#top", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Our Process" },
  { href: "/#about", label: "About" },
  { href: "/#results", label: "Results" },
  { href: "/#contact", label: "Contact" },
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
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-background/80 border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <a href="/#top" className="flex items-center gap-2" aria-label="ApexGrowth home">
          <Logo size={34} />
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground transition hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a href="tel:3373853084" className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
            <Phone className="h-4 w-4" /> 337-385-3084
          </a>
          <a
            href="/#contact"
            className="rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90"
          >
            Book a Free Consultation
          </a>
        </div>
        <button className="p-2 text-foreground lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="flex flex-col gap-4 p-5">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base text-foreground/90">
                {l.label}
              </a>
            ))}
            <a href="tel:3373853084" className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" /> 337-385-3084
            </a>
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-gold-gradient px-5 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              Book a Free Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
