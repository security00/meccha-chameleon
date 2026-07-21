"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";

const CONSENT_STORAGE_KEY = "mc_analytics_consent";
export const ANALYTICS_SETTINGS_EVENT = "mc:analytics-settings";
const ANALYTICS_CONSENT_CHANGED_EVENT = "mc:analytics-consent-changed";

type ConsentChoice = "granted" | "denied" | "undecided" | "loading";

function hasPrivacySignal() {
  const navigatorWithGpc = navigator as Navigator & { globalPrivacyControl?: boolean };
  return navigator.doNotTrack === "1" || navigatorWithGpc.globalPrivacyControl === true;
}

function getConsentSnapshot(): ConsentChoice {
  let storedChoice: string | null = null;
  try {
    storedChoice = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    // A blocked storage API should not prevent the site from loading.
  }

  if (storedChoice === "granted" || storedChoice === "denied") return storedChoice;
  return hasPrivacySignal() ? "denied" : "undecided";
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(ANALYTICS_CONSENT_CHANGED_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(ANALYTICS_CONSENT_CHANGED_EVENT, onStoreChange);
  };
}

export default function AnalyticsConsent() {
  const storedChoice = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    () => "loading",
  );
  const [sessionChoice, setSessionChoice] = useState<"granted" | "denied" | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const choice = sessionChoice ?? storedChoice;

  useEffect(() => {
    const openSettings = () => setSettingsOpen(true);
    window.addEventListener(ANALYTICS_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(ANALYTICS_SETTINGS_EVENT, openSettings);
  }, []);

  const saveChoice = (nextChoice: "granted" | "denied") => {
    const mustReload = choice === "granted" && nextChoice === "denied";
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, nextChoice);
    } catch {
      // The in-memory choice still applies for the current page.
    }
    setSessionChoice(nextChoice);
    window.dispatchEvent(new Event(ANALYTICS_CONSENT_CHANGED_EVENT));
    setSettingsOpen(false);

    if (mustReload) window.location.reload();
  };

  return (
    <>
      {choice === "granted" ? (
        <>
          <Script
            id="google-analytics-loader"
            src="https://www.googletagmanager.com/gtag/js?id=G-SLPE8DG6NG"
            strategy="afterInteractive"
          />
          <Script id="google-analytics-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-SLPE8DG6NG', {
  allow_google_signals: false,
  allow_ad_personalization_signals: false
});`}
          </Script>

          <Script id="microsoft-clarity-init" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "xppq9ppppf");`}
          </Script>

          <Script
            id="plausible-loader"
            src="https://plausible.shipsolo.io/js/pa-pkReE8iI8vhg4GaCy1SF-.js"
            strategy="afterInteractive"
          />
          <Script id="plausible-init" strategy="afterInteractive">
            {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
plausible.init();`}
          </Script>
        </>
      ) : null}

      {settingsOpen || choice === "undecided" ? (
        <section
          className="analytics-consent"
          role="dialog"
          aria-modal="false"
          aria-labelledby="analytics-consent-title"
          aria-describedby="analytics-consent-description"
        >
          <div>
            <p className="section-kicker">Privacy controls</p>
            <h2 id="analytics-consent-title">Choose analytics settings</h2>
            <p id="analytics-consent-description">
              With permission, Google Analytics, Microsoft Clarity, and Plausible help us understand
              visits and improve the guide. Essential site functions and aggregate Cloudflare
              performance measurements continue either way. Read the{" "}
              <Link href="/privacy/">Privacy Policy</Link>.
            </p>
          </div>
          <div className="analytics-consent-actions">
            <button type="button" onClick={() => saveChoice("granted")}>
              Allow analytics
            </button>
            <button type="button" onClick={() => saveChoice("denied")}>
              Essential only
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
