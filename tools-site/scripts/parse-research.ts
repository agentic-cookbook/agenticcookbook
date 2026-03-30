#!/usr/bin/env npx tsx
/**
 * parse-research.ts
 *
 * Parses all markdown research files in research/developer-tools/ and extracts
 * tool entries into a structured JSON file at scripts/tools.json.
 *
 * Usage: npx tsx scripts/parse-research.ts
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, basename, dirname } from "node:path";
import { randomUUID } from "node:crypto";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ToolEntry {
  id: string;
  name: string;
  url: string | null;
  github_url: string | null;
  description: string;
  install_command: string | null;
  category: string;
  subcategory: string | null;
  loop_phases: string;
  integration_method: string | null;
  platforms: string | null;
  languages: string | null;
  source_file: string;
}

// ---------------------------------------------------------------------------
// Category mapping
// ---------------------------------------------------------------------------

function resolveCategory(dir: string, fileName: string): string {
  switch (dir) {
    case "claude":
      return "claude";
    case "apple":
      return "apple";
    case "android":
      return "android";
    case "windows":
      return "windows";
    case "cli":
      return "cli";
    case "infrastructure":
      return "infrastructure";
    case "data-ml":
      return "data-ml";
    case "third-party-integrations":
      return "third-party";
    case "web": {
      if (fileName.startsWith("frontend-frameworks")) return "web-frontend";
      if (fileName.startsWith("backend")) return "web-backend";
      if (fileName.startsWith("client-server")) return "web-client-server";
      if (fileName.startsWith("visual-regression")) return "web-visual";
      return "web-frontend"; // fallback
    }
    default:
      return dir;
  }
}

// ---------------------------------------------------------------------------
// Text-cleaning utilities
// ---------------------------------------------------------------------------

function kebabCase(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Extract the text and href from a markdown link like `[Text](url)` */
function parseMarkdownLink(md: string): { text: string; href: string } | null {
  const m = md.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (!m) return null;
  return { text: m[1].trim(), href: m[2].trim() };
}

/** Strip bold markers and leading/trailing whitespace */
function stripBold(s: string): string {
  return s.replace(/\*\*/g, "").trim();
}

/** Clean a table cell value: trim, strip trailing pipes */
function cleanCell(s: string): string {
  return s.replace(/^\s*\|?\s*/, "").replace(/\s*\|?\s*$/, "").trim();
}

// ---------------------------------------------------------------------------
// Phase / integration / platform / language detection
// ---------------------------------------------------------------------------

const PHASE_KEYWORDS = ["plan", "implement", "verify"];

function detectPhases(text: string): string[] {
  const lower = text.toLowerCase();
  return PHASE_KEYWORDS.filter((p) => lower.includes(p));
}

const INTEGRATION_KEYWORDS: [string, string][] = [
  ["mcp", "mcp"],
  ["plugin", "plugin"],
  ["hook", "hook"],
  ["cli shell-out", "cli"],
  ["cli", "cli"],
  ["skill", "skill"],
  ["agent", "agent"],
];

function detectIntegration(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [keyword, value] of INTEGRATION_KEYWORDS) {
    if (lower.includes(keyword)) return value;
  }
  return null;
}

const PLATFORM_KEYWORDS = [
  "ios",
  "macos",
  "watchos",
  "tvos",
  "visionos",
  "android",
  "windows",
  "linux",
  "web",
  "cloudflare",
  "aws",
  "gcp",
  "azure",
  "docker",
  "kubernetes",
];

function detectPlatforms(text: string): string[] {
  const lower = text.toLowerCase();
  return PLATFORM_KEYWORDS.filter((p) => lower.includes(p));
}

const LANGUAGE_KEYWORDS = [
  "typescript",
  "javascript",
  "python",
  "rust",
  "go",
  "java",
  "kotlin",
  "swift",
  "c#",
  "c++",
  "ruby",
  "php",
  "elixir",
  "lua",
  "bash",
  "sql",
  "hcl",
  "terraform",
];

function detectLanguages(text: string): string[] {
  const lower = text.toLowerCase();
  return LANGUAGE_KEYWORDS.filter((l) => lower.includes(l));
}

// ---------------------------------------------------------------------------
// Find all .md files recursively
// ---------------------------------------------------------------------------

function findMarkdownFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...findMarkdownFiles(full));
    } else if (entry.endsWith(".md")) {
      results.push(full);
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Extract install command from text
// ---------------------------------------------------------------------------

function extractInstall(text: string): string | null {
  // Look for backtick-wrapped commands that look like installs
  const patterns = [
    /`(npm install[^`]+)`/,
    /`(npm i [^`]+)`/,
    /`(npx [^`]+)`/,
    /`(pip install[^`]+)`/,
    /`(brew install[^`]+)`/,
    /`(cargo (?:add|install)[^`]+)`/,
    /`(go get[^`]+)`/,
    /`(gem install[^`]+)`/,
    /`(dotnet (?:add|tool install)[^`]+)`/,
    /`(sdk install[^`]+)`/,
    /`(docker run[^`]+)`/,
    /`(curl [^`]+)`/,
  ];
  for (const pat of patterns) {
    const m = text.match(pat);
    if (m) return m[1].trim();
  }
  return null;
}

// ---------------------------------------------------------------------------
// Table parser
// ---------------------------------------------------------------------------

interface TableRow {
  cells: string[];
}

function parseTableRows(lines: string[], startIdx: number): TableRow[] {
  const rows: TableRow[] = [];
  let i = startIdx;

  // Skip header row
  if (i < lines.length && lines[i].includes("|")) {
    i++;
  }
  // Skip separator row
  if (i < lines.length && /^\s*\|?\s*[-:]+/.test(lines[i])) {
    i++;
  }

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line.startsWith("|") && !line.includes("|")) break;
    if (/^\s*\|?\s*[-:]+/.test(line)) {
      i++;
      continue;
    }

    // Split by pipe, skip first/last empty
    const parts = line.split("|");
    // Remove leading/trailing empty strings from pipe splitting
    if (parts.length > 0 && parts[0].trim() === "") parts.shift();
    if (parts.length > 0 && parts[parts.length - 1].trim() === "") parts.pop();

    if (parts.length >= 2) {
      rows.push({ cells: parts.map((c) => c.trim()) });
    }
    i++;
  }
  return rows;
}

// ---------------------------------------------------------------------------
// Parse a single markdown file
// ---------------------------------------------------------------------------

function parseFile(
  filePath: string,
  researchRoot: string,
  warnings: string[]
): ToolEntry[] {
  const content = readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const relPath = relative(researchRoot, filePath);
  const dirName = relative(researchRoot, dirname(filePath)).split("/")[0];
  const fileName = basename(filePath);
  const category = resolveCategory(dirName, fileName);

  const tools: ToolEntry[] = [];

  // Track current headings for subcategory
  let currentH2 = "";
  let currentH3 = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Track H2 headings
    const h2Match = line.match(/^## (.+)/);
    if (h2Match) {
      currentH2 = h2Match[1].trim();
      currentH3 = "";
      continue;
    }

    // Track H3 headings
    const h3Match = line.match(/^### (.+)/);
    if (h3Match) {
      currentH3 = h3Match[1].trim();
    }

    // -----------------------------------------------------------------------
    // Format 1: Markdown tables
    // -----------------------------------------------------------------------
    if (line.trim().startsWith("|") && line.includes("|")) {
      // Check if this looks like a table header (has at least a tool name column)
      const headerLine = line;
      const nextLine = i + 1 < lines.length ? lines[i + 1] : "";

      // Must be followed by a separator row
      if (!/^\s*\|?\s*[-:]+/.test(nextLine)) continue;

      const rows = parseTableRows(lines, i);
      if (rows.length === 0) continue;

      // Determine table structure from header
      const headerCells = headerLine
        .split("|")
        .map((c) => c.trim())
        .filter((c) => c !== "");
      const headerLower = headerCells.map((h) => h.toLowerCase());

      // Skip tables that are clearly not tool listings
      // (like key flags tables, strategy tables, config tables, etc.)
      const hasToolOrNameCol =
        headerLower.some(
          (h) =>
            h.includes("tool") ||
            h.includes("server") ||
            h.includes("plugin") ||
            h.includes("registry") ||
            h === "purpose"
        ) ||
        (headerCells.length >= 2 &&
          rows.some((r) => {
            const link = parseMarkdownLink(r.cells[0] || "");
            return link !== null;
          }));

      if (!hasToolOrNameCol) {
        // Skip past this table
        i += rows.length + 2;
        continue;
      }

      for (const row of rows) {
        try {
          const firstCell = row.cells[0] || "";
          const link = parseMarkdownLink(firstCell);

          let name: string;
          let url: string | null = null;

          if (link) {
            name = stripBold(link.text);
            url = link.href;
          } else {
            // No link -- might be bolded name
            name = stripBold(firstCell);
            if (!name || /^[-]+$/.test(name)) continue;
          }

          // Skip header-like rows and empty names
          if (!name || name.toLowerCase() === "tool" || name.toLowerCase() === "server") continue;

          // Collect all text from the row for detection
          const rowText = row.cells.join(" ");

          // Description: usually 2nd column
          let description = row.cells[1] || "";
          description = description.trim();
          if (!description) continue;

          // Install command: look for a cell with install-like content
          let installCommand: string | null = null;
          for (const cell of row.cells.slice(2)) {
            const inst = extractInstall(cell);
            if (inst) {
              installCommand = inst;
              break;
            }
          }
          // Also look in the install column directly
          if (!installCommand) {
            for (const cell of row.cells) {
              const cellLower = cell.toLowerCase();
              if (
                cellLower.includes("install") ||
                cellLower.includes("npm") ||
                cellLower.includes("pip") ||
                cellLower.includes("brew") ||
                cellLower.includes("cargo") ||
                cellLower.includes("dotnet") ||
                cellLower.includes("go get")
              ) {
                // Clean backticks
                const cleaned = cell.replace(/`/g, "").trim();
                if (
                  cleaned.match(
                    /^(npm|pip|brew|cargo|go get|gem|dotnet|npx|sdk|docker)/
                  )
                ) {
                  installCommand = cleaned;
                  break;
                }
              }
            }
          }

          // Subcategory from nearest heading
          const subcat = currentH3 || currentH2;
          const subcategory = subcat ? kebabCase(subcat) : null;

          // Phases
          const sectionText = currentH2 + " " + currentH3 + " " + rowText;
          const phases = detectPhases(sectionText);

          // Github URL
          const githubUrl =
            url && url.includes("github.com") ? url : null;

          // Integration
          const integration = detectIntegration(rowText);

          // Platforms
          const platforms = detectPlatforms(rowText + " " + currentH2);

          // Languages
          const languages = detectLanguages(
            rowText + " " + currentH2 + " " + currentH3
          );

          tools.push({
            id: randomUUID(),
            name,
            url,
            github_url: githubUrl,
            description,
            install_command: installCommand,
            category,
            subcategory,
            loop_phases: phases.length > 0 ? phases.join(",") : "implement",
            integration_method: integration,
            platforms: platforms.length > 0 ? platforms.join(",") : null,
            languages: languages.length > 0 ? languages.join(",") : null,
            source_file: relPath,
          });
        } catch (e) {
          warnings.push(
            `  WARN: Skipped table row in ${relPath}: ${(e as Error).message}`
          );
        }
      }

      // Advance past the table
      i += rows.length + 2;
      continue;
    }

    // -----------------------------------------------------------------------
    // Format 2 & 3: Definition list
    //   Variant A: ### [Tool Name](url) followed by bullets
    //   Variant B: ### Tool Name followed by - **Link:** and - **What:** bullets
    // -----------------------------------------------------------------------
    if (h3Match) {
      const headingText = h3Match[1].trim();
      const headingLink = parseMarkdownLink(headingText);

      // Collect the definition body (all lines until next heading)
      const bodyLines: string[] = [];
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j];
        if (/^#{1,3} /.test(nextLine)) break;
        bodyLines.push(nextLine);
        j++;
      }
      const bodyText = bodyLines.join("\n");

      // Check for definition-list markers in the body
      const hasLinkBullet = bodyText.match(
        /[-*]\s+\*\*Link(?:\s*:)?\*\*\s*:?\s*(.+)/i
      );
      const hasWhatBullet = bodyText.match(
        /[-*]\s+\*\*What(?:\s+it\s+(?:does|is))?(?:\s*:)?\*\*\s*:?\s*(.+)/i
      );
      const hasDescBullet = bodyText.match(
        /[-*]\s+\*\*Description(?:\s*:)?\*\*\s*:?\s*(.+)/i
      );

      // Determine if this is a tool definition (either has a link in heading or definition bullets)
      const isToolDef = headingLink || hasLinkBullet || hasWhatBullet || hasDescBullet;
      if (!isToolDef) continue;

      // Resolve tool name and URL
      let toolName: string;
      let toolUrl: string | null = null;

      if (headingLink) {
        toolName = stripBold(headingLink.text);
        toolUrl = headingLink.href;
      } else {
        // Strip parenthetical suffixes like "(Point-Free)" from names
        toolName = stripBold(headingText.replace(/\s*\(.+\)\s*$/, "").trim());
      }

      // If URL not from heading, try the Link bullet
      if (!toolUrl && hasLinkBullet) {
        const linkParsed = parseMarkdownLink(hasLinkBullet[1]);
        if (linkParsed) {
          toolUrl = linkParsed.href;
        } else {
          const urlMatch = hasLinkBullet[1].match(/(https?:\/\/[^\s)]+)/);
          if (urlMatch) toolUrl = urlMatch[1];
        }
      }

      // Extract description
      let description = "";
      if (hasWhatBullet) {
        description = hasWhatBullet[1].trim();
      } else if (hasDescBullet) {
        description = hasDescBullet[1].trim();
      } else {
        // Use the first non-empty, non-heading, non-code line
        for (const bl of bodyLines) {
          const trimmed = bl.trim();
          if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("```")) {
            description = trimmed.replace(/^[-*]\s*/, "").replace(/\*\*/g, "");
            break;
          }
        }
      }

      if (!description || !toolName) continue;

      // Extract install command from body
      let installCommand: string | null = null;
      const installLineMatch = bodyText.match(
        /[-*]\s+\*\*Install(?:\s*:)?\*\*\s*:?\s*(.+)/i
      );
      if (installLineMatch) {
        installCommand = extractInstall(installLineMatch[1]);
        if (!installCommand) {
          const backtickMatch = installLineMatch[1].match(/`([^`]+)`/);
          if (backtickMatch) installCommand = backtickMatch[1];
        }
      }
      if (!installCommand) {
        installCommand = extractInstall(bodyText);
      }

      // Extract loop phase
      const phaseMatch = bodyText.match(
        /[-*]\s+\*\*(?:Loop\s+)?[Pp]hase(?:\s*:)?\*\*\s*:?\s*(.+)/i
      );
      const phaseText = phaseMatch
        ? phaseMatch[1]
        : currentH2 + " " + bodyText;
      const phases = detectPhases(phaseText);

      // Github URL
      const githubUrl =
        toolUrl && toolUrl.includes("github.com") ? toolUrl : null;

      // Integration
      const integration = detectIntegration(bodyText);

      // Platforms
      const platformMatch = bodyText.match(
        /[-*]\s+\*\*Platforms?(?:\s*:)?\*\*\s*:?\s*(.+)/i
      );
      const platformText = platformMatch
        ? platformMatch[1]
        : bodyText + " " + currentH2;
      const platforms = detectPlatforms(platformText);

      // Languages
      const languages = detectLanguages(
        bodyText + " " + currentH2 + " " + currentH3
      );

      // Subcategory from H2
      const subcategory = currentH2 ? kebabCase(currentH2) : null;

      tools.push({
        id: randomUUID(),
        name: toolName,
        url: toolUrl,
        github_url: githubUrl,
        description,
        install_command: installCommand,
        category,
        subcategory,
        loop_phases: phases.length > 0 ? phases.join(",") : "implement",
        integration_method: integration,
        platforms: platforms.length > 0 ? platforms.join(",") : null,
        languages: languages.length > 0 ? languages.join(",") : null,
        source_file: relPath,
      });

      continue;
    }
  }

  return tools;
}

// ---------------------------------------------------------------------------
// Deduplication
// ---------------------------------------------------------------------------

function scoreEntry(t: ToolEntry): number {
  let score = 0;
  score += t.description.length;           // longer descriptions are better
  if (t.url) score += 20;
  if (t.github_url) score += 10;
  if (t.install_command) score += 15;
  if (t.platforms) score += 5;
  if (t.languages) score += 5;
  if (t.integration_method) score += 5;
  return score;
}

function deduplicateTools(tools: ToolEntry[]): ToolEntry[] {
  const seen = new Map<string, ToolEntry>();
  for (const tool of tools) {
    // Key by lowercase name + category to allow same tool in different categories
    const key = `${tool.name.toLowerCase()}::${tool.category}`;
    if (!seen.has(key)) {
      seen.set(key, tool);
    } else {
      const existing = seen.get(key)!;
      if (scoreEntry(tool) > scoreEntry(existing)) {
        seen.set(key, { ...tool, id: existing.id });
      }
    }
  }
  return Array.from(seen.values());
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const RESEARCH_ROOT = join(
  dirname(dirname(import.meta.url.replace("file://", ""))),
  "..",
  "developer-tools",
  "research"
);

function main() {
  console.log(`\nParsing research files from: ${RESEARCH_ROOT}\n`);

  const files = findMarkdownFiles(RESEARCH_ROOT);
  console.log(`Found ${files.length} markdown files\n`);

  const allTools: ToolEntry[] = [];
  const warnings: string[] = [];

  for (const file of files) {
    const tools = parseFile(file, RESEARCH_ROOT, warnings);
    const relPath = relative(RESEARCH_ROOT, file);
    console.log(`  ${relPath}: ${tools.length} tools`);
    allTools.push(...tools);
  }

  // Deduplicate
  const uniqueTools = deduplicateTools(allTools);

  // Write output
  const outPath = join(dirname(import.meta.url.replace("file://", "")), "tools.json");
  writeFileSync(outPath, JSON.stringify(uniqueTools, null, 2));

  // Stats
  console.log(`\n--- Stats ---`);
  console.log(`Total tools extracted: ${uniqueTools.length}`);

  const byCat = new Map<string, number>();
  for (const t of uniqueTools) {
    byCat.set(t.category, (byCat.get(t.category) || 0) + 1);
  }
  console.log(`\nBy category:`);
  for (const [cat, count] of [...byCat.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${count}`);
  }

  if (warnings.length > 0) {
    console.log(`\nWarnings (${warnings.length}):`);
    for (const w of warnings) {
      console.log(w);
    }
  }

  console.log(`\nOutput written to: ${outPath}\n`);
}

main();
