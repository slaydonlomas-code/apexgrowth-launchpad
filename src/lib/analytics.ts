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

/** Standard gtag.js shim: pushes the raw `arguments` object onto dataLayer. */
export function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = gtag;
  }
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
  if (document.querySelector(`script[data-ga-id="${MEASUREMENT_ID}"]`)) {
    installed = true;
    return;
  }
  installed = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  script.dataset.gaId = MEASUREMENT_ID;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, { send_page_view: false });
  trackPageView(window.location.pathname + window.location.search);
  bindCalendlyTracking();
}

export function trackPageView(path: string) {
  if (!installed) return;
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
