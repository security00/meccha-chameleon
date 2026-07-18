import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import ResourceExplorer, { type SearchResource } from "@/components/resource-explorer";
import SiteShell from "@/components/site-shell";
import {
  guideArticles,
  mapGuides,
  troubleshootingItems,
} from "@/content/field-guide";

export const metadata: Metadata = {
  title: "Guides | Meccha Chameleon Field Manual",
  description:
    "Browse complete hider, seeker, camouflage, map, and troubleshooting field files for Meccha Chameleon.",
  alternates: { canonical: "/guides/" },
};

const resources: readonly SearchResource[] = [
  ...guideArticles.map((guide) => ({
    title: guide.title,
    description: guide.description,
    href: `/guides/${guide.slug}/`,
    category: "guide" as const,
    role: guide.role,
    meta: `${guide.eyebrow} · ${guide.readingTime}`,
    tags: guide.tags,
  })),
  ...mapGuides.map((map) => ({
    title: map.name,
    description: map.description,
    href: `/maps/${map.slug}/`,
    category: "map" as const,
    role: "all" as const,
    meta: `${map.eyebrow} · Patch ${map.patch}`,
    tags: map.tags,
  })),
  ...troubleshootingItems.map((item) => ({
    title: item.title,
    description: item.summary,
    href: `/troubleshooting/#${item.id}`,
    category: "support" as const,
    role: "all" as const,
    meta: `Troubleshooting · ${item.severity}`,
    tags: [item.severity, "troubleshooting", "support"],
  })),
];

export default function GuidesPage() {
  return (
    <SiteShell active="guides">
      <header className="directory-hero guides-directory-hero">
        <p className="section-kicker">Field manual / Complete index</p>
        <h1>Choose the guide that solves this round.</h1>
        <p>
          Every entry has a real URL, source notes, a review date, and a clear line between confirmed
          game information and player-made tactics.
        </p>
        <div className="directory-hero-actions">
          <Link href="/guides/hider-basics/">
            Start as a Hider <ArrowRightIcon aria-hidden="true" />
          </Link>
          <Link href="/guides/seeker-basics/">
            Start as a Seeker <ArrowRightIcon aria-hidden="true" />
          </Link>
        </div>
      </header>

      <ResourceExplorer resources={resources} />
    </SiteShell>
  );
}
