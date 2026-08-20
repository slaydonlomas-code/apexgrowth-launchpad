// Google Analytics (GA4) — single gtag.js install, consent-gated.
export const CONSENT_KEY = "apexgrowth-cookie-consent";

const MEASUREMENT_ID =
  (import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY as string | undefined) ||
  "G-CTSC7LVXZP";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let installed = false;
let listenersBound = false;

function hasConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

/**
 * Standard gtag.js shim — pushes the raw `arguments` object (not an array),
 * which is what Google's tag expects when it replays the queue.
 */
function ensureGtag(): (...args: unknown[]) => void {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtagShim() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    } as (...args: unknown[]) => void;
  }
  return window.gtag;
}

export function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  ensureGtag()(...args);
}

function bindCalendlyTracking() {
  if (listenersBound) return;
  listenersBound = true;
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      if (!/calendly\.com/i.test(link.href)) return;
      trackEvent("schedule_click", { link_url: link.href, link_text: link.textContent?.trim() });
    },
    true,
  );
}

/** Loads gtag.js exactly once, only when the visitor accepted cookies. */
export function initAnalytics() {
  if (typeof window === "undefined") return;
  if (installed || !MEASUREMENT_ID || !hasConsent()) return;
  installed = true;

  ensureGtag();

  if (!document.querySelector(`script[data-ga-id="${MEASUREMENT_ID}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    script.dataset.gaId = MEASUREMENT_ID;
    document.head.appendChild(script);
  }

  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, { send_page_view: false });
  trackPageView(window.location.pathname + window.location.search);
  bindCalendlyTracking();
}

let lastPath: string | null = null;

export function trackPageView(path: string) {
  if (!installed) return;
  if (path === lastPath) return; // avoid duplicate page views for the same path
  lastPath = path;
  gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!installed) return;
  gtag("event", name, params ?? {});
}
