"use client";

import Link from "next/link";
import { ArrowRightIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";

export type SearchResource = {
  title: string;
  description: string;
  href: string;
  category: "guide" | "map" | "support";
  role: "hider" | "seeker" | "all";
  meta: string;
  tags: readonly string[];
};

type ResourceExplorerProps = {
  resources: readonly SearchResource[];
};

const filters = [
  { value: "all", label: "All files" },
  { value: "hider", label: "Hider" },
  { value: "seeker", label: "Seeker" },
  { value: "map", label: "Maps" },
  { value: "support", label: "Support" },
] as const;

type FilterValue = (typeof filters)[number]["value"];

export default function ResourceExplorer({ resources }: ResourceExplorerProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterValue>("all");

  const matches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesFilter =
        filter === "all" ||
        resource.category === filter ||
        (filter === "hider" && resource.role === "hider") ||
        (filter === "seeker" && resource.role === "seeker");
      const haystack = [
        resource.title,
        resource.description,
        resource.meta,
        ...resource.tags,
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [filter, query, resources]);

  const chooseFilter = (value: FilterValue) => {
    setFilter(value);
    window.dispatchEvent(
      new CustomEvent("mc:track", { detail: { event: "resource_filter", label: value } }),
    );
  };

  useEffect(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery.length < 2) return;

    const timer = window.setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("mc:track", {
          detail: { event: "resource_search", label: normalizedQuery.slice(0, 80) },
        }),
      );

      if (matches.length === 0) {
        window.dispatchEvent(
          new CustomEvent("mc:track", {
            detail: { event: "search_zero_results", label: normalizedQuery.slice(0, 80) },
          }),
        );
      }
    }, 800);

    return () => window.clearTimeout(timer);
  }, [matches.length, query]);

  return (
    <section className="resource-explorer" aria-labelledby="resource-explorer-title">
      <div className="resource-explorer-heading">
        <div>
          <p className="section-kicker">Search the field files</p>
          <h2 id="resource-explorer-title">Find the next useful move</h2>
        </div>
        <label className="resource-search">
          <span className="visually-hidden">Search guides, maps, and troubleshooting</span>
          <MagnifyingGlassIcon aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search paint, maps, Workshop…"
          />
        </label>
      </div>

      <div className="resource-filters" aria-label="Filter field files">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-pressed={filter === item.value}
            onClick={() => chooseFilter(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="resource-count" role="status" aria-live="polite">
        {matches.length} {matches.length === 1 ? "field file" : "field files"}
      </p>

      {matches.length > 0 ? (
        <div className="resource-results">
          {matches.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              className="resource-card"
              data-category={resource.category}
              data-track={`resource_${resource.category}`}
            >
              <span>{resource.meta}</span>
              <strong>{resource.title}</strong>
              <p>{resource.description}</p>
              <small>
                Open file <ArrowRightIcon aria-hidden="true" />
              </small>
            </Link>
          ))}
        </div>
      ) : (
        <div className="resource-empty">
          <strong>No matching field file yet.</strong>
          <p>Try a shorter search or switch back to All files.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
          >
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}
