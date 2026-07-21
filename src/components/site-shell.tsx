"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  ArrowSquareOutIcon,
  ClockCounterClockwiseIcon,
  CrosshairIcon,
  FlaskIcon,
  ListIcon,
  MapTrifoldIcon,
  QuestionIcon,
  UserIcon,
  WrenchIcon,
  XIcon,
} from "@phosphor-icons/react";
import AnalyticsSettingsButton from "@/components/analytics-settings-button";
import { OFFICIAL_STORE_URL } from "@/content/field-guide";

type ActiveSection = "start" | "guides" | "maps" | "updates" | "troubleshoot";

type SiteShellProps = {
  active?: ActiveSection;
  children: ReactNode;
};

const railLinks = [
  { id: "start", label: "Start", href: "/", Icon: FlaskIcon },
  { id: "guides", label: "Roles", href: "/guides/", Icon: UserIcon },
  { id: "maps", label: "Maps", href: "/maps/", Icon: MapTrifoldIcon },
  {
    id: "updates",
    label: "Updates",
    href: "/updates/",
    Icon: ClockCounterClockwiseIcon,
  },
  {
    id: "troubleshoot",
    label: "Troubleshoot",
    href: "/troubleshooting/",
    Icon: WrenchIcon,
  },
  { id: "troubleshoot", label: "FAQ", href: "/troubleshooting/#faq", Icon: QuestionIcon },
] as const;

export default function SiteShell({ active = "start", children }: SiteShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="guide-shell">
      <a className="skip-link" href="#main-content">
        Skip to guide
      </a>

      <aside className="side-rail" aria-label="Guide navigation">
        <div className="rail-top">
          <Link className="wordmark" href="/" onClick={() => setMenuOpen(false)}>
            <span>Meccha</span>
            <span>Chameleon</span>
            <small>Unofficial guide</small>
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close guide menu" : "Open guide menu"}
            aria-expanded={menuOpen}
            aria-controls="guide-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <XIcon aria-hidden="true" /> : <ListIcon aria-hidden="true" />}
          </button>
        </div>

        <nav id="guide-menu" className={menuOpen ? "rail-nav is-open" : "rail-nav"}>
          {railLinks.map(({ id, label, href, Icon }) => {
            const isActive = active === id && label !== "FAQ";

            return (
              <Link
                key={label}
                className={isActive ? "rail-link is-active" : "rail-link"}
                href={href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <a
          className="where-to-play"
          href={OFFICIAL_STORE_URL}
          target="_blank"
          rel="noreferrer"
          data-track="steam_outbound"
        >
          <span>Where to play</span>
          <strong>Steam</strong>
          <ArrowSquareOutIcon aria-hidden="true" />
        </a>
      </aside>

      <main id="main-content" className="guide-main">
        <header className="site-header">
          <Link className="site-header-identity" href="/">
            <CrosshairIcon aria-hidden="true" />
            <span>
              <small>Independent field guide</small>
              <strong>Meccha Chameleon Field Manual</strong>
            </span>
          </Link>
          <nav className="site-header-nav" aria-label="Primary navigation">
            <Link href="/#camouflage-lab">Camo lab</Link>
            <Link href="/guides/">Guides</Link>
            <Link href="/maps/">Maps</Link>
            <Link href="/updates/">Updates</Link>
            <Link href="/troubleshooting/">Support</Link>
          </nav>
          <a
            className="site-header-steam"
            href={OFFICIAL_STORE_URL}
            target="_blank"
            rel="noreferrer"
            data-track="steam_outbound"
          >
            <span>View on Steam</span>
            <ArrowSquareOutIcon aria-hidden="true" />
          </a>
        </header>

        {children}

        <footer id="site-footer" className="site-footer">
          <div className="footer-main">
            <div className="footer-brand">
              <Link href="/">
                <strong>Meccha Chameleon</strong>
                <span>Unofficial field guide</span>
              </Link>
              <p>
                A player-made field manual for camouflage, repeatable search routes, verified map
                notes, and practical round support.
              </p>
            </div>

            <nav className="footer-nav" aria-label="Footer navigation">
              <span>Explore</span>
              <Link href="/guides/">Role guides</Link>
              <Link href="/maps/">Map files</Link>
              <Link href="/updates/">Guide updates</Link>
              <Link href="/troubleshooting/">Troubleshooting</Link>
              <Link href="/troubleshooting/#faq">FAQ</Link>
            </nav>

            <div className="footer-source">
              <span>Official game</span>
              <p>Game information and availability belong to their respective owners.</p>
              <a
                href={OFFICIAL_STORE_URL}
                target="_blank"
                rel="noreferrer"
                data-track="steam_outbound"
              >
                Steam store
                <ArrowSquareOutIcon aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>Unofficial community resource. Not affiliated with Valve or the publisher.</span>
            <nav className="footer-legal" aria-label="Legal and contact links">
              <Link href="/terms/">Terms of Service</Link>
              <Link href="/privacy/">Privacy Policy</Link>
              <AnalyticsSettingsButton />
              <a href="mailto:support@meccha-chameleon.co">Contact</a>
            </nav>
            <span>Steam App 4704690</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
