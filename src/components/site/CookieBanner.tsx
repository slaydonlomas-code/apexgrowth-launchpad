import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import { initAnalytics, CONSENT_KEY } from "@/lib/analytics";

const KEY = CONSENT_KEY;

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(KEY)) setVisible(true);
    } catch {
      // storage unavailable — stay hidden
    }
  }, []);

  const choose = (value: "accepted" | "necessary") => {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {
      // ignore
    }
    if (value === "accepted") initAnalytics();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-border bg-card/95 p-4 shadow-elegant backdrop-blur md:flex-row md:items-center md:gap-6 md:p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-background/60">
            <Cookie className="h-4 w-4 text-primary" />
          </span>
          <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
            We use cookies to keep this site working and to understand how it's used. You can accept
            all cookies or continue with necessary cookies only. Read our{" "}
            <Link to="/cookie-policy" className="text-primary underline underline-offset-2">
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-2 md:ml-auto">
          <button
            onClick={() => choose("necessary")}
            className="flex-1 whitespace-nowrap rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition hover:border-primary/60 sm:text-sm"
          >
            Necessary only
          </button>
          <button
            onClick={() => choose("accepted")}
            className="flex-1 whitespace-nowrap rounded-full bg-gold-gradient px-5 py-2 text-xs font-medium text-primary-foreground shadow-gold transition hover:opacity-90 sm:text-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
