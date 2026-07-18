CREATE TABLE IF NOT EXISTS site_events (
  id TEXT PRIMARY KEY,
  event TEXT NOT NULL CHECK (length(event) BETWEEN 1 AND 64),
  path TEXT NOT NULL CHECK (length(path) BETWEEN 1 AND 200),
  label TEXT CHECK (label IS NULL OR length(label) <= 80),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_site_events_created_at
  ON site_events(created_at);

CREATE INDEX IF NOT EXISTS idx_site_events_event_created_at
  ON site_events(event, created_at);

CREATE TABLE IF NOT EXISTS feedback_submissions (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL CHECK (
    category IN ('Correction', 'Patch update', 'Broken link', 'Accessibility')
  ),
  context TEXT NOT NULL CHECK (length(context) BETWEEN 1 AND 160),
  page TEXT NOT NULL CHECK (length(page) BETWEEN 1 AND 300),
  message TEXT NOT NULL CHECK (length(message) BETWEEN 10 AND 1500),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'resolved', 'spam')),
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_feedback_status_created_at
  ON feedback_submissions(status, created_at);
