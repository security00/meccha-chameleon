import type { Metadata } from "next";
import { ArrowSquareOutIcon, CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import SiteShell from "@/components/site-shell";
import { fieldGuideUpdates } from "@/content/field-guide";

export const metadata: Metadata = {
  title: "Guide Updates | Meccha Chameleon Field Manual",
  description:
    "A public change log tying Meccha Chameleon guide updates to exact official patch announcements.",
  alternates: { canonical: "/updates/" },
};

export default function UpdatesPage() {
  return (
    <SiteShell active="updates">
      <header className="directory-hero updates-directory-hero">
        <p className="section-kicker">Maintenance log / Source trail</p>
        <h1>What changed, and why.</h1>
        <p>
          Each entry connects an official game announcement to the field files reviewed on this
          site. Unverified current-build map callouts remain visibly pending.
        </p>
      </header>

      <section className="updates-list" aria-labelledby="updates-title">
        <div className="updates-heading">
          <p className="section-kicker">Reviewed releases</p>
          <h2 id="updates-title">Guide change log</h2>
        </div>

        {fieldGuideUpdates.map((update) => (
          <article key={update.version} className="update-entry">
            <div className="update-version">
              <span>Patch</span>
              <strong>{update.version}</strong>
              <time dateTime={update.publishedOn}>Published {update.publishedOn}</time>
              <small>Guide reviewed {update.reviewedOn}</small>
            </div>
            <div className="update-copy">
              <h2>{update.title}</h2>
              <p>{update.summary}</p>
              <ul>
                {update.changes.map((change) => (
                  <li key={change}>
                    <CheckCircleIcon aria-hidden="true" />
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
              <div className="update-files">
                <span>Affected files</span>
                <p>{update.affectedFiles.join(" · ")}</p>
              </div>
              <a href={update.sourceUrl} target="_blank" rel="noreferrer">
                Open exact official announcement <ArrowSquareOutIcon aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
