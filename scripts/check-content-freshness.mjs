const APP_ID = "4704690";
const EXPECTED_LATEST_GID = "1838407329259035";
const EXPECTED_LATEST_TITLE = "update2.8.0";
const endpoint = new URL(
  `https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${APP_ID}&count=10&maxlength=0&format=json`,
);

const response = await fetch(endpoint, {
  headers: { "user-agent": "meccha-chameleon-field-guide-freshness-check/1.0" },
});

if (!response.ok) {
  throw new Error(`Steam news request failed with ${response.status}`);
}

const payload = await response.json();
const announcements = payload?.appnews?.newsitems?.filter(
  (item) => item.feedname === "steam_community_announcements",
);
const latest = announcements?.[0];

if (!latest) {
  throw new Error("No official Steam Community announcement was returned.");
}

if (latest.gid !== EXPECTED_LATEST_GID) {
  console.error(
    JSON.stringify({
      status: "content-review-required",
      expected: { gid: EXPECTED_LATEST_GID, title: EXPECTED_LATEST_TITLE },
      latest: { gid: latest.gid, title: latest.title, url: latest.url },
    }),
  );
  process.exitCode = 1;
} else {
  console.log(
    JSON.stringify({
      status: "current",
      latest: { gid: latest.gid, title: latest.title, url: latest.url },
    }),
  );
}
