import type { Metadata } from "next";
import LegalPage from "../legal-page";

export const metadata: Metadata = {
  title: "Terms of Service | Meccha Chameleon Field Guide",
  description: "Terms for using the unofficial Meccha Chameleon community field guide.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These terms explain the rules for using this independent, player-made guide."
    >
      <section>
        <h2>1. About this guide</h2>
        <p>
          Meccha Chameleon Field Guide is an unofficial community resource. It is not operated,
          endorsed, or sponsored by Valve or the game&apos;s developer or publisher. References to the
          game are provided for identification and commentary.
        </p>
      </section>

      <section>
        <h2>2. Using the site</h2>
        <p>
          You may use the site for personal, lawful, non-commercial purposes. Do not attempt to
          interfere with the site, bypass security controls, distribute malicious code, or use the
          service in a way that harms other visitors or the operator.
        </p>
      </section>

      <section>
        <h2>3. Guide content and availability</h2>
        <p>
          Strategies, screenshots, links, and game information may become incomplete or outdated as
          the game changes. The site is provided on an &quot;as is&quot; and &quot;as available&quot; basis without a
          guarantee that every tip, link, or feature will always be accurate or available.
        </p>
      </section>

      <section>
        <h2>4. Ownership and third-party material</h2>
        <p>
          Original site text and presentation are protected by applicable intellectual property
          laws. Game names, trademarks, artwork, screenshots, and other third-party material remain
          the property of their respective owners. Their appearance here does not imply affiliation.
        </p>
      </section>

      <section>
        <h2>5. External links</h2>
        <p>
          The guide links to third-party services such as Steam. Those services have their own terms
          and privacy practices, and we are not responsible for their content, availability, or
          transactions.
        </p>
      </section>

      <section>
        <h2>6. Limitation of liability</h2>
        <p>
          To the fullest extent allowed by law, the site operator is not liable for indirect,
          incidental, special, or consequential loss arising from your use of, or reliance on, this
          guide. Nothing in these terms excludes liability that cannot legally be excluded.
        </p>
      </section>

      <section>
        <h2>7. Changes to these terms</h2>
        <p>
          We may update these terms when the site or its practices change. The updated date above
          identifies the current version. Continuing to use the site after an update means you accept
          the revised terms.
        </p>
      </section>

      <section className="legal-contact-card">
        <h2>8. Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href="mailto:support@meccha-chameleon.co">support@meccha-chameleon.co</a>.
        </p>
      </section>
    </LegalPage>
  );
}
