const SECURITY_HEADERS: Record<string, string> = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.google.com https://*.clarity.ms https://c.bing.com https://plausible.shipsolo.io",
    "font-src 'self'",
    "form-action 'self' mailto:",
    "frame-ancestors 'self'",
    "img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com https://*.clarity.ms https://c.bing.com",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com https://*.googletagmanager.com https://*.clarity.ms https://plausible.shipsolo.io",
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
  "resource_search",
  "search_zero_results",
  "feedback_submit",
  "feedback_mailto",
  "share_copy",
  "share_native",
  "print",
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

const FEEDBACK_CATEGORIES = new Set([
  "Correction",
  "Patch update",
  "Broken link",
  "Accessibility",
]);

type EventPayload = {
  event?: unknown;
  label?: unknown;
  path?: unknown;
};

type FeedbackPayload = {
  category?: unknown;
  context?: unknown;
  elapsedMs?: unknown;
  message?: unknown;
  page?: unknown;
  website?: unknown;
};

class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

function withSecurityHeaders(response: Response) {
  const headers = new Headers(response.headers);

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }

  if (headers.get("content-type")?.includes("text/html")) {
    headers.set("Cache-Control", "public, max-age=300, stale-while-revalidate=86400");
  } else if (headers.get("content-type")?.includes("application/json")) {
    headers.set("Cache-Control", "no-store");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, { status });
}

function normalizeNextDataRequest(request: Request) {
  if (request.method !== "GET" && request.method !== "HEAD") return request;

  const url = new URL(request.url);
  const decodedPathname = decodeURIComponent(url.pathname);
  const slashIndex = decodedPathname.lastIndexOf("/");
  const directory = decodedPathname.slice(0, slashIndex + 1);
  const filename = decodedPathname.slice(slashIndex + 1);
  const segments = filename.split(".");

  if (segments[0] !== "__next" || segments.at(-1) !== "txt" || segments.length < 4) {
    return request;
  }

  const routeStateDirectory = `${segments[0]}.${segments[1]}`;
  const nestedStatePath = segments.slice(2, -1).join("/");
  url.pathname = `${directory}${routeStateDirectory}/${nestedStatePath}.txt`;
  return new Request(url, request);
}

function requirePost(request: Request) {
  if (request.method !== "POST") {
    throw new ApiError(405, "Method not allowed");
  }
}

function requireSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (origin !== new URL(request.url).origin) {
    throw new ApiError(403, "Invalid origin");
  }
}

async function readJsonBody<T>(request: Request, maximumBytes: number): Promise<T> {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    throw new ApiError(415, "Unsupported media type");
  }

  const declaredLength = request.headers.get("content-length");
  if (declaredLength !== null) {
    const length = Number(declaredLength);
    if (!Number.isFinite(length) || length < 2 || length > maximumBytes) {
      throw new ApiError(413, "Invalid content length");
    }
  }

  if (!request.body) {
    throw new ApiError(400, "Request body is required");
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > maximumBytes) {
      await reader.cancel();
      throw new ApiError(413, "Request body is too large");
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return JSON.parse(new TextDecoder().decode(bytes)) as T;
  } catch {
    throw new ApiError(400, "Invalid JSON");
  }
}

function validateEvent(payload: EventPayload) {
  if (
    typeof payload.event !== "string" ||
    !ALLOWED_EVENTS.has(payload.event) ||
    typeof payload.path !== "string" ||
    !payload.path.startsWith("/") ||
    payload.path.length > 200 ||
    (payload.label !== undefined &&
      (typeof payload.label !== "string" || payload.label.length > 80))
  ) {
    throw new ApiError(400, "Invalid event");
  }

  return {
    event: payload.event,
    label: typeof payload.label === "string" ? payload.label : null,
    path: payload.path,
  };
}

async function recordEvent(request: Request, env: Env, ctx: ExecutionContext) {
  requirePost(request);
  requireSameOrigin(request);
  const event = validateEvent(await readJsonBody<EventPayload>(request, 2048));
  const id = crypto.randomUUID();
  const recordedAt = new Date().toISOString();

  ctx.waitUntil(
    env.DB.prepare(
      "INSERT INTO site_events (id, event, path, label, created_at) VALUES (?1, ?2, ?3, ?4, ?5)",
    )
      .bind(id, event.event, event.path, event.label, recordedAt)
      .run()
      .then(() => {
        console.log({ type: "site_event", ...event, id, recordedAt });
      })
      .catch((error: unknown) => {
        console.error({
          type: "site_event_write_failed",
          event: event.event,
          message: error instanceof Error ? error.message : "Unknown D1 error",
        });
      }),
  );

  return new Response(null, { status: 204 });
}

function validateFeedback(payload: FeedbackPayload) {
  if (typeof payload.website === "string" && payload.website.length > 0) {
    return null;
  }

  if (
    typeof payload.category !== "string" ||
    !FEEDBACK_CATEGORIES.has(payload.category) ||
    typeof payload.context !== "string" ||
    payload.context.length < 1 ||
    payload.context.length > 160 ||
    typeof payload.page !== "string" ||
    !payload.page.startsWith("/") ||
    payload.page.length > 300 ||
    typeof payload.message !== "string" ||
    payload.message.trim().length < 10 ||
    payload.message.length > 1500 ||
    typeof payload.elapsedMs !== "number" ||
    !Number.isFinite(payload.elapsedMs) ||
    payload.elapsedMs < 1500 ||
    payload.elapsedMs > 86_400_000
  ) {
    throw new ApiError(400, "Invalid feedback submission");
  }

  return {
    category: payload.category,
    context: payload.context.trim(),
    message: payload.message.trim(),
    page: payload.page,
  };
}

async function recordFeedback(request: Request, env: Env) {
  requirePost(request);
  requireSameOrigin(request);
  const feedback = validateFeedback(await readJsonBody<FeedbackPayload>(request, 4096));

  if (!feedback) {
    return jsonResponse({ ok: true }, 202);
  }

  const id = crypto.randomUUID();
  const recordedAt = new Date().toISOString();
  await env.DB.prepare(
    "INSERT INTO feedback_submissions (id, category, context, page, message, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
  )
    .bind(
      id,
      feedback.category,
      feedback.context,
      feedback.page,
      feedback.message,
      recordedAt,
    )
    .run();

  console.log({
    type: "feedback_submission",
    id,
    category: feedback.category,
    context: feedback.context,
    recordedAt,
  });

  return jsonResponse({ ok: true, reference: id }, 201);
}

async function handleApi(request: Request, env: Env, ctx: ExecutionContext) {
  const pathname = new URL(request.url).pathname;

  try {
    if (pathname === "/api/events") {
      return await recordEvent(request, env, ctx);
    }

    if (pathname === "/api/feedback") {
      return await recordFeedback(request, env);
    }

    return jsonResponse({ error: "Not found" }, 404);
  } catch (error) {
    if (error instanceof ApiError) {
      const response = jsonResponse({ error: error.message }, error.status);
      if (error.status === 405) response.headers.set("Allow", "POST");
      return response;
    }

    console.error({
      type: "api_error",
      pathname,
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return jsonResponse({ error: "Unable to process the request" }, 500);
  }
}

const worker: ExportedHandler<Env> = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      return withSecurityHeaders(await handleApi(request, env, ctx));
    }

    return withSecurityHeaders(await env.ASSETS.fetch(normalizeNextDataRequest(request)));
  },

  async scheduled(_controller, env, ctx) {
    ctx.waitUntil(
      env.DB.batch([
        env.DB.prepare("DELETE FROM site_events WHERE created_at < datetime('now', '-90 days')"),
        env.DB.prepare(
          "DELETE FROM feedback_submissions WHERE created_at < datetime('now', '-365 days')",
        ),
      ]).then((results) => {
        console.log({
          type: "retention_cleanup",
          eventRowsDeleted: results[0].meta.changes,
          feedbackRowsDeleted: results[1].meta.changes,
          recordedAt: new Date().toISOString(),
        });
      }),
    );
  },
};

export default worker;
