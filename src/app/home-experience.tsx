"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  EyeIcon,
  FlaskIcon,
  HourglassHighIcon,
  MagnifyingGlassIcon,
  PaletteIcon,
  TargetIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import SiteShell from "@/components/site-shell";
import { guideArticles } from "@/content/field-guide";

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

const chapterSlugs = ["hider-basics", "map-tactics", "advanced-camouflage"];
const chapters = chapterSlugs.map((slug) => {
  const guide = guideArticles.find((entry) => entry.slug === slug);
  if (!guide) throw new Error(`Missing homepage guide: ${slug}`);
  return guide;
});

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
  const [activeLesson, setActiveLesson] = useState<LessonKey>("color");

  return (
    <SiteShell active="start">
      <header className="hero" id="roles">
        <div className="hero-copy">
          <h1>
            Match the room.
            <br />
            Miss the seeker.
          </h1>
          <p className="hero-intro">
            Meccha Chameleon is hide-and-seek where blending is survival. Choose a role and open the
            field manual built for your next round.
          </p>
        </div>

        <div className="role-actions" aria-label="Choose a role">
          <Link
            className="primary-action"
            href="/guides/hider-basics/"
            data-track="role_hider"
          >
            <span>Learn the hide loop</span>
            <ArrowRightIcon aria-hidden="true" />
          </Link>
          <Link
            className="secondary-action"
            href="/guides/seeker-basics/"
            data-track="role_seeker"
          >
            <span>Play as a seeker</span>
            <ArrowRightIcon aria-hidden="true" />
          </Link>
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
            <p className="field-tip" aria-live="polite">
              <strong>Field tip:</strong> {lessons[activeLesson].tip}
            </p>
          </div>
        </div>
      </section>

      <section className="chapters" id="guide-chapters" aria-labelledby="chapters-title">
        <div className="chapter-heading">
          <div>
            <h2 id="chapters-title">Guide chapters</h2>
            <span>Open a complete field file</span>
          </div>
          <Link href="/guides/">
            Browse all guides
            <ArrowRightIcon aria-hidden="true" />
          </Link>
        </div>

        <div className="chapter-list">
          {chapters.map((chapter, index) => (
            <Link
              key={chapter.slug}
              href={`/guides/${chapter.slug}/`}
              className="chapter-item"
              data-track={`chapter_${chapter.slug}`}
            >
              <span className="chapter-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="chapter-image">
                <Image
                  src={chapter.image}
                  alt={chapter.imageAlt}
                  fill
                  sizes="(max-width: 860px) 32vw, 11vw"
                />
              </span>
              <span className="chapter-copy">
                <strong>{chapter.shortTitle}</strong>
                <span>{chapter.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="support-zone" id="troubleshoot" aria-labelledby="support-title">
        <div>
          <p className="section-kicker">Round support</p>
          <h2 id="support-title">Room not showing?</h2>
        </div>
        <p>Check version, region, privacy, host state, and Workshop content in a fixed order.</p>
        <Link href="/troubleshooting/#room-not-visible" data-track="troubleshooting_open">
          Open the full checklist
          <ArrowRightIcon aria-hidden="true" />
        </Link>
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
            Match brightness and material as carefully as hue.
          </p>
          <p>
            <MagnifyingGlassIcon aria-hidden="true" />
            Check the current patch before trusting a fixed map callout.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
