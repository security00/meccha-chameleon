"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type SiteEvent = {
  event: string;
  label?: string;
};

function sendEvent(payload: SiteEvent) {
  if (navigator.doNotTrack === "1") return;

  const body = JSON.stringify({
    event: payload.event,
    label: payload.label?.slice(0, 80),
    path: window.location.pathname,
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
    return;
  }

  void fetch("/api/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
  });
}

export default function SiteAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    sendEvent({ event: "page_view" });
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-track]") : null;
      if (!target) return;
      sendEvent({ event: target.dataset.track || "tracked_click" });
    };

    const handleCustomEvent = (event: Event) => {
      const customEvent = event as CustomEvent<SiteEvent>;
      if (!customEvent.detail?.event) return;
      sendEvent(customEvent.detail);
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("mc:track", handleCustomEvent);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("mc:track", handleCustomEvent);
    };
  }, []);

  return null;
}
