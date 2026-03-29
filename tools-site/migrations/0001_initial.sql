-- Core tools table
CREATE TABLE tools (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT,
  github_url TEXT,
  description TEXT NOT NULL,
  install_command TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,
  loop_phases TEXT NOT NULL,
  integration_method TEXT,
  platforms TEXT,
  languages TEXT,
  license TEXT,
  maintained INTEGER DEFAULT 1,
  last_verified TEXT,
  source_file TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Full-text search
CREATE VIRTUAL TABLE tools_fts USING fts5(
  name, description, category, subcategory, platforms, languages,
  content='tools', content_rowid='rowid'
);

-- Triggers to keep FTS in sync
CREATE TRIGGER tools_ai AFTER INSERT ON tools BEGIN
  INSERT INTO tools_fts(rowid, name, description, category, subcategory, platforms, languages)
  VALUES (new.rowid, new.name, new.description, new.category, new.subcategory, new.platforms, new.languages);
END;

CREATE TRIGGER tools_ad AFTER DELETE ON tools BEGIN
  INSERT INTO tools_fts(tools_fts, rowid, name, description, category, subcategory, platforms, languages)
  VALUES ('delete', old.rowid, old.name, old.description, old.category, old.subcategory, old.platforms, old.languages);
END;

CREATE TRIGGER tools_au AFTER UPDATE ON tools BEGIN
  INSERT INTO tools_fts(tools_fts, rowid, name, description, category, subcategory, platforms, languages)
  VALUES ('delete', old.rowid, old.name, old.description, old.category, old.subcategory, old.platforms, old.languages);
  INSERT INTO tools_fts(rowid, name, description, category, subcategory, platforms, languages)
  VALUES (new.rowid, new.name, new.description, new.category, new.subcategory, new.platforms, new.languages);
END;

-- News/updates feed
CREATE TABLE news (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  tool_id TEXT REFERENCES tools(id),
  type TEXT NOT NULL,
  published_at TEXT DEFAULT (datetime('now'))
);

-- Categories metadata
CREATE TABLE categories (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  tool_count INTEGER DEFAULT 0
);

-- Indexes
CREATE INDEX idx_tools_category ON tools(category);
CREATE INDEX idx_tools_maintained ON tools(maintained);
CREATE INDEX idx_news_type ON news(type);
CREATE INDEX idx_news_published ON news(published_at DESC);

-- Seed categories
INSERT INTO categories (slug, name, description, icon) VALUES
  ('claude', 'Claude Code', 'Plugins, MCP servers, hooks, and skills for Claude Code', '🤖'),
  ('web-frontend', 'Web Frontend', 'Frameworks, linters, component libraries, and visual testing for web UI', '🌐'),
  ('web-backend', 'Web Backend', 'Server frameworks, databases, API tools, and security scanning', '⚙️'),
  ('web-client-server', 'Client-Server', 'Authentication, real-time, API architecture, and data validation', '🔗'),
  ('web-visual', 'Visual Testing', 'Visual regression, design verification, and accessibility testing for web', '👁️'),
  ('apple', 'Apple Platforms', 'Swift/SwiftUI tooling, Xcode CLI, and UI verification for iOS/macOS', '🍎'),
  ('android', 'Android', 'Kotlin/Compose tooling, Gradle, ADB, and UI verification', '🤖'),
  ('windows', 'Windows/.NET', '.NET tooling, WinUI/WPF/MAUI build and UI verification', '🪟'),
  ('cli', 'CLI & Terminal', 'Argument parsing, shell testing, TUI frameworks, and distribution', '💻'),
  ('infrastructure', 'Infrastructure', 'Terraform, Docker, Kubernetes, CI/CD, and deployment verification', '🏗️'),
  ('data-ml', 'Data & ML', 'Data validation, notebook tooling, pipeline testing, and experiment tracking', '📊'),
  ('third-party', 'Third-Party AI Tools', 'Cursor, Windsurf, Cline, Aider, and other AI coding tools', '🔌');
