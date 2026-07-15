import { useMemo, useState } from "react";
import { Check } from "lucide-react";

type Tier = { id: string; label: string; oneTime: number; monthly: number; blurb: string };

const TIERS: Tier[] = [
  { id: "starter", label: "Starter", oneTime: 475, monthly: 0, blurb: "Get online quickly" },
  { id: "presence", label: "Presence", oneTime: 1750, monthly: 0, blurb: "Look professional, get discovered" },
  { id: "leadgen", label: "Lead Gen", oneTime: 4500, monthly: 550, blurb: "Predictable, consistent leads" },
  { id: "growth", label: "Growth", oneTime: 10500, monthly: 1650, blurb: "Full growth machine" },
];

const ADDONS = [
  { id: "seo", label: "Advanced SEO", monthly: 350 },
  { id: "ads", label: "Paid ads mgmt", monthly: 600 },
  { id: "chat", label: "AI chatbot", monthly: 150 },
  { id: "crm", label: "CRM ops", monthly: 250 },
];

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function Estimator() {
  const [tierId, setTierId] = useState("leadgen");
  const [addons, setAddons] = useState<string[]>(["seo"]);
  const tier = TIERS.find((t) => t.id === tierId)!;
  const monthly = tier.monthly + addons.reduce((s, id) => s + (ADDONS.find((a) => a.id === id)?.monthly || 0), 0);
  const roi = useMemo(() => Math.round(monthly * 12 * 2.44), [monthly]);
  const toggle = (id: string) => setAddons((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  return (
    <div className="grid gap-6 rounded-3xl border border-border bg-card/60 p-6 shadow-elegant md:p-10 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-8">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Project Scope</div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TIERS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTierId(t.id)}
                className={`group rounded-xl border p-3 text-left transition ${
                  tierId === t.id
                    ? "border-transparent bg-gold-gradient text-primary-foreground shadow-gold"
                    : "border-border bg-background/40 hover:border-primary/50"
                }`}
              >
                <div className={`text-sm font-medium ${tierId === t.id ? "" : "text-foreground"}`}>{t.label}</div>
                <div className={`mt-1 text-[11px] ${tierId === t.id ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {t.blurb}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Monthly Add-ons</div>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {ADDONS.map((a) => {
              const on = addons.includes(a.id);
              return (
                <button
                  key={a.id}
                  onClick={() => toggle(a.id)}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition ${
                    on ? "border-primary/60 bg-primary/10" : "border-border bg-background/40 hover:border-primary/40"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`grid h-5 w-5 place-items-center rounded-md border ${on ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>
                      {on && <Check className="h-3.5 w-3.5" />}
                    </span>
                    {a.label}
                  </span>
                  <span className="text-muted-foreground">{fmt(a.monthly)}/mo</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-6 rounded-2xl border border-border bg-background/50 p-6 md:p-8">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold-soft">Estimated Engagement</div>
          <div className="mt-4 flex flex-col gap-1">
            <div className="text-4xl font-medium text-foreground md:text-5xl">
              <span className="text-gradient-gold">{fmt(tier.oneTime)}</span>
              <span className="ml-2 text-sm text-muted-foreground">one-time</span>
            </div>
            {monthly > 0 && (
              <div className="text-2xl md:text-3xl text-foreground">
                <span className="text-gradient-gold">{fmt(monthly)}</span>
                <span className="ml-2 text-sm text-muted-foreground">/month</span>
              </div>
            )}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card/60 p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">ROI illustration (12 mo)</div>
          <div className="mt-2 text-2xl font-medium text-foreground">~ {fmt(roi)}</div>
          <p className="mt-2 text-xs text-muted-foreground">Estimates vary by market, offer, and execution. Illustrative only.</p>
        </div>
        <a
          href="#contact"
          className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gold-gradient px-6 py-3 text-sm font-medium text-primary-foreground shadow-gold transition hover:opacity-90"
        >
          Get a tailored proposal
        </a>
      </div>
    </div>
  );
}
