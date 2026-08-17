import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell, Section, CtaBand } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ChevronRight } from "lucide-react";
import { getResource } from "@/content/resources";
import { getRequestOrigin } from "@/lib/origin.functions";

export const Route = createFileRoute("/resources/$slug")({
  loader: async ({ params }) => {
    const resource = getResource(params.slug);
    if (!resource) throw notFound();
    return { resource, origin: await getRequestOrigin() };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found — ApexGrowth" }, { name: "robots", content: "noindex" }] };
    }
    const { resource, origin } = loaderData;
    const url = `${origin}/resources/${params.slug}`;
    return {
      meta: [
        { title: `${resource.title} — ApexGrowth` },
        { name: "description", content: resource.description },
        { property: "og:title", content: resource.title },
        { property: "og:description", content: resource.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:title", content: resource.title },
        { name: "twitter:description", content: resource.description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: resource.title,
            description: resource.description,
            datePublished: resource.published,
            author: { "@type": "Organization", name: "ApexGrowth" },
            publisher: { "@type": "Organization", name: "ApexGrowth" },
            mainEntityOfPage: url,
          }),
        },
      ],
    };
  },
  notFoundComponent: NotFoundArticle,
  component: Page,
});

function NotFoundArticle() {
  return (
    <PageShell>
      <Section>
        <div className="pt-24 text-center">
          <h1 className="text-3xl md:text-4xl">We couldn't find that guide.</h1>
          <p className="mt-4 text-muted-foreground">It may have moved or been renamed.</p>
          <Link to="/resources" className="mt-8 inline-flex text-sm text-primary">
            Back to all resources
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}

function Page() {
  const { resource } = Route.useLoaderData();
  return (
    <PageShell>
      <article>
        <section className="bg-hero grain pt-32 pb-14 md:pt-40 md:pb-16">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/resources" className="hover:text-foreground">Resources</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground/70">{resource.category}</span>
            </nav>
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {resource.category} · {resource.readMinutes} min read
            </div>
            <h1 className="mt-4 text-3xl leading-[1.12] md:text-5xl">{resource.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{resource.intro}</p>
          </div>
        </section>

        <Section>
          <div className="mx-auto max-w-3xl space-y-12">
            {resource.blocks.map((block) => (
              <Reveal key={block.heading}>
                <div>
                  <h2 className="text-2xl text-foreground md:text-3xl">{block.heading}</h2>
                  {block.paragraphs?.map((p) => (
                    <p key={p} className="mt-4 text-base leading-relaxed text-muted-foreground">{p}</p>
                  ))}
                  {block.bullets && (
                    <ul className="mt-5 space-y-3 text-base leading-relaxed text-muted-foreground">
                      {block.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      </article>

      <CtaBand
        title="Want this reviewed against your own numbers?"
        copy="The free AI audit applies all of the above to your actual call flow and follow-up process."
        location="resource-article-footer"
      />
    </PageShell>
  );
}
