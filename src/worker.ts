const SECURITY_HEADERS: Record<string, string> = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "connect-src 'self'",
    "font-src 'self'",
    "form-action 'self' mailto:",
    "frame-ancestors 'self'",
    "img-src 'self' data:",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
  ].join("; "),
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "X-Frame-Options": "SAMEORIGIN",
};

const ALLOWED_EVENTS = new Set([
  "page_view",
  "resource_filter",
  "feedback_mailto",
  "steam_outbound",
  "role_hider",
  "role_seeker",
  "chapter_hider-basics",
  "chapter_map-tactics",
  "chapter_advanced-camouflage",
  "troubleshooting_open",
  "resource_guide",
  "resource_map",
  "resource_support",
  "map_open",
  "official_status",
]);

type EventPayload = {
  event?: unknown;
  label?: unknown;
  path?: unknown;
};

function withSecurityHeaders(response: Response) {
  const headers = new Headers(response.headers);

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }

  if (headers.get("content-type")?.includes("text/html")) {
    headers.set("Cache-Control", "public, max-age=300, stale-while-revalidate=86400");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function recordEvent(request: Request) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: { Allow: "POST" },
    });
  }

  const contentType = request.headers.get("content-type") || "";
  const contentLength = Number(request.headers.get("content-length"));

  if (!contentType.toLowerCase().startsWith("application/json")) {
    return new Response("Unsupported media type", { status: 415 });
  }

  if (!Number.isFinite(contentLength) || contentLength < 2 || contentLength > 2048) {
    return new Response("Invalid content length", { status: 413 });
  }

  let payload: EventPayload;
  try {
    payload = (await request.json()) as EventPayload;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  if (
    typeof payload.event !== "string" ||
    !ALLOWED_EVENTS.has(payload.event) ||
    typeof payload.path !== "string" ||
    !payload.path.startsWith("/") ||
    payload.path.length > 200 ||
    (payload.label !== undefined &&
      (typeof payload.label !== "string" || payload.label.length > 80))
  ) {
    return new Response("Invalid event", { status: 400 });
  }

  console.log({
    type: "site_event",
    event: payload.event,
    path: payload.path,
    label: payload.label,
    recordedAt: new Date().toISOString(),
  });

  return new Response(null, { status: 204 });
}

const worker: ExportedHandler<Env> = {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/events") {
      return withSecurityHeaders(await recordEvent(request));
    }

    return withSecurityHeaders(await env.ASSETS.fetch(request));
  },
};

export default worker;
