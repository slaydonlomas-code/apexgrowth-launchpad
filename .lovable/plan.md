# ApexGrowth → AI Automation Agency: Rebuild Plan

## What I found in the current project

- Single-page site: `src/routes/index.tsx` (650 lines) with sections Hero, Trust, Services, Consultation, Industries, Process, Why, Results, About, FAQ, Contact.
- Shared components: `Header`, `Footer`, `Logo`, `Reveal` (animation), `ContactForm` (Formspree `mnjenwnj`), `CookieBanner`, `LegalPage`.
- Five legal routes, `sitemap[.]xml.ts` (BASE_URL still empty), `robots.txt`, `llms.txt`.
- Positioning is entirely web-design-first; no AI content anywhere. No pricing is displayed (already removed).
- No blog, no CMS, no database, no analytics script installed today.

## Where I disagree with the requested architecture

I recommend a leaner map than the one in your brief. Reasons, concretely:

1. **5 AI-employee pages + 7 automation pages + 7 industry pages = 19 new pages** built from the same source ideas. Every one would repeat the same "AI answers, qualifies, books, updates CRM" story. That is textbook thin content and keyword cannibalization — `/ai-employees/ai-lead-agent/` and `/automations/missed-call-text-back/` target near-identical intent.
2. **You cannot yet deliver most of it.** Publishing nine service pages for untested systems creates credibility and compliance risk, and forces vague copy ("can potentially") that converts poorly.
3. **Industry pages only earn their keep with unique workflow content.** Roofing/HVAC/plumbing genuinely differ; electrical/remodeling/landscaping would be near-duplicates today.

### Recommended page map (Phase 1)

```text
/                             AI-first homepage
/ai-employees/                Digital Workforce hub — all 5 agents as deep sections
/ai-employees/ai-receptionist/  Flagship page (the one deep product page)
/automations/                 Automations hub — missed-call text-back is the lead section
/industries/                  Hub, with roofing / HVAC / plumbing as full workflow sections
/growth-services/             Web design, SEO, landing pages, lead gen, CRM setup
/ai-audit/                    Free AI Audit funnel (primary CTA destination)
/resources/                   Resources hub + /resources/$slug article template
/contact/                     Consultation page (form reused)
+ existing 5 legal pages

```

Split out later, only when a section has enough unique proof/content: `/ai-employees/ai-lead-agent/`, `/ai-follow-up-agent/`, `/ai-scheduling-agent/`, `/ai-crm-assistant/`, `/automations/missed-call-text-back/`, `/automations/estimate-follow-up/`, `/automations/review-automation/`, `/industries/roofing/`, `/hvac/`, `/plumbing/`. Sections will be built as self-contained components with stable anchor IDs so promoting one to its own page later is a copy-paste, not a rewrite.

## Positioning and claims policy

- Core idea: **Give Your Team Digital Teammates.** Humans keep relationships, judgment, sales, delivery. Digital workers handle answering, responding, qualifying, scheduling, following up, updating systems.
- Two-tier capability language, applied consistently:
  - **Available now** — websites, landing pages, lead capture, on-page SEO, CRM setup and workflow automation, email follow-up, website-to-CRM connection.
  - **Custom implementation assessment** — AI voice receptionist, missed-call text-back, AI qualification, AI SMS follow-up, scheduling, estimate follow-up, reactivation, review automation, AI chat, custom workflows. Copy describes what a configured system does, never what "we currently run."
- Banned on-site: named integrations (ServiceTitan, Jobber, GoHighLevel etc.), invented stats/testimonials/logos, guaranteed rankings/leads/revenue, "cutting-edge AI", "never miss a lead", review gating.
- Missed-call framing: delayed response gives the prospect a reason to keep calling other companies — not "every missed call is a lost customer."

## Signature visual components (reused across pages)

1. `WorkflowFlow` — vertical/horizontal step chain with connectors (receptionist, lead agent, follow-up, missed-call, review, roofing). One component, data-driven.
2. `CoverageTimeline` — side-by-side "Traditional coverage" vs "With digital coverage" 8:00 AM → 7:45 PM → next morning. The flagship visual on the homepage and receptionist page.
3. `TeamGrid` — Your Team + Your Digital Workforce, joined by a connector, never adversarial.
4. `CapabilityList` — capability rows with an "available now" / "assessment required" badge.
5. All animate through the existing `Reveal` component; no new animation library.

## Page-by-page

**Home** — Hero: "Give Your Team Digital Teammates" + supporting line about answering, responding, following up and scheduling around the clock; CTAs "Book a Free Consultation" / "See How It Works". Then: outcome-focused trust bar → Digital Workforce (5 agent cards → hub) → Coverage timeline → Missed-call text-back spotlight → Automations overview → Industries strip → Process (4 steps) → Why ApexGrowth → Growth Services (deliberately demoted, one band) → results/portfolio (existing content only) → FAQ → consultation form. Existing About content compresses into a short founder/approach band.

**/ai-employees/** — Digital workforce concept, TeamGrid, then a deep anchored section per agent (receptionist summary + link, lead agent, follow-up, scheduling, CRM assistant), each with its own workflow diagram, problem framing, and capability list.

**/ai-employees/ai-receptionist/** — The deepest page: "Your Receptionist Shouldn't Have to Work 24/7 for Your Business to Answer 24/7", coverage-gap explanation (lunch, other calls, after hours, sick days — the problem is coverage, not the employee), full coverage timeline, full call workflow, capability list, human-escalation section, human+AI section, FAQ, CTA.

**/automations/** — Missed-call text-back first and most prominent (with contractor context: on a roof, driving, inside a home, on equipment), then estimate follow-up, lead reactivation (permission-aware, non-spam), review automation (no gating), CRM automation, customer follow-up, and custom workflows ("If your team repeats it, there's a chance we can automate it") with an anti-hype caveat.

**/industries/** — Contractors and service businesses generally, then roofing (full storm/lead → inspection → estimate → follow-up → job → review workflow), HVAC (seasonal demand spikes, maintenance plans), plumbing (emergency after-hours intake). Other trades listed as examples, explicitly non-exhaustive, US-wide.

**/growth-services/** — Migrated from today's homepage services: custom website design, redesign, SEO, conversion optimization, mobile optimization, maintenance, landing pages, lead capture, CRM setup. Framed as the foundation the digital workforce runs on.

**/ai-audit/** — Free AI Audit funnel: what you get (repetitive-task review, coverage-gap review, recommended automations, prioritized roadmap), what it is not (not a sales-pitch-only call), short qualification form using the same Formspree endpoint plus a hidden `_subject`/source field so audits are distinguishable in your inbox. Also the intended paid-traffic landing page (noindex not applied; it has organic value).

**/contact/** — Existing form untouched, better surrounding layout, phone, email, Calendly.

## Technical plan

- Routes as flat TanStack files: `ai-employees.tsx` (layout `<Outlet/>`), `ai-employees.index.tsx`, `ai-employees.ai-receptionist.tsx`, `automations.index.tsx`, `industries.index.tsx`, `growth-services.tsx`, `ai-audit.tsx`, `contact.tsx`.
- `ContactForm` is not modified: same Formspree endpoint, fields, names, success/error states, honeypot. Only optional additive hidden source field on `/ai-audit`.
- Header nav: Home, AI Employees, Automations, Industries, Growth Services, About/Results, Contact + "Book a Free Consultation". Mobile menu gets a grouped accordion so it stays uncluttered.
- Footer: expanded columns (AI Employees, Automations, Industries, Growth Services, Company, Legal, Contact) + consultation CTA + © 2026 line.
- SEO: unique `head()` per route (title/description/og:title/og:description/og:url + self-referencing canonical); Organization/WebSite JSON-LD stays on root; add `Service` schema per service page and `BreadcrumbList` on nested routes; keep the existing FAQPage schema and extend it. Sitemap `entries` updated for all new routes; `llms.txt` rewritten around AI positioning. `BASE_URL` stays empty until a domain is set.
- Redirects: `/` keeps its URL, so no external URL breaks. Existing homepage hash links (`/#services`, `/#process`, `/#results`) will be preserved as anchors on the new home where the section still exists, and repointed to the new pages where it moved.
- Performance/mobile: no new dependencies, SVG/CSS diagrams only (no heavy images), diagrams reflow to stacked cards under `md`, explicit overflow-x guards on timeline/workflow rows.
- Analytics: none installed today. I will add data attributes on primary CTAs so a tag can be attached later; I will not install a tracker without your say-so.

## What I need from you

Anything verifiable I can use as proof — real projects, screenshots, client names you're allowed to publish, before/after outcomes. Without them the results section stays qualitative (no invented numbers). Also: confirm whether you want a `/blog` or resources section in a later phase.

## Risks

- Marketing AI services before your stack is tested creates a delivery gap; the two-tier language mitigates it but the "assessment required" framing does reduce conversion slightly vs. hard claims. That is the correct trade.
- New URLs start with zero authority; the homepage will carry most rankings for months. Internal links from home → hubs → flagship are how authority flows.
- Voice AI/SMS carry TCPA and call-recording obligations. I will add general consent language, not legal advice; your attorney should review before launch.

## Phased sequence

1. **Foundation** — design tokens/section primitives, `WorkflowFlow`, `CoverageTimeline`, `TeamGrid`, `CapabilityList`, header/footer nav rebuild.
2. **Homepage rewrite** — AI-first, growth services demoted, existing proof/FAQ/form preserved.
3. **AI Employees hub + AI Receptionist flagship.**
4. **Automations hub** (missed-call text-back lead) **+ Industries hub** (roofing/HVAC/plumbing workflows).
5. **Growth Services + /ai-audit funnel + /contact.**
6. **SEO & QA** — metadata, schema, sitemap, llms.txt, internal linking, link/form/mobile/overflow verification.
7. **Later, on evidence** — split individual agent, automation, and industry pages out of their hubs; blog/resources.
