import type { Metadata } from "next";
import { ArrowSquareOutIcon, CaretDownIcon, CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import FeedbackPanel from "@/components/feedback-panel";
import SiteShell from "@/components/site-shell";
import {
  CONTENT_REVIEWED_ON,
  OFFICIAL_COMMUNITY_URL,
  troubleshootingItems,
} from "@/content/field-guide";

export const metadata: Metadata = {
  title: "Troubleshooting | Meccha Chameleon Field Manual",
  description:
    "Step-by-step checks for invisible rooms, failed joins, Workshop maps, Paint Mode UI issues, and map performance.",
  alternates: { canonical: "/troubleshooting/" },
};

const faqItems = [
  {
    question: "Does this page show live server status?",
    answer:
      "No. It provides a diagnosis sequence and links to official announcements. Service availability can change faster than a static guide can be reviewed.",
  },
  {
    question: "Are Workshop fixes official?",
    answer:
      "Not unless the linked source is an official announcement. Community workarounds should include the map item, patch, and a reproducible test before being treated as reliable.",
  },
  {
    question: "What belongs in a useful bug report?",
    answer:
      "Include patch version, region, lobby visibility, player count, map source, hardware when relevant, and the smallest sequence that reproduces the issue.",
  },
] as const;

export default function TroubleshootingPage() {
  return (
    <SiteShell active="troubleshoot">
      <header className="directory-hero support-directory-hero">
        <p className="section-kicker">Round support / Diagnostic order</p>
        <h1>Change one variable, then test again.</h1>
        <p>
          These checklists separate lobby, Workshop, patch, and performance problems so you can report
          what actually failed instead of trying several fixes at once.
        </p>
        <time dateTime={CONTENT_REVIEWED_ON}>Reviewed {CONTENT_REVIEWED_ON}</time>
      </header>

      <section className="troubleshooting-list" aria-labelledby="troubleshooting-title">
        <div className="troubleshooting-heading">
          <p className="section-kicker">Issue library</p>
          <h2 id="troubleshooting-title">Open the symptom that matches</h2>
        </div>

        {troubleshootingItems.map((item, index) => (
          <details key={item.id} id={item.id} className="troubleshooting-item" open={index === 0}>
            <summary>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>
                <small>{item.severity}</small>
                <strong>{item.title}</strong>
                <em>{item.summary}</em>
              </span>
              <CaretDownIcon aria-hidden="true" />
            </summary>
            <div className="troubleshooting-body">
              <ol>
                {item.steps.map((step) => (
                  <li key={step}>
                    <CheckCircleIcon aria-hidden="true" />
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <aside>
                <strong>Escalation note</strong>
                <p>{item.escalation}</p>
              </aside>
            </div>
          </details>
        ))}
      </section>

      <section className="official-status-link" aria-labelledby="official-status-title">
        <div>
          <p className="section-kicker">Current service information</p>
          <h2 id="official-status-title">Check the official announcement feed</h2>
          <p>
            This guide does not present a cached number as live status. Use the official community
            feed for maintenance windows and patch announcements.
          </p>
        </div>
        <a href={OFFICIAL_COMMUNITY_URL} target="_blank" rel="noreferrer" data-track="official_status">
          Open official feed <ArrowSquareOutIcon aria-hidden="true" />
        </a>
      </section>

      <section id="faq" className="support-faq" aria-labelledby="support-faq-title">
        <div>
          <p className="section-kicker">FAQ</p>
          <h2 id="support-faq-title">Before you report a problem</h2>
        </div>
        <div>
          {faqItems.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question} <CaretDownIcon aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <FeedbackPanel context="Troubleshooting library" />
    </SiteShell>
  );
}
