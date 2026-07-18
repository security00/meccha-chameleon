import type { Metadata } from "next";
import LegalPage from "../legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Meccha Chameleon Field Guide",
  description: "Privacy practices for the unofficial Meccha Chameleon community field guide.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This policy describes the limited information processed when you visit or contact the guide."
    >
      <section>
        <h2>1. What we collect</h2>
        <p>
          The site does not offer user accounts, payments, or public comments. If you submit the
          correction form, we store the report type, page, guide context, message, submission time,
          and a random reference number in a private review queue. The form does not ask for your
          name or email address.
        </p>
        <p>
          Like most hosted websites, the hosting and security infrastructure may automatically
          process technical request data such as IP address, browser type, requested URL, timestamp,
          and security signals to deliver the site and prevent abuse.
        </p>
      </section>

      <section>
        <h2>2. Cookies and analytics</h2>
        <p>
          The site does not use advertising cookies or create a visitor profile. It sends a limited
          set of first-party events, such as a page view, guide filter, outbound Steam click, or
          submitted feedback report, to the hosting Worker. Search events may include the search term
          you entered, capped at 80 characters, so we can identify missing topics and zero-result
          searches. Event records otherwise contain the event name and requested path, not an email
          address, cookie ID, or site-generated visitor identifier.
        </p>
        <p>
          These events are used to understand which guide sections need maintenance. Browser Do Not
          Track signals are respected by the interaction logger. Hosting and security infrastructure
          may still process standard request data for delivery, reliability, and abuse prevention.
        </p>
        <p>
          Cloudflare may also load its Web Analytics performance beacon to measure aggregate loading
          and Core Web Vital metrics. It is used for site performance monitoring, not advertising or
          cross-site visitor tracking.
        </p>
      </section>

      <section>
        <h2>3. Feedback and email correspondence</h2>
        <p>
          On-site feedback is used to review and correct field files. If you use the email fallback,
          we also receive your email address, message, and standard email metadata. We use this
          information only to review and respond, keep necessary support records, and protect against
          spam or abuse.
        </p>
      </section>

      <section>
        <h2>4. How information is used</h2>
        <p>
          Technical and correspondence data may be used to operate and secure the site, diagnose
          errors, answer support requests, comply with legal obligations, and enforce the site terms.
          We do not sell personal information or share it for targeted advertising.
        </p>
      </section>

      <section>
        <h2>5. Retention and service providers</h2>
        <p>
          First-party analytics events are automatically removed after 90 days. Feedback submissions
          are automatically removed after 365 days unless a legal or security need requires a longer
          record. Hosting, database, network, and email providers may process limited data on our
          behalf under their own security and retention practices.
        </p>
      </section>

      <section>
        <h2>6. Third-party links</h2>
        <p>
          Links to Steam and other external services take you away from this site. Their privacy
          policies govern information they collect; this policy does not cover those services.
        </p>
      </section>

      <section>
        <h2>7. Your choices</h2>
        <p>
          Depending on where you live, you may have rights to request access, correction, or deletion
          of personal information we hold about you. We may need to verify a request before acting on
          it. You may also ask us to stop non-essential email correspondence.
        </p>
      </section>

      <section>
        <h2>8. Policy updates</h2>
        <p>
          We may revise this policy when the site or its data practices change. The date above shows
          when the current version took effect.
        </p>
      </section>

      <section className="legal-contact-card">
        <h2>9. Privacy contact</h2>
        <p>
          Send privacy questions or requests to{" "}
          <a href="mailto:support@meccha-chameleon.co">support@meccha-chameleon.co</a>.
        </p>
      </section>
    </LegalPage>
  );
}
