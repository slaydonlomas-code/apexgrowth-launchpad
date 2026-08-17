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

- **Primary site-wide CTA: "Get a Free AI Audit"** (→ `/ai-audit/`). Secondary CTA: "See How It Works". The audit page and its follow-up path route qualified prospects to a consultation/Calendly booking, so the consultation still exists — it is just no longer the top-of-funnel ask. Phone number stays visible in the header for high-intent callers.
- Core idea: **Give Your Team Digital Teammates** — used as a major supporting section (the human + digital workforce band) on the homepage and the AI Employees hub, not as the H1.
- Two-tier capability distinction is kept **internally**, to govern wording — it is not surfaced as "assessment required" badges or any label that reads as "not available yet."
  - **Proven today** — websites, landing pages, lead capture, on-page SEO, CRM setup and workflow automation, email follow-up, website-to-CRM connection. Stated plainly.
  - **Custom-built AI systems** — voice receptionist, missed-call text-back, qualification, SMS follow-up, scheduling, estimate follow-up, reactivation, review automation, AI chat, custom workflows. Public framing: "built and configured around your workflow, scripts, and systems" / "scoped during your AI audit." Copy describes what a configured system does; it never claims volumes handled, current clients, named integrations, or measured results.
- Banned on-site: named integrations (ServiceTitan, Jobber, GoHighLevel etc.), invented stats/testimonials/logos, guaranteed rankings/leads/revenue, "cutting-edge AI", "never miss a lead", review gating.
- Missed-call framing: delayed response gives the prospect a reason to keep calling other companies — not "every missed call is a lost customer."



## Signature visual components (reused across pages)

1. `WorkflowFlow` — vertical/horizontal step chain with connectors (receptionist, lead agent, follow-up, missed-call, review, roofing). One component, data-driven.
2. `CoverageTimeline` — side-by-side "Traditional coverage" vs "With digital coverage" 8:00 AM → 7:45 PM → next morning. The flagship visual on the homepage and receptionist page.
3. `TeamGrid` — Your Team + Your Digital Workforce, joined by a connector, never adversarial.
4. `CapabilityList` — clean capability rows, no availability badges. Where a system is custom-built, the section intro says so in plain language ("configured around your call scripts, service area, and systems").
5. All animate through the existing `Reveal` component; no new animation library.

## Page-by-page

**Home** — H1 direction: **"AI Employees That Help Your Business Answer, Follow Up & Book Customers 24/7"** (exact wording refined at build time, keeping "AI employees / automation", "service businesses", and the outcome explicit). Subhead names the audience: contractors and service businesses. CTAs: "Get a Free AI Audit" (primary) / "See How It Works" (secondary). Then: outcome trust bar → Digital Workforce (5 agent cards → hub) → **"Give Your Team Digital Teammates"** human+digital band (TeamGrid) → Coverage timeline → Missed-call text-back spotlight → Automations overview → Industries strip → Process (4 steps) → Why ApexGrowth → Growth Services (deliberately demoted, one compact band, no hero real estate) → results/portfolio (existing content only) → resources teaser → FAQ → audit/consultation form. Existing About content compresses into a short founder/approach band.

**/ai-employees/** — Digital workforce concept, TeamGrid, then a deep anchored section per agent (receptionist summary + link, lead agent, follow-up, scheduling, CRM assistant), each with its own workflow diagram, problem framing, and capability list.

**/ai-employees/ai-receptionist/** — The deepest page, built to ad-landing-page standard so it can carry paid traffic: "Your Receptionist Shouldn't Have to Work 24/7 for Your Business to Answer 24/7", coverage-gap explanation (lunch, other calls, after hours, sick days — the problem is coverage, not the employee), full coverage timeline, full call workflow, capability list, human-escalation section, human+digital section, objection-handling block (does it sound robotic, what if it can't answer, do we control the script), dedicated FAQ, and repeated "Get a Free AI Audit" CTAs above the fold, mid-page, and at the end. Self-contained conversion path — a paid visitor never has to leave it.

**/automations/** — Missed-call text-back first and most prominent (with contractor context: on a roof, driving, inside a home, on equipment), then estimate follow-up, lead reactivation (permission-aware, non-spam), review automation (no gating), CRM automation, customer follow-up, and custom workflows ("If your team repeats it, there's a chance we can automate it") with an anti-hype caveat.

**/industries/** — Contractors and service businesses generally, then roofing (full storm/lead → inspection → estimate → follow-up → job → review workflow), HVAC (seasonal demand spikes, maintenance plans), plumbing (emergency after-hours intake). Each trade is a self-contained `<IndustrySection>` component fed by a data object (problems, workflow steps, automations, FAQ) so promoting it to `/industries/roofing/` later is a route file that renders the same component — no redesign. Other trades listed as examples, explicitly non-exhaustive, US-wide.

**/growth-services/** — Migrated from today's homepage services: custom website design, redesign, SEO, conversion optimization, mobile optimization, maintenance, landing pages, lead capture, CRM setup. Positioned as the foundation the digital workforce runs on — kept fully available but visually and structurally secondary: one nav slot (last in the services group), one compact homepage band, smaller cards, no hero, and every page ends by pointing back to the AI systems.

**/ai-audit/** — The primary CTA destination and main conversion asset: what the audit covers (repetitive-task review, call/response coverage gaps, recommended automations, prioritized roadmap), what happens on the call, what it is not (not a sales-pitch-only call), what you get afterward, and how it leads into a scoped consultation. Short qualification form using the same Formspree endpoint plus a hidden source field so audit leads are distinguishable in your inbox, with the Calendly link offered on the success state. Also the paid-traffic landing page for non-receptionist campaigns.

**/resources/** — Hub + `/resources/$slug` article template built now, with the structure in place (typed article registry in `src/content/resources/`, listing grid, article layout, related-links block, Article + BreadcrumbList schema). Seeded with 2–3 genuinely useful pieces only (e.g. after-hours call coverage for contractors, what an AI receptionist can and can't do, missed-call recovery). No mass-generated SEO articles — you publish gradually.

**/contact/** — Existing form untouched, better surrounding layout, phone, email, Calendly. "Book a consultation" lives here as the secondary conversion path.


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
