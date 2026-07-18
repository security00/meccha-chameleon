const base = (process.env.SITE_URL || "https://meccha-chameleon.co").replace(/\/$/, "");

const routes = [
  ["/", "Match the room."],
  ["/guides/", "Choose the guide that solves this round."],
  ["/guides/hider-basics/", "Hider basics: build a believable disguise"],
  ["/guides/seeker-basics/", "Seeker basics: search rooms in repeatable zones"],
  ["/guides/map-tactics/", "Map tactics: turn unfamiliar rooms into a route"],
  ["/guides/advanced-camouflage/", "Advanced camouflage: control contrast and attention"],
  ["/maps/", "Know what changed before memorizing a spot."],
  ["/maps/death-burger/", "Death Burger"],
  ["/maps/egypt/", "Egypt"],
  ["/maps/penguin-hotel/", "Penguin Hotel"],
  ["/maps/hikakin-museum/", "HIKAKIN Museum"],
  ["/troubleshooting/", "Troubleshooting"],
  ["/privacy/", "Privacy Policy"],
  ["/terms/", "Terms of Service"],
];

const failures = [];

async function checkRoute(path, expectedText) {
  const response = await fetch(`${base}${path}`, { redirect: "follow" });
  const body = await response.text();
  const found = body.includes(expectedText);
  console.log(`${response.status} ${path.padEnd(36)} content=${found ? "ok" : "missing"}`);

  if (response.status !== 200) failures.push(`${path} returned ${response.status}`);
  if (!found) failures.push(`${path} is missing ${JSON.stringify(expectedText)}`);

  return response;
}

let homeResponse;
for (const [path, expectedText] of routes) {
  const response = await checkRoute(path, expectedText);
  if (path === "/") homeResponse = response;
}

for (const [path, contentType] of [
  ["/robots.txt", "text/plain"],
  ["/sitemap.xml", "application/xml"],
  ["/favicon.ico", "image/"],
]) {
  const response = await fetch(`${base}${path}`);
  const actualType = response.headers.get("content-type") || "";
  console.log(`${response.status} ${path.padEnd(36)} type=${actualType}`);
  if (response.status !== 200) failures.push(`${path} returned ${response.status}`);
  if (!actualType.includes(contentType)) failures.push(`${path} has unexpected type ${actualType}`);
}

const notFoundResponse = await fetch(`${base}/qa-route-that-does-not-exist/`);
const notFoundBody = await notFoundResponse.text();
console.log(`${notFoundResponse.status} ${"/qa-route-that-does-not-exist/".padEnd(36)} branded=${notFoundBody.includes("Target lost.")}`);
if (notFoundResponse.status !== 404) failures.push(`unknown route returned ${notFoundResponse.status}`);
if (!notFoundBody.includes("Target lost.")) failures.push("404 page is not branded");

const securityHeaders = [
  "content-security-policy",
  "permissions-policy",
  "referrer-policy",
  "x-content-type-options",
];
for (const header of securityHeaders) {
  if (!homeResponse?.headers.get(header)) failures.push(`home response is missing ${header}`);
}

const validEventResponse = await fetch(`${base}/api/events`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ event: "page_view", path: "/qa/", label: "Live verification" }),
});
console.log(`${validEventResponse.status} /api/events                         valid-event`);
if (validEventResponse.status !== 204) failures.push(`valid event returned ${validEventResponse.status}`);

const invalidEventResponse = await fetch(`${base}/api/events`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ event: "not_allowed", path: "/qa/" }),
});
console.log(`${invalidEventResponse.status} /api/events                         invalid-event`);
if (invalidEventResponse.status !== 400) failures.push(`invalid event returned ${invalidEventResponse.status}`);

if (failures.length > 0) {
  throw new Error(`Live verification failed:\n- ${failures.join("\n- ")}`);
}

console.log(`Verified ${routes.length} routes, site files, security headers, 404 handling, and event validation at ${base}.`);
