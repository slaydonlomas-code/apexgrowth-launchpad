import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#estimator", label: "Estimator" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
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
        scrolled ? "backdrop-blur-md bg-background/70 border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-2">
          <img src={logo} alt="ApexGrowth" className="h-9 w-auto md:h-10" />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground transition hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:3373853084" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Phone className="h-4 w-4" /> 337-385-3084
          </a>
          <a
            href="https://calendly.com/slaydon-lomas/30min"
            target="_blank" rel="noreferrer"
            className="rounded-full bg-gold-gradient px-5 py-2 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90"
          >
            Book a Call
          </a>
        </div>
        <button className="md:hidden p-2 text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="flex flex-col p-5 gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base text-foreground/90">
                {l.label}
              </a>
            ))}
            <a
              href="https://calendly.com/slaydon-lomas/30min"
              target="_blank" rel="noreferrer"
              className="mt-2 rounded-full bg-gold-gradient px-5 py-2.5 text-center text-sm font-medium text-primary-foreground"
            >
              Book a Call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
