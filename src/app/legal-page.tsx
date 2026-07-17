import type { ReactNode } from "react";
import Link from "next/link";

type LegalPageProps = {
  title: string;
  intro: string;
  children: ReactNode;
};

export default function LegalPage({ title, intro, children }: LegalPageProps) {
  return (
    <div className="legal-shell">
      <a className="skip-link" href="#legal-content">
        Skip to policy
      </a>

      <header className="legal-header">
        <Link className="legal-brand" href="/">
          <span aria-hidden="true">◎</span>
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
          <time dateTime="2026-07-18">Last updated: July 18, 2026</time>
        </div>

        <article className="legal-content">{children}</article>
      </main>

      <footer className="legal-footer">
        <span>Unofficial community resource</span>
        <div>
          <Link href="/">Back to field guide</Link>
          <a href="mailto:support@meccha-chameleon.co">support@meccha-chameleon.co</a>
        </div>
      </footer>
    </div>
  );
}
