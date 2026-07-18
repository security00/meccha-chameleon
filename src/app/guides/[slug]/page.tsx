import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon, ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr";
import ArticleJsonLd from "@/components/article-json-ld";
import ArticleTools from "@/components/article-tools";
import FeedbackPanel from "@/components/feedback-panel";
import SiteShell from "@/components/site-shell";
import { getGuide, guideArticles, mapGuides } from "@/content/field-guide";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return guideArticles.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: `${guide.shortTitle} | Meccha Chameleon Field Manual`,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}/` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      modifiedTime: guide.review.verifiedOn,
      images: [{ url: guide.image, alt: guide.imageAlt }],
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = guideArticles.filter((entry) => entry.slug !== guide.slug).slice(0, 3);
  const relatedMaps = mapGuides.slice(0, 2);

  return (
    <SiteShell active="guides">
      <ArticleJsonLd
        title={guide.title}
        description={guide.description}
        path={`/guides/${guide.slug}/`}
        image={guide.image}
        modifiedOn={guide.review.verifiedOn}
        sectionLabel="Guides"
        sectionPath="/guides/"
      />
      <nav className="content-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/guides/">
          <ArrowLeftIcon aria-hidden="true" /> All guides
        </Link>
        <span aria-hidden="true">/</span>
        <span>{guide.shortTitle}</span>
      </nav>

      <article className={`content-page accent-${guide.accent}`}>
        <header className="content-hero">
          <div className="content-hero-copy">
            <p className="section-kicker">{guide.eyebrow}</p>
            <h1>{guide.title}</h1>
            <p>{guide.description}</p>
            <dl className="content-meta">
              <div>
                <dt>Role</dt>
                <dd>{guide.role}</dd>
              </div>
              <div>
                <dt>Level</dt>
                <dd>{guide.difficulty}</dd>
              </div>
              <div>
                <dt>Read</dt>
                <dd>{guide.readingTime}</dd>
              </div>
              <div>
                <dt>Reviewed</dt>
                <dd>{guide.review.verifiedOn}</dd>
              </div>
            </dl>
          </div>
          <figure className="content-hero-image">
            <Image src={guide.image} alt={guide.imageAlt} fill priority sizes="(max-width: 860px) 100vw, 42vw" />
          </figure>
        </header>

        <ArticleTools />

        <section className="verification-note" aria-labelledby="verification-title">
          <div>
            <p className="section-kicker">Evidence boundary</p>
            <h2 id="verification-title">What is verified</h2>
          </div>
          <div className="verification-copy">
            <p>{guide.verification}</p>
            <dl className="verification-meta">
              <div>
                <dt>Checked against</dt>
                <dd>Game {guide.review.gameVersion}</dd>
              </div>
              <div>
                <dt>Review status</dt>
                <dd>{guide.review.status.replaceAll("-", " ")}</dd>
              </div>
              <div>
                <dt>Reviewer</dt>
                <dd>{guide.review.reviewer}</dd>
              </div>
            </dl>
          </div>
        </section>

        <div className="article-layout">
          <aside className="article-toc" aria-label="On this page">
            <span>On this page</span>
            {guide.sections.map((section, index) => (
              <a key={section.id} href={`#${section.id}`}>
                {String(index + 1).padStart(2, "0")} {section.title}
              </a>
            ))}
          </aside>

          <div className="article-sections">
            {guide.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="field-section">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>
                <p>{section.intro}</p>
                <ol>
                  {section.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                {section.fieldNote ? (
                  <aside className="field-callout">
                    <strong>Field note</strong>
                    <p>{section.fieldNote}</p>
                  </aside>
                ) : null}
              </section>
            ))}
          </div>
        </div>

        <section className="source-panel" aria-labelledby="source-title">
          <div>
            <p className="section-kicker">Freshness and attribution</p>
            <h2 id="source-title">Sources used for this file</h2>
          </div>
          <div className="source-links">
            {guide.sources.map((source) => (
              <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                <span>{source.kind}</span>
                <strong>{source.label}</strong>
                {source.publishedOn ? <small>Published {source.publishedOn}</small> : null}
                <ArrowSquareOutIcon aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <FeedbackPanel context={`Guide: ${guide.title}`} />

        <section className="related-files" aria-labelledby="related-title">
          <div>
            <p className="section-kicker">Continue the manual</p>
            <h2 id="related-title">Related field files</h2>
          </div>
          <div>
            {related.map((entry) => (
              <Link key={entry.slug} href={`/guides/${entry.slug}/`}>
                <span>{entry.eyebrow}</span>
                <strong>{entry.shortTitle}</strong>
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            ))}
            {relatedMaps.map((entry) => (
              <Link key={entry.slug} href={`/maps/${entry.slug}/`}>
                <span>Map file / Patch {entry.patch}</span>
                <strong>{entry.name}</strong>
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
