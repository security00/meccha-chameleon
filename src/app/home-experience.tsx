"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowSquareOutIcon,
  CrosshairIcon,
  EyeIcon,
  FlaskIcon,
  HourglassHighIcon,
  ListIcon,
  MagnifyingGlassIcon,
  MapTrifoldIcon,
  PaletteIcon,
  QuestionIcon,
  TargetIcon,
  UserIcon,
  WrenchIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

const lessons = {
  silhouette: {
    number: "1",
    label: "Silhouette",
    copy: "Match your shape to nearby objects. Avoid long, readable outlines.",
    tip: "Crouch beside similarly sized props so your outline reads as part of the room.",
    Icon: UserIcon,
  },
  color: {
    number: "2",
    label: "Color",
    copy: "Sample nearby colors and match hue, brightness, and contrast.",
    tip: "Recheck your color after moving. Lighting and camera angle can change the match.",
    Icon: PaletteIcon,
  },
  movement: {
    number: "3",
    label: "Movement",
    copy: "Stay still when the seeker is near. Small moves create big tells.",
    tip: "Move while the seeker is turning or crossing a doorway, then stop completely.",
    Icon: HourglassHighIcon,
  },
} as const;

type LessonKey = keyof typeof lessons;

const chapters = [
  {
    number: "01",
    title: "Starter field manual",
    copy: "Learn the core hide loop, movement discipline, and beginner-safe spots.",
    image: "/media/game/farm-round.webp",
    alt: "A Meccha Chameleon round in a bright farm map",
  },
  {
    number: "02",
    title: "Map tactics",
    copy: "Break rooms into zones, read prop density, and plan repeatable search routes.",
    image: "/media/game/hotel-lobby.webp",
    alt: "A decorated hotel lobby map in Meccha Chameleon",
  },
  {
    number: "03",
    title: "Advanced camo",
    copy: "Handle edge cases, lighting traps, and mind games that win tight rounds.",
    image: "/media/game/brick-hide.webp",
    alt: "A player hiding against a brick wall in Meccha Chameleon",
  },
] as const;

const roomPalette = [
  "#53682d",
  "#344625",
  "#4d5c38",
  "#66683e",
  "#777052",
  "#5f5543",
  "#6e624c",
  "#4d4437",
  "#40382f",
  "#2d2925",
  "#817967",
  "#aaa490",
  "#d6cfb8",
  "#f2df73",
];

export default function HomeExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState<LessonKey>("color");
  const [activeRole, setActiveRole] = useState<"hider" | "seeker">("hider");
  const [activeChapter, setActiveChapter] = useState(0);

  const chooseRole = (role: "hider" | "seeker") => {
    setActiveRole(role);
    document
      .getElementById(role === "hider" ? "camouflage-lab" : "guide-chapters")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="guide-shell" data-role={activeRole}>
      <a className="skip-link" href="#main-content">
        Skip to guide
      </a>

      <aside className="side-rail" aria-label="Guide navigation">
        <div className="rail-top">
          <a className="wordmark" href="#main-content" onClick={() => setMenuOpen(false)}>
            <span>Meccha</span>
            <span>Chameleon</span>
            <small>Unofficial guide</small>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close guide menu" : "Open guide menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <XIcon aria-hidden="true" /> : <ListIcon aria-hidden="true" />}
          </button>
        </div>

        <nav className={menuOpen ? "rail-nav is-open" : "rail-nav"}>
          <a className="rail-link is-active" href="#main-content" onClick={() => setMenuOpen(false)}>
            <FlaskIcon aria-hidden="true" />
            <span>Start</span>
          </a>
          <a className="rail-link" href="#guide-chapters" onClick={() => setMenuOpen(false)}>
            <UserIcon aria-hidden="true" />
            <span>Roles</span>
          </a>
          <a className="rail-link" href="#guide-chapters" onClick={() => setMenuOpen(false)}>
            <MapTrifoldIcon aria-hidden="true" />
            <span>Maps</span>
          </a>
          <a className="rail-link" href="#troubleshoot" onClick={() => setMenuOpen(false)}>
            <WrenchIcon aria-hidden="true" />
            <span>Troubleshoot</span>
          </a>
          <a className="rail-link" href="#faq" onClick={() => setMenuOpen(false)}>
            <QuestionIcon aria-hidden="true" />
            <span>FAQ</span>
          </a>
        </nav>

        <a
          className="where-to-play"
          href="https://store.steampowered.com/app/4704690/MECCHA_CHAMELEON/"
          target="_blank"
          rel="noreferrer"
        >
          <span>Where to play</span>
          <strong>Steam</strong>
          <ArrowSquareOutIcon aria-hidden="true" />
        </a>
      </aside>

      <main id="main-content" className="guide-main">
        <header className="site-header">
          <a className="site-header-identity" href="#main-content">
            <CrosshairIcon aria-hidden="true" />
            <span>
              <small>Independent field guide</small>
              <strong>Meccha Chameleon Field Manual</strong>
            </span>
          </a>
          <nav className="site-header-nav" aria-label="Primary navigation">
            <a href="#camouflage-lab">Camo lab</a>
            <a href="#guide-chapters">Guides</a>
            <a href="#troubleshoot">Support</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a
            className="site-header-steam"
            href="https://store.steampowered.com/app/4704690/MECCHA_CHAMELEON/"
            target="_blank"
            rel="noreferrer"
          >
            <span>View on Steam</span>
            <ArrowSquareOutIcon aria-hidden="true" />
          </a>
        </header>

        <header className="hero" id="roles">
          <div className="hero-copy">
            <h1>
              Match the room.
              <br />
              Miss the seeker.
            </h1>
            <p className="hero-intro">
              Meccha Chameleon is hide-and-seek where blending is survival. Learn the camouflage loop
              and choose the guide that fits your next round.
            </p>
          </div>

          <div className="role-actions" aria-label="Choose a role">
            <button
              className="primary-action"
              type="button"
              aria-pressed={activeRole === "hider"}
              onClick={() => chooseRole("hider")}
            >
              <span>Learn the hide loop</span>
              <ArrowRightIcon aria-hidden="true" />
            </button>
            <button
              className="secondary-action"
              type="button"
              aria-pressed={activeRole === "seeker"}
              onClick={() => chooseRole("seeker")}
            >
              <span>Play as a seeker</span>
              <ArrowRightIcon aria-hidden="true" />
            </button>
            <span className="visually-hidden" aria-live="polite">
              {activeRole === "hider" ? "Hider guide selected" : "Seeker guide selected"}
            </span>
          </div>
        </header>

        <section className="camouflage-lab" id="camouflage-lab" aria-labelledby="lab-title">
          <div className="lab-heading">
            <div>
              <FlaskIcon aria-hidden="true" />
              <h2 id="lab-title">Camouflage lab</h2>
              <span>Same room, different outcome</span>
            </div>
            <strong>01</strong>
          </div>

          <div className="lab-grid">
            <div className="visual-test">
              <div className="compare-board" aria-label="Poor and good camouflage comparison">
                <figure className="compare-frame poor-match">
                  <Image
                    src="/media/game/paint-room.webp"
                    alt="Bright paint blobs that stand out against a green room"
                    fill
                    priority
                    sizes="(max-width: 860px) 100vw, 36vw"
                  />
                  <figcaption>Poor match</figcaption>
                </figure>
                <figure className="compare-frame good-match">
                  <Image
                    src="/media/game/green-room.webp"
                    alt="A player camouflaged inside a green framed wall picture"
                    fill
                    priority
                    sizes="(max-width: 860px) 100vw, 36vw"
                  />
                  <figcaption>Good match</figcaption>
                </figure>
              </div>

              <div className="palette-row" aria-label="Sample room palette">
                <span>Room palette</span>
                <div className="palette-swatches" aria-hidden="true">
                  {roomPalette.map((color) => (
                    <i key={color} style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            </div>

            <div className="lesson-panel">
              {(Object.keys(lessons) as LessonKey[]).map((key) => {
                const lesson = lessons[key];
                const Icon = lesson.Icon;
                const isActive = activeLesson === key;

                return (
                  <button
                    key={key}
                    type="button"
                    className="lesson-row"
                    data-active={isActive}
                    aria-pressed={isActive}
                    onClick={() => setActiveLesson(key)}
                  >
                    <span className="lesson-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="lesson-copy">
                      <span className="lesson-label">
                        <b>{lesson.number}</b>
                        <strong>{lesson.label}</strong>
                      </span>
                      <span>{lesson.copy}</span>
                    </span>
                  </button>
                );
              })}
              <p className="field-tip">
                <strong>Field tip:</strong> {lessons[activeLesson].tip}
              </p>
            </div>
          </div>
        </section>

        <section className="chapters" id="guide-chapters" aria-labelledby="chapters-title">
          <div className="chapter-heading">
            <div>
              <h2 id="chapters-title">Guide chapters</h2>
              <span>Pick your next lesson</span>
            </div>
            <a href="#roles">
              Choose a guide
              <ArrowRightIcon aria-hidden="true" />
            </a>
          </div>

          <div className="chapter-list">
            {chapters.map((chapter, index) => (
              <button
                key={chapter.number}
                type="button"
                className="chapter-item"
                data-selected={activeChapter === index}
                aria-pressed={activeChapter === index}
                onClick={() => setActiveChapter(index)}
              >
                <span className="chapter-number">{chapter.number}</span>
                <span className="chapter-image">
                  <Image src={chapter.image} alt={chapter.alt} fill sizes="(max-width: 860px) 32vw, 11vw" />
                </span>
                <span className="chapter-copy">
                  <strong>{chapter.title}</strong>
                  <span>{chapter.copy}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="support-zone" id="troubleshoot" aria-labelledby="support-title">
          <div>
            <p className="section-kicker">Round support</p>
            <h2 id="support-title">Room not showing?</h2>
          </div>
          <p>Check region, game version, room privacy, and whether the host has already started.</p>
          <a href="#faq">
            Open the quick checklist
            <ArrowRightIcon aria-hidden="true" />
          </a>
        </section>

        <section className="faq-zone" id="faq" aria-labelledby="faq-title">
          <div>
            <p className="section-kicker">FAQ</p>
            <h2 id="faq-title">Three rules to remember</h2>
          </div>
          <div className="faq-grid">
            <p>
              <EyeIcon aria-hidden="true" />
              Clear rooms in zones instead of scanning randomly.
            </p>
            <p>
              <TargetIcon aria-hidden="true" />
              Match brightness as carefully as hue.
            </p>
            <p>
              <MagnifyingGlassIcon aria-hidden="true" />
              Look for broken silhouettes before tiny color errors.
            </p>
          </div>
        </section>

        <footer id="site-footer" className="site-footer">
          <div className="footer-main">
            <div className="footer-brand">
              <a href="#main-content">
                <strong>Meccha Chameleon</strong>
                <span>Unofficial field guide</span>
              </a>
              <p>
                A player-made field manual for learning camouflage, search routes, and better round
                decisions.
              </p>
            </div>

            <nav className="footer-nav" aria-label="Footer navigation">
              <span>Explore</span>
              <a href="#roles">Roles</a>
              <a href="#camouflage-lab">Camo lab</a>
              <a href="#guide-chapters">Guide chapters</a>
              <a href="#faq">FAQ</a>
            </nav>

            <div className="footer-source">
              <span>Official game</span>
              <p>Game information, availability, and updates belong to their respective owners.</p>
              <a
                href="https://store.steampowered.com/app/4704690/MECCHA_CHAMELEON/"
                target="_blank"
                rel="noreferrer"
              >
                Steam store
                <ArrowSquareOutIcon aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>Unofficial community resource. Not affiliated with Valve or the game publisher.</span>
            <nav className="footer-legal" aria-label="Legal and contact links">
              <Link href="/terms/">Terms of Service</Link>
              <Link href="/privacy/">Privacy Policy</Link>
              <a href="mailto:support@meccha-chameleon.co">Contact</a>
            </nav>
            <span>Steam App 4704690</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
