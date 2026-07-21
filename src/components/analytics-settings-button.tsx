"use client";

import { ANALYTICS_SETTINGS_EVENT } from "./analytics-consent";

export default function AnalyticsSettingsButton() {
  return (
    <button
      type="button"
      className="analytics-settings-button"
      onClick={() => window.dispatchEvent(new Event(ANALYTICS_SETTINGS_EVENT))}
    >
      Analytics settings
    </button>
  );
}
