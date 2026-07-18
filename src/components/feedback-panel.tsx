"use client";

import { PaperPlaneTiltIcon } from "@phosphor-icons/react";
import { type FormEvent, useEffect, useRef, useState } from "react";

type FeedbackPanelProps = {
  context: string;
};

type FeedbackResponse = {
  error?: string;
  reference?: string;
};

export default function FeedbackPanel({ context }: FeedbackPanelProps) {
  const startedAt = useRef(0);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const submitFeedback = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const category = String(formData.get("category") || "Correction");
    const message = String(formData.get("message") || "").trim();

    if (message.length < 10) {
      setStatus("Please add at least 10 characters so the report has enough context.");
      return;
    }

    setSubmitting(true);
    setStatus("Sending your report securely…");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          category,
          context,
          elapsedMs: Date.now() - startedAt.current,
          message,
          page: window.location.pathname,
          website: String(formData.get("website") || ""),
        }),
      });
      const result = (await response.json()) as FeedbackResponse;

      if (!response.ok) {
        throw new Error(result.error || "The report could not be saved.");
      }

      form.reset();
      startedAt.current = Date.now();
      setStatus(
        result.reference
          ? `Report saved. Reference: ${result.reference}`
          : "Report received. Thank you for helping keep the guide current.",
      );
      window.dispatchEvent(
        new CustomEvent("mc:track", { detail: { event: "feedback_submit", label: category } }),
      );
    } catch {
      setStatus("We could not save the report. Please use the email fallback below.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="feedback-panel" aria-labelledby="feedback-title">
      <div>
        <p className="section-kicker">Keep the guide accurate</p>
        <h2 id="feedback-title">Found an outdated detail?</h2>
        <p>
          Send the patch, map, and what changed. The report is stored in our private review queue
          and receives a reference number after a successful submission.
        </p>
        <p className="feedback-fallback">
          Form unavailable? Email{" "}
          <a href="mailto:support@meccha-chameleon.co">support@meccha-chameleon.co</a>.
        </p>
      </div>
      <form onSubmit={submitFeedback}>
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
        <label className="feedback-honeypot" aria-hidden="true">
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? "Saving report…" : "Submit report"}
          <PaperPlaneTiltIcon aria-hidden="true" />
        </button>
        <p className="feedback-status" role="status" aria-live="polite">
          {status}
        </p>
      </form>
    </section>
  );
}
