import type { ReactNode } from "react";
import Link from "next/link";
import { CrosshairIcon } from "@phosphor-icons/react/dist/ssr";
import AnalyticsSettingsButton from "@/components/analytics-settings-button";

type LegalPageProps = {
  title: string;
  intro: string;
  updatedOn?: {
    dateTime: string;
    label: string;
  };
  children: ReactNode;
};

export default function LegalPage({ title, intro, updatedOn, children }: LegalPageProps) {
  const policyDate = updatedOn ?? {
    dateTime: "2026-07-18",
    label: "July 18, 2026",
  };

  return (
    <div className="legal-shell">
      <a className="skip-link" href="#legal-content">
        Skip to policy
      </a>

      <header className="legal-header">
        <Link className="legal-brand" href="/">
          <CrosshairIcon aria-hidden="true" />
          <span>
            <strong>Meccha Chameleon</strong>
            <small>Unofficial field guide</small>
          </span>
        </Link>
        <nav aria-label="Policy navigation">
          <Link href="/terms/">Terms</Link>
          <Link href="/privacy/">Privacy</Link>
          <a href="mailto:support@meccha-chameleon.co">Contact</a>
        </nav>
      </header>

      <main id="legal-content" className="legal-main">
        <div className="legal-heading">
          <p>Site policy / Field file</p>
          <h1>{title}</h1>
          <p>{intro}</p>
          <time dateTime={policyDate.dateTime}>Last updated: {policyDate.label}</time>
        </div>

        <article className="legal-content">{children}</article>
      </main>

      <footer className="legal-footer">
        <span>Unofficial community resource</span>
        <div>
          <Link href="/">Back to field guide</Link>
          <AnalyticsSettingsButton />
          <a href="mailto:support@meccha-chameleon.co">support@meccha-chameleon.co</a>
        </div>
      </footer>
    </div>
  );
}
