import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import SiteShell from "@/components/site-shell";
import { CONTENT_REVIEWED_ON, mapGuides } from "@/content/field-guide";

export const metadata: Metadata = {
  title: "Map Files | Meccha Chameleon Field Manual",
  description:
    "Browse source-labelled official map files, patch notes, scouting checklists, and provisional tactical observations.",
  alternates: { canonical: "/maps/" },
};

export default function MapsPage() {
  return (
    <SiteShell active="maps">
      <header className="directory-hero map-directory-hero">
        <p className="section-kicker">Map archive / Source labelled</p>
        <h1>Know what changed before memorizing a spot.</h1>
        <p>
          These files confirm official map names and patch context first. Exact hiding locations stay
          provisional until they can be manually verified on the current build.
        </p>
        <time dateTime={CONTENT_REVIEWED_ON}>Map archive reviewed {CONTENT_REVIEWED_ON}</time>
      </header>

      <section className="map-grid" aria-label="Official map field files">
        {mapGuides.map((map) => (
          <Link
            key={map.slug}
            className={`map-card accent-${map.accent}`}
            href={`/maps/${map.slug}/`}
            data-track="map_open"
          >
            <span className="map-card-image">
              <Image src={map.image} alt={map.imageAlt} fill sizes="(max-width: 860px) 100vw, 36vw" />
            </span>
            <span className="map-card-copy">
              <small>{map.eyebrow}</small>
              <strong>{map.name}</strong>
              <span>{map.description}</span>
              <b>
                Open patch {map.patch} file <ArrowRightIcon aria-hidden="true" />
              </b>
            </span>
          </Link>
        ))}
      </section>
    </SiteShell>
  );
}
