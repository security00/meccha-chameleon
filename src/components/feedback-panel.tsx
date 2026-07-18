"use client";

import { PaperPlaneTiltIcon } from "@phosphor-icons/react";
import { useState } from "react";

type FeedbackPanelProps = {
  context: string;
};

export default function FeedbackPanel({ context }: FeedbackPanelProps) {
  const [status, setStatus] = useState("");

  const submitFeedback = (formData: FormData) => {
    const category = String(formData.get("category") || "Correction");
    const message = String(formData.get("message") || "").trim();

    if (message.length < 10) {
      setStatus("Please add at least 10 characters so the report has enough context.");
      return;
    }

    const subject = `[Field guide ${category}] ${context}`;
    const body = [
      `Page: ${window.location.href}`,
      `Type: ${category}`,
      "",
      message,
      "",
      "Sent from the Meccha Chameleon unofficial field guide.",
    ].join("\n");

    setStatus("Opening your email app. The website does not store this message.");
    window.dispatchEvent(
      new CustomEvent("mc:track", { detail: { event: "feedback_mailto", label: category } }),
    );
    window.location.href = `mailto:support@meccha-chameleon.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="feedback-panel" aria-labelledby="feedback-title">
      <div>
        <p className="section-kicker">Keep the guide accurate</p>
        <h2 id="feedback-title">Found an outdated detail?</h2>
        <p>
          Send the patch, map, and what changed. Your email app handles the message; this site does
          not store the form contents.
        </p>
      </div>
      <form action={submitFeedback}>
        <label>
          <span>Report type</span>
          <select name="category" defaultValue="Correction">
            <option>Correction</option>
            <option>Patch update</option>
            <option>Broken link</option>
            <option>Accessibility</option>
          </select>
        </label>
        <label>
          <span>What should change?</span>
          <textarea
            name="message"
            rows={4}
            minLength={10}
            maxLength={1500}
            required
            placeholder="Example: Update 2.8.0 changed…"
          />
        </label>
        <button type="submit">
          Prepare email
          <PaperPlaneTiltIcon aria-hidden="true" />
        </button>
        <p className="feedback-status" role="status" aria-live="polite">
          {status}
        </p>
      </form>
    </section>
  );
}
