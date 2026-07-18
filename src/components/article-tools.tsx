"use client";

import { CheckIcon, CopyIcon, PrinterIcon, ShareNetworkIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

export default function ArticleTools() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector<HTMLElement>(".content-page");
      if (!article) return;
      const bounds = article.getBoundingClientRect();
      const distance = Math.max(1, article.offsetHeight - window.innerHeight);
      const travelled = Math.min(distance, Math.max(0, -bounds.top));
      setProgress(Math.round((travelled / distance) * 100));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setStatus("Link copied");
    window.dispatchEvent(new CustomEvent("mc:track", { detail: { event: "share_copy" } }));
  };

  const share = async () => {
    if (!navigator.share) {
      await copyLink();
      return;
    }

    try {
      await navigator.share({ title: document.title, url: window.location.href });
      setStatus("Share sheet opened");
      window.dispatchEvent(new CustomEvent("mc:track", { detail: { event: "share_native" } }));
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("Sharing is unavailable. Use Copy link instead.");
    }
  };

  const printArticle = () => {
    window.dispatchEvent(new CustomEvent("mc:track", { detail: { event: "print" } }));
    window.print();
  };

  return (
    <div className="article-tools" aria-label="Article tools">
      <div className="reading-progress" aria-label={`${progress}% read`}>
        <span style={{ width: `${progress}%` }} />
      </div>
      <small>{progress}% read</small>
      <div>
        <button type="button" onClick={copyLink}>
          {status === "Link copied" ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
          Copy link
        </button>
        <button type="button" onClick={share}>
          <ShareNetworkIcon aria-hidden="true" /> Share
        </button>
        <button type="button" onClick={printArticle}>
          <PrinterIcon aria-hidden="true" /> Print
        </button>
      </div>
      <span className="visually-hidden" role="status" aria-live="polite">
        {status}
      </span>
    </div>
  );
}
