import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowSquareOutIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import ArticleJsonLd from "@/components/article-json-ld";
import ArticleTools from "@/components/article-tools";
import FeedbackPanel from "@/components/feedback-panel";
import SiteShell from "@/components/site-shell";
import { getMapGuide, guideArticles, mapGuides } from "@/content/field-guide";

type MapPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return mapGuides.map((map) => ({ slug: map.slug }));
}

export async function generateMetadata({ params }: MapPageProps): Promise<Metadata> {
  const { slug } = await params;
  const map = getMapGuide(slug);
  if (!map) return {};

  return {
    title: `${map.name} Map File | Meccha Chameleon`,
    description: map.description,
    alternates: { canonical: `/maps/${map.slug}/` },
    openGraph: {
      title: `${map.name} map file`,
      description: map.description,
      type: "article",
      modifiedTime: map.review.verifiedOn,
      images: [{ url: map.image, alt: map.imageAlt }],
    },
  };
}

export default async function MapPage({ params }: MapPageProps) {
  const { slug } = await params;
  const map = getMapGuide(slug);
  if (!map) notFound();
  const relatedGuides = guideArticles.slice(0, 3);

  return (
    <SiteShell active="maps">
      <ArticleJsonLd
        title={`${map.name} map file`}
        description={map.description}
        path={`/maps/${map.slug}/`}
        image={map.image}
        modifiedOn={map.review.verifiedOn}
        sectionLabel="Maps"
        sectionPath="/maps/"
      />
      <nav className="content-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/maps/">
          <ArrowLeftIcon aria-hidden="true" /> All map files
        </Link>
        <span aria-hidden="true">/</span>
        <span>{map.name}</span>
      </nav>

      <article className={`content-page accent-${map.accent}`}>
        <header className="content-hero map-detail-hero">
          <div className="content-hero-copy">
            <p className="section-kicker">{map.eyebrow}</p>
            <h1>{map.name}</h1>
            <p>{map.description}</p>
            <dl className="content-meta">
              <div>
                <dt>Patch</dt>
                <dd>{map.patch}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Official</dd>
              </div>
              <div>
                <dt>Reviewed</dt>
                <dd>{map.review.verifiedOn}</dd>
              </div>
              <div>
                <dt>Callouts</dt>
                <dd>{map.review.needsReview ? "Pending" : "Verified"}</dd>
              </div>
            </dl>
          </div>
          <figure className="content-hero-image">
            <Image src={map.image} alt={map.imageAlt} fill priority sizes="(max-width: 860px) 100vw, 42vw" />
            <figcaption>Gameplay reference image; not a guaranteed current room layout.</figcaption>
          </figure>
        </header>

        <ArticleTools />

        <section className="patch-file" aria-labelledby="patch-title">
          <div>
            <p className="section-kicker">Official patch evidence</p>
            <h2 id="patch-title">What the update confirms</h2>
          </div>
          <div>
            <strong>{map.officialStatus}</strong>
            <p>{map.patchNote}</p>
            <dl className="verification-meta">
              <div>
                <dt>Checked against</dt>
                <dd>Game {map.review.gameVersion}</dd>
              </div>
              <div>
                <dt>Review status</dt>
                <dd>{map.review.status.replaceAll("-", " ")}</dd>
              </div>
              <div>
                <dt>Reviewer</dt>
                <dd>{map.review.reviewer}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="map-checklist" aria-labelledby="map-checklist-title">
          <div>
            <p className="section-kicker">First-round worksheet</p>
            <h2 id="map-checklist-title">Scout this map without inventing facts</h2>
            <p>
              The checklist is editorial guidance. It deliberately avoids claiming exact hiding spots
              that have not been verified on the current patch.
            </p>
          </div>
          <ol>
            {map.fieldChecklist.map((item) => (
              <li key={item}>
                <CheckCircleIcon aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="source-panel" aria-labelledby="map-source-title">
          <div>
            <p className="section-kicker">Source trail</p>
            <h2 id="map-source-title">Verify before sharing</h2>
          </div>
          <div className="source-links">
            {map.sources.map((source) => (
              <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                <span>{source.kind}</span>
                <strong>{source.label}</strong>
                {source.publishedOn ? <small>Published {source.publishedOn}</small> : null}
                <ArrowSquareOutIcon aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <FeedbackPanel context={`Map file: ${map.name}`} />

        <section className="related-files" aria-labelledby="map-related-title">
          <div>
            <p className="section-kicker">Continue the manual</p>
            <h2 id="map-related-title">Useful role guides</h2>
          </div>
          <div>
            {relatedGuides.map((entry) => (
              <Link key={entry.slug} href={`/guides/${entry.slug}/`}>
                <span>{entry.eyebrow}</span>
                <strong>{entry.shortTitle}</strong>
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
