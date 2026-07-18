import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowSquareOutIcon, CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import FeedbackPanel from "@/components/feedback-panel";
import SiteShell from "@/components/site-shell";
import { CONTENT_REVIEWED_ON, getMapGuide, mapGuides } from "@/content/field-guide";

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
      images: [{ url: map.image, alt: map.imageAlt }],
    },
  };
}

export default async function MapPage({ params }: MapPageProps) {
  const { slug } = await params;
  const map = getMapGuide(slug);
  if (!map) notFound();

  return (
    <SiteShell active="maps">
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
                <dd>{CONTENT_REVIEWED_ON}</dd>
              </div>
            </dl>
          </div>
          <figure className="content-hero-image">
            <Image src={map.image} alt={map.imageAlt} fill priority sizes="(max-width: 860px) 100vw, 42vw" />
            <figcaption>Gameplay reference image; not a guaranteed current room layout.</figcaption>
          </figure>
        </header>

        <section className="patch-file" aria-labelledby="patch-title">
          <div>
            <p className="section-kicker">Official patch evidence</p>
            <h2 id="patch-title">What the update confirms</h2>
          </div>
          <div>
            <strong>{map.officialStatus}</strong>
            <p>{map.patchNote}</p>
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
                <ArrowSquareOutIcon aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>

        <FeedbackPanel context={`Map file: ${map.name}`} />
      </article>
    </SiteShell>
  );
}
