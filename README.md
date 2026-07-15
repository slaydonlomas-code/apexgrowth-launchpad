# ApexGrowth Website

Premium marketing website for **ApexGrowth** — websites & lead generation for local businesses.
Built with **TanStack Start (React 19 + Vite 7 + Tailwind v4)**.

## Local development

```bash
bun install     # or: npm install
bun run dev     # dev server on http://localhost:8080
bun run build   # production build
```

## Contact form

The `Send inquiry` form submits to a TanStack server function
(`src/lib/contact.functions.ts`) which relays the message to
**apexgrowthsolutions@gmail.com** via the [Resend](https://resend.com) API.

No `mailto:` links are used anywhere — the visitor stays on the site and sees an
in-page success message.

### Environment variables

Set these in Vercel → Project → Settings → Environment Variables (or in a
local `.env` file):

| Name                  | Required | Description                                                                              |
| --------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`      | Yes      | API key from [resend.com](https://resend.com/api-keys). Free tier is enough to start.    |
| `CONTACT_TO_EMAIL`    | No       | Destination email. Defaults to `apexgrowthsolutions@gmail.com`.                          |
| `CONTACT_FROM_EMAIL`  | No       | `From` header. Defaults to `ApexGrowth <onboarding@resend.dev>`. Use a verified domain in production, e.g. `ApexGrowth <hello@apexgrowth.com>`. |

If `RESEND_API_KEY` is not set the form still succeeds visually but nothing is
sent — the submission is logged server-side so you can catch missing config in
staging.

## Deployment

### Vercel

1. Push the repo to GitHub.
2. Import the project in Vercel — the framework preset is detected
   automatically (TanStack Start / Vite).
3. Add the environment variables above.
4. Deploy.

### Custom domain

Add your domain in Vercel → Domains and update the DNS records shown.

## Branding assets

All brand assets live under `public/`:
`favicon.ico`, `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`,
`icons/icon-192.png`, `icons/icon-512.png`, `og-image.jpg`, `logo.png`.
The React logo import lives at `src/assets/logo.png`.

## Editing

* Homepage sections — `src/routes/index.tsx`
* Header / nav — `src/components/site/Header.tsx`
* Contact form UI — `src/components/site/ContactForm.tsx`
* Contact server function — `src/lib/contact.functions.ts`
* Estimator — `src/components/site/Estimator.tsx`
* Design tokens (colors, fonts, gradients) — `src/styles.css`

## Contact

- Phone: **337-385-3084**
- Email: **apexgrowthsolutions@gmail.com**
- Book a call: <https://calendly.com/slaydon-lomas/30min>
