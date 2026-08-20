// Calendly popup embed — intercepts Calendly links and opens the official
// popup widget over the current page instead of navigating away.

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";

type CalendlyGlobal = {
  initPopupWidget: (opts: { url: string }) => void;
  closePopupWidget: () => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyGlobal;
  }
}

let scriptPromise: Promise<CalendlyGlobal | undefined> | null = null;
let bound = false;

function loadWidget(): Promise<CalendlyGlobal | undefined> {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve) => {
    if (window.Calendly) {
      resolve(window.Calendly);
      return;
    }

    if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = WIDGET_CSS;
      document.head.appendChild(link);
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_JS}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = WIDGET_JS;
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener("load", () => resolve(window.Calendly), { once: true });
    script.addEventListener("error", () => resolve(undefined), { once: true });
    if (window.Calendly) resolve(window.Calendly);
  });

  return scriptPromise;
}

export async function openCalendlyPopup(url: string) {
  const calendly = await loadWidget();
  if (!calendly) {
    // Widget unavailable (blocked/offline) — fall back to normal navigation.
    window.location.href = url;
    return;
  }
  calendly.initPopupWidget({ url });
  enhanceOverlay();
}

function popupOpen() {
  return Boolean(document.querySelector(".calendly-overlay"));
}

/** Adds an accessible label to Calendly's native close button. */
function enhanceOverlay() {
  window.setTimeout(() => {
    const close = document.querySelector<HTMLElement>(".calendly-popup-close");
    if (close) {
      close.setAttribute("role", "button");
      close.setAttribute("tabindex", "0");
      close.setAttribute("aria-label", "Close scheduling window");
    }
  }, 300);
}

/** Binds the global click/keydown handlers exactly once. */
export function initCalendlyPopup() {
  if (typeof window === "undefined" || bound) return;
  bound = true;

  document.addEventListener("click", (e) => {
    const mouse = e as MouseEvent;
    if (mouse.defaultPrevented || mouse.button !== 0) return;
    if (mouse.metaKey || mouse.ctrlKey || mouse.shiftKey || mouse.altKey) return;
    const target = e.target as HTMLElement | null;
    const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!link) return;
    if (!/^https?:\/\/(www\.)?calendly\.com\//i.test(link.href)) return;
    e.preventDefault();
    void openCalendlyPopup(link.href);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!popupOpen()) return;
    window.Calendly?.closePopupWidget();
  });
}
