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
      updatedOn={{ dateTime: "2026-07-21", label: "July 21, 2026" }}
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
          The site sends a limited set of first-party events, such as a page view, guide filter,
          outbound Steam click, or submitted feedback report, to the hosting Worker. Search events
          may include the search term you entered, capped at 80 characters, so we can identify missing
          topics and zero-result searches. These records do not include an email address, cookie ID,
          or site-generated visitor identifier.
        </p>
        <p>
          If you choose “Allow analytics,” the site enables Google Analytics storage and also loads
          Microsoft Clarity and Plausible. These services may process page URLs, referrers, device
          and browser details, approximate location, interaction events, and technical identifiers.
          Google Analytics may then use cookies or similar storage. Microsoft Clarity provides
          interaction analytics and session replay, which can include clicks, scrolling, pointer
          movement, and rendered page state. Plausible provides aggregate traffic analytics through
          the configured ShipSolo endpoint.
        </p>
        <p>
          Cloudflare may also load its Web Analytics performance beacon to measure aggregate loading
          and Core Web Vital metrics. It is used for site performance monitoring, not advertising or
          cross-site visitor tracking.
        </p>
        <p>
          The preference is stored in your browser as <code>mc_analytics_consent</code>. The Google
          tag loads on each page with Consent Mode set to deny analytics and advertising storage by
          default. Before permission, it may send cookieless consent and measurement pings for
          aggregate modeling, but it does not use analytics cookies. Microsoft Clarity and Plausible
          do not load until you allow analytics. A browser Do Not Track or Global Privacy Control
          signal defaults optional analytics storage and tools to off unless you later choose
          otherwise through Analytics settings.
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
        <p>
          Google, Microsoft, Plausible, and the configured Plausible hosting provider apply their own
          retention, security, and international data-transfer practices to analytics data they
          receive. Their policies and your analytics preference govern that processing.
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
        <p>
          Use the Analytics settings control in the site footer to allow or disable Google Analytics,
          Microsoft Clarity, and Plausible. Disabling analytics reloads the page so previously loaded
          optional scripts stop running for subsequent browsing. You can also clear site storage or
          use browser privacy controls.
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
