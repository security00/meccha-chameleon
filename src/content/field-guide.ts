export const CONTENT_REVIEWED_ON = "2026-07-18";
export const CURRENT_GAME_VERSION = "2.8.0";
export const OFFICIAL_STORE_URL =
  "https://store.steampowered.com/app/4704690/MECCHA_CHAMELEON/";
export const OFFICIAL_COMMUNITY_URL = "https://steamcommunity.com/app/4704690/";
export const OFFICIAL_GUIDES_URL = "https://steamcommunity.com/app/4704690/guides/";
export const OFFICIAL_UPDATE_2_8_URL =
  "https://steamcommunity.com/games/4704690/announcements/detail/711155348639056585";
export const OFFICIAL_UPDATE_2_7_URL =
  "https://steamcommunity.com/games/4704690/announcements/detail/674000199448790529";

export type Accent = "pink" | "cyan" | "yellow" | "green";
export type GuideRole = "hider" | "seeker" | "all";
export type GuideDifficulty = "starter" | "intermediate" | "advanced";

export type SourceLink = {
  label: string;
  url: string;
  kind: "Official" | "Community" | "Editorial";
  publishedOn?: string;
};

export type ContentReview = {
  verifiedOn: string;
  gameVersion: string;
  reviewer: string;
  status: "source-verified" | "editorial-reviewed" | "needs-review";
  needsReview: boolean;
};

const CURRENT_EDITORIAL_REVIEW: ContentReview = {
  verifiedOn: CONTENT_REVIEWED_ON,
  gameVersion: CURRENT_GAME_VERSION,
  reviewer: "Field guide editorial review",
  status: "editorial-reviewed",
  needsReview: false,
};

export type GuideSection = {
  id: string;
  title: string;
  intro: string;
  steps: readonly string[];
  fieldNote?: string;
};

export type GuideArticle = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  role: GuideRole;
  difficulty: GuideDifficulty;
  readingTime: string;
  accent: Accent;
  image: string;
  imageAlt: string;
  tags: readonly string[];
  verification: string;
  review: ContentReview;
  sections: readonly GuideSection[];
  sources: readonly SourceLink[];
};

export const guideArticles: readonly GuideArticle[] = [
  {
    slug: "hider-basics",
    title: "Hider basics: build a believable disguise",
    shortTitle: "Hider basics",
    eyebrow: "Role guide / Hider",
    description:
      "A repeatable preparation loop for matching the stage, controlling your silhouette, and choosing when to stop moving.",
    role: "hider",
    difficulty: "starter",
    readingTime: "6 min",
    accent: "pink",
    image: "/media/game/green-room.webp",
    imageAlt: "A painted player blending into a framed green wall scene",
    tags: ["paint", "silhouette", "material", "movement", "beginner"],
    review: CURRENT_EDITORIAL_REVIEW,
    verification:
      "The paint-and-pose premise is confirmed by the official Steam listing. Tactical sequencing is field-guide editorial advice and should be rechecked after major patches.",
    sections: [
      {
        id: "read-the-room",
        title: "Read the room before painting",
        intro:
          "Start with a location that gives your full body a visual job. A good color match cannot rescue a silhouette that has no reason to be there.",
        steps: [
          "Choose a surface or prop cluster large enough to contain most of your outline.",
          "Check the hiding angle from the doorway or route a Seeker is most likely to use.",
          "Prefer a quiet edge over the center of a high-traffic room until you know the lobby's search habits.",
        ],
        fieldNote: "Design the disguise for the Seeker's first viewing angle, not only for your own camera.",
      },
      {
        id: "match-surface",
        title: "Match color, material, and shape",
        intro:
          "Community guides consistently separate surface matching from simple color copying. Treat hue, brightness, material response, and body pose as one camouflage problem.",
        steps: [
          "Sample the dominant mid-tone first, then correct brightness before chasing small hue differences.",
          "Avoid glossy-looking paint against a flat wall, or a flat result against a strongly reflective prop.",
          "Use the pose that breaks long arms, legs, or head shapes into nearby visual lines.",
        ],
      },
      {
        id: "freeze-window",
        title: "Protect the freeze window",
        intro:
          "Movement is the fastest way to turn a plausible disguise into a readable player. Finish adjustments before the likely search route reaches your zone.",
        steps: [
          "Make one final camera check, then stop making cosmetic corrections.",
          "If you must relocate, move while the Seeker is crossing a doorway or facing another zone.",
          "After moving, repeat the brightness and silhouette check instead of assuming the old paint still works.",
        ],
      },
    ],
    sources: [
      { label: "Official Steam listing", url: OFFICIAL_STORE_URL, kind: "Official" },
      { label: "Steam Community guides", url: OFFICIAL_GUIDES_URL, kind: "Community" },
    ],
  },
  {
    slug: "seeker-basics",
    title: "Seeker basics: search rooms in repeatable zones",
    shortTitle: "Seeker basics",
    eyebrow: "Role guide / Seeker",
    description:
      "Replace random scanning with a zone route that catches movement, broken silhouettes, and surfaces that do not belong.",
    role: "seeker",
    difficulty: "starter",
    readingTime: "7 min",
    accent: "cyan",
    image: "/media/game/meat-locker.webp",
    imageAlt: "A dense interior used as a visual reference for a Seeker search route",
    tags: ["search", "route", "zones", "movement", "beginner"],
    review: CURRENT_EDITORIAL_REVIEW,
    verification:
      "The Seeker role and paint-based deception are confirmed by the official listing. The route method is editorial practice rather than an official game mechanic.",
    sections: [
      {
        id: "split-zones",
        title: "Split every room into three zones",
        intro:
          "A fixed route reduces repeat checks and makes it obvious which part of a room still needs attention.",
        steps: [
          "Clear the doorway and immediate corners before walking into the room.",
          "Sweep the outer wall clockwise, then inspect the central prop cluster.",
          "Finish with high, low, and behind-camera angles that were not covered by the first pass.",
        ],
        fieldNote: "Call the cleared zone out to teammates so two Seekers do not repeat the same scan.",
      },
      {
        id: "look-for-errors",
        title: "Look for errors before perfect matches",
        intro:
          "The easiest disguises to catch usually fail at shape or movement before they fail at exact color.",
        steps: [
          "Check for long player-shaped outlines cutting across otherwise straight scenery.",
          "Watch for small motion during camera turns instead of staring at one object for too long.",
          "Compare repeated props: one different pose, scale, or surface response deserves a second look.",
        ],
      },
      {
        id: "route-discipline",
        title: "Keep route discipline under time pressure",
        intro:
          "Late-round panic produces random camera movement and duplicate checks. Use a short reset whenever you lose your place.",
        steps: [
          "Stop for one second and identify the last fully cleared doorway.",
          "Resume from the next uncleared zone instead of restarting the entire map.",
          "Leave low-confidence objects marked mentally and return only after the room pass is complete.",
        ],
      },
    ],
    sources: [
      { label: "Official Steam listing", url: OFFICIAL_STORE_URL, kind: "Official" },
      { label: "Steam Community hub", url: OFFICIAL_COMMUNITY_URL, kind: "Community" },
    ],
  },
  {
    slug: "map-tactics",
    title: "Map tactics: turn unfamiliar rooms into a route",
    shortTitle: "Map tactics",
    eyebrow: "Field manual / Maps",
    description:
      "A first-round scouting worksheet for official and Workshop maps, including random elements and map-pool changes.",
    role: "all",
    difficulty: "intermediate",
    readingTime: "8 min",
    accent: "yellow",
    image: "/media/game/hotel-lobby.webp",
    imageAlt: "A decorated hotel-like lobby used as a map-planning reference",
    tags: ["maps", "workshop", "random", "route", "scouting"],
    review: CURRENT_EDITORIAL_REVIEW,
    verification:
      "Official update 2.7.0 confirms per-map random-pool toggles and random elements on Penguin Hotel. The scouting worksheet is editorial guidance.",
    sections: [
      {
        id: "first-lap",
        title: "Use the first lap as reconnaissance",
        intro:
          "Do not try to memorize every prop immediately. Build a small, reusable description of the map.",
        steps: [
          "Name three to five major zones using short labels your group will understand.",
          "Identify the two connectors that create the most backtracking.",
          "Note which rooms are visually dense, open, high-contrast, or easy to bypass.",
        ],
      },
      {
        id: "random-elements",
        title: "Separate stable geometry from random elements",
        intro:
          "Patch notes confirm that some official maps can change elements between rounds. Memorize routes and sightlines before relying on a fixed prop layout.",
        steps: [
          "Remember entrances, stairs, corridors, and room boundaries as the stable layer.",
          "Treat individual prop positions as a round-specific observation until confirmed otherwise.",
          "On repeat rounds, compare only the zones where changed scenery affects a hiding or search route.",
        ],
        fieldNote: "Penguin Hotel received random elements in update 2.7.0, so fixed-object callouts can age quickly.",
      },
      {
        id: "workshop-check",
        title: "Verify Workshop maps before relying on a guide",
        intro:
          "Workshop content can change independently of the base game. A map title alone is not enough to guarantee the same layout.",
        steps: [
          "Confirm the Workshop item and update date used by the host.",
          "Check whether every player has the same downloaded version before diagnosing route differences.",
          "Record creator and source URL with any community route notes you publish or share.",
        ],
      },
    ],
    sources: [
      { label: "Official Steam update feed", url: OFFICIAL_COMMUNITY_URL, kind: "Official" },
      { label: "Steam Workshop", url: `${OFFICIAL_COMMUNITY_URL}workshop/`, kind: "Community" },
    ],
  },
  {
    slug: "advanced-camouflage",
    title: "Advanced camouflage: control contrast and attention",
    shortTitle: "Advanced camouflage",
    eyebrow: "Field manual / Advanced",
    description:
      "Refine a good disguise by controlling contrast, pose readability, camera angle, and the Seeker's attention path.",
    role: "hider",
    difficulty: "advanced",
    readingTime: "9 min",
    accent: "green",
    image: "/media/game/brick-hide.webp",
    imageAlt: "A player hiding against a brick wall with a low-contrast paint treatment",
    tags: ["contrast", "pose", "lighting", "advanced", "mind games"],
    review: CURRENT_EDITORIAL_REVIEW,
    verification:
      "This is an editorial strategy chapter built on the official paint, pose, and spot premise. It does not claim hidden mechanics or guaranteed spots.",
    sections: [
      {
        id: "contrast-map",
        title: "Match the contrast map, not one sampled pixel",
        intro:
          "A surface usually contains a range of light and dark values. One perfect sample can still look artificial across a full body.",
        steps: [
          "Identify the dominant mid-tone and the darkest structural line near your position.",
          "Place body boundaries where the scene already has an edge, seam, frame, or shadow.",
          "Avoid creating a new bright island in an otherwise muted area.",
        ],
      },
      {
        id: "pose-readability",
        title: "Reduce pose readability",
        intro:
          "A pose works when the body reads as part of the scene at a glance, not when it merely looks funny from your own camera.",
        steps: [
          "Rotate until arms and legs overlap nearby visual lines.",
          "Hide the head shape inside a busier patch rather than leaving it against empty space.",
          "Test the likely doorway angle and one elevated or low alternative before freezing.",
        ],
      },
      {
        id: "attention",
        title: "Work with the Seeker's attention path",
        intro:
          "High-salience props attract the first scan. A strong disguise often sits one step outside that obvious focus point.",
        steps: [
          "Identify the object every new Seeker is likely to inspect first.",
          "Use its visual noise as cover without copying the exact same silhouette.",
          "If the spot survives a round, assume returning players will check it earlier next time.",
        ],
        fieldNote: "A successful spot becomes less safe once the lobby has learned it; rotate strategies, not only locations.",
      },
    ],
    sources: [
      { label: "Official Steam listing", url: OFFICIAL_STORE_URL, kind: "Official" },
      { label: "Steam Community guides", url: OFFICIAL_GUIDES_URL, kind: "Community" },
    ],
  },
];

export type MapGuide = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  accent: Accent;
  image: string;
  imageAlt: string;
  officialStatus: string;
  patch: string;
  patchNote: string;
  tags: readonly string[];
  review: ContentReview;
  fieldChecklist: readonly string[];
  sources: readonly SourceLink[];
};

export const mapGuides: readonly MapGuide[] = [
  {
    slug: "death-burger",
    name: "Death Burger",
    eyebrow: "Official map / New",
    description:
      "A field-file entry for the official map added in update 2.8.0. Detailed room callouts remain intentionally provisional until manually verified.",
    accent: "pink",
    image: "/media/game/meat-locker.webp",
    imageAlt: "Food-service gameplay reference image used for route planning",
    officialStatus: "Confirmed as an official map in the update 2.8.0 announcement.",
    patch: "2.8.0",
    patchNote: "Added as a new map; no stable route claims are published here yet.",
    tags: ["official", "new", "2.8.0", "route pending"],
    review: {
      verifiedOn: CONTENT_REVIEWED_ON,
      gameVersion: CURRENT_GAME_VERSION,
      reviewer: "Official patch note checked; in-game callouts pending",
      status: "needs-review",
      needsReview: true,
    },
    fieldChecklist: [
      "Name the major rooms and connectors during the first complete lap.",
      "Record high-traffic entrances before testing hiding positions.",
      "Treat every exact prop callout as provisional until it survives a second round.",
    ],
    sources: [
      {
        label: "Official update 2.8.0 announcement",
        url: OFFICIAL_UPDATE_2_8_URL,
        kind: "Official",
        publishedOn: "2026-07-17",
      },
    ],
  },
  {
    slug: "egypt",
    name: "Egypt",
    eyebrow: "Official map / Verified",
    description:
      "An official map introduced in update 2.7.0. This entry focuses on a safe first-round mapping routine instead of unverified hiding coordinates.",
    accent: "yellow",
    image: "/media/game/yellow-hall.webp",
    imageAlt: "Warm-toned gameplay corridor used as a field reference",
    officialStatus: "Confirmed as a new official map in update 2.7.0.",
    patch: "2.7.0",
    patchNote: "Added to the official map pool on July 12, 2026.",
    tags: ["official", "2.7.0", "warm tones", "scouting"],
    review: {
      verifiedOn: CONTENT_REVIEWED_ON,
      gameVersion: CURRENT_GAME_VERSION,
      reviewer: "Official patch note checked; current-build callouts pending",
      status: "needs-review",
      needsReview: true,
    },
    fieldChecklist: [
      "Separate similar warm surfaces by brightness before comparing hue.",
      "Label long sightlines and dead-end rooms so Seeker routes do not double back.",
      "Verify any community spot against the current patch before publishing it as stable.",
    ],
    sources: [
      {
        label: "Official update 2.7.0 announcement",
        url: OFFICIAL_UPDATE_2_7_URL,
        kind: "Official",
        publishedOn: "2026-07-12",
      },
    ],
  },
  {
    slug: "penguin-hotel",
    name: "Penguin Hotel",
    eyebrow: "Official map / Randomized",
    description:
      "An official map with random elements added in update 2.7.0. Learn geometry and routes before memorizing individual props.",
    accent: "cyan",
    image: "/media/game/hotel-lobby.webp",
    imageAlt: "A decorated hotel lobby gameplay reference",
    officialStatus: "Named as an official map in the update 2.7.0 notes.",
    patch: "2.7.0",
    patchNote: "Random elements were added, making fixed-object callouts less reliable.",
    tags: ["official", "random elements", "hotel", "2.7.0"],
    review: {
      verifiedOn: CONTENT_REVIEWED_ON,
      gameVersion: CURRENT_GAME_VERSION,
      reviewer: "Official patch note checked; randomized layouts need ongoing review",
      status: "needs-review",
      needsReview: true,
    },
    fieldChecklist: [
      "Memorize corridors, entrances, and room boundaries as the stable layer.",
      "Re-scan prop clusters each round instead of assuming the previous layout.",
      "Describe a hiding spot by room and sightline, not only by a nearby object.",
    ],
    sources: [
      {
        label: "Official update 2.7.0 announcement",
        url: OFFICIAL_UPDATE_2_7_URL,
        kind: "Official",
        publishedOn: "2026-07-12",
      },
    ],
  },
  {
    slug: "hikakin-museum",
    name: "HIKAKIN Museum",
    eyebrow: "Official map / Collaboration",
    description:
      "A collaboration map referenced by the official update 2.7.0 notes, with a wall-stuck issue fixed in that patch.",
    accent: "green",
    image: "/media/game/logo-wall.webp",
    imageAlt: "Museum-like gameplay wall used as a map field reference",
    officialStatus: "Confirmed by name in official update 2.7.0 patch notes.",
    patch: "2.7.0",
    patchNote: "Fixed an issue where players could get stuck too deeply into walls.",
    tags: ["official", "collaboration", "museum", "2.7.0"],
    review: {
      verifiedOn: CONTENT_REVIEWED_ON,
      gameVersion: CURRENT_GAME_VERSION,
      reviewer: "Official patch note checked; collision callouts need current-build review",
      status: "needs-review",
      needsReview: true,
    },
    fieldChecklist: [
      "Re-test older wall-based spots because collision behavior changed in 2.7.0.",
      "Use room labels and exhibits as navigation anchors without claiming fixed safe spots.",
      "Report reproducible collision problems through the official community channel.",
    ],
    sources: [
      {
        label: "Official update 2.7.0 announcement",
        url: OFFICIAL_UPDATE_2_7_URL,
        kind: "Official",
        publishedOn: "2026-07-12",
      },
    ],
  },
];

export type FieldGuideUpdate = {
  version: string;
  publishedOn: string;
  reviewedOn: string;
  title: string;
  summary: string;
  changes: readonly string[];
  affectedFiles: readonly string[];
  sourceUrl: string;
};

export const fieldGuideUpdates: readonly FieldGuideUpdate[] = [
  {
    version: "2.8.0",
    publishedOn: "2026-07-17",
    reviewedOn: CONTENT_REVIEWED_ON,
    title: "Death Burger and Paint Mode UI fix",
    summary:
      "The official announcement adds Death Burger and fixes an unclickable-button state involving the Mod download screen during Paint Mode.",
    changes: [
      "Added the Death Burger map file with all exact room and route claims marked as pending review.",
      "Added the Paint Mode button issue to troubleshooting and tied it to the confirmed patch note.",
      "Moved map evidence links from the general feed to the exact update announcement.",
    ],
    affectedFiles: ["Death Burger map file", "Paint Mode troubleshooting"],
    sourceUrl: OFFICIAL_UPDATE_2_8_URL,
  },
  {
    version: "2.7.0",
    publishedOn: "2026-07-12",
    reviewedOn: CONTENT_REVIEWED_ON,
    title: "Egypt, Penguin Hotel randomization, and HIKAKIN collision fix",
    summary:
      "The official announcement adds Egypt, adds random elements to Penguin Hotel, and fixes a wall-collision issue in HIKAKIN Museum.",
    changes: [
      "Added a source-checked Egypt map file without unverified hiding coordinates.",
      "Marked fixed-object Penguin Hotel callouts as unreliable because layouts can vary.",
      "Flagged older HIKAKIN Museum wall spots for current-build retesting.",
    ],
    affectedFiles: ["Egypt", "Penguin Hotel", "HIKAKIN Museum"],
    sourceUrl: OFFICIAL_UPDATE_2_7_URL,
  },
];

export type TroubleshootingItem = {
  id: string;
  title: string;
  summary: string;
  severity: "Quick check" | "Connection" | "Workshop" | "Performance";
  steps: readonly string[];
  escalation: string;
};

export const troubleshootingItems: readonly TroubleshootingItem[] = [
  {
    id: "room-not-visible",
    title: "A friend's room is not visible",
    summary: "Rule out version, region, privacy, and host-state mismatches in a fixed order.",
    severity: "Quick check",
    steps: [
      "Confirm every player has fully restarted Steam and is running the same current game version.",
      "Confirm the lobby region and whether the room is public, private, or invite-only.",
      "Ask the host to return to the lobby if the round has already started.",
      "Refresh the room list once, then recreate the lobby instead of repeatedly changing several settings.",
    ],
    escalation:
      "Check the official Steam Community announcements for maintenance or outage notices before treating it as a local configuration problem.",
  },
  {
    id: "cannot-join",
    title: "The room appears, but joining fails",
    summary: "Use a clean retry that changes one variable at a time.",
    severity: "Connection",
    steps: [
      "Restart the game and Steam, then retry the same room without changing the map.",
      "Have the host recreate the lobby with a base-game official map.",
      "Temporarily remove Workshop content from the test so a download mismatch is not confused with networking.",
      "If several players fail at the same time, check official service notices before troubleshooting individual machines.",
    ],
    escalation:
      "When reporting the problem, include game version, region, lobby visibility, map source, and the exact point where joining stops.",
  },
  {
    id: "workshop-download",
    title: "A Workshop map will not load",
    summary: "Verify the item and local download before changing network settings.",
    severity: "Workshop",
    steps: [
      "Open the host's exact Workshop item and confirm every player is using the same entry.",
      "Allow the Steam download to complete, then restart the game before rejoining.",
      "Test one official map to confirm the base lobby still works.",
      "If only one Workshop item fails, report it on that item's page with the current game version.",
    ],
    escalation:
      "Do not publish a workaround as universal unless it is reproducible across more than one lobby and patch version.",
  },
  {
    id: "paint-mode-buttons",
    title: "Buttons stop responding in Paint Mode",
    summary: "Update 2.8.0 includes a fix related to an unclickable-button state after the Mod download screen appears.",
    severity: "Quick check",
    steps: [
      "Confirm the game is updated to 2.8.0 or later.",
      "Exit Paint Mode and close the Mod download screen before retrying the control.",
      "Restart the game if the UI remains unresponsive after the screen closes.",
      "Capture the exact sequence if the problem still reproduces on the current patch.",
    ],
    escalation:
      "Send the reproduction sequence and patch number through the official Steam Community discussion channel.",
  },
  {
    id: "performance",
    title: "A dense map has low frame rate",
    summary: "Separate map-specific load from a general performance problem.",
    severity: "Performance",
    steps: [
      "Restart and test an official map with no Workshop downloads active.",
      "Compare the same lobby size on a visually simpler map.",
      "Lower the most expensive graphics options one at a time and keep the useful comparison.",
      "Record map, player count, spectator state, resolution, GPU, and patch before reporting.",
    ],
    escalation:
      "Use the official discussion or support channel for reproducible performance issues; this fan guide cannot inspect game logs or service health.",
  },
];

export function getGuide(slug: string) {
  return guideArticles.find((guide) => guide.slug === slug);
}

export function getMapGuide(slug: string) {
  return mapGuides.find((map) => map.slug === slug);
}
