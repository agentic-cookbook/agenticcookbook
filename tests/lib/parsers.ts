import { readFileSync, existsSync, readdirSync, lstatSync } from "fs";
import { resolve, basename, dirname, join, relative } from "path";
import { globSync } from "fs";
import { parse as parseYaml } from "yaml";

/** Root of the agentic-cookbook repo (parent of tests/) */
export const REPO_ROOT = resolve(import.meta.dirname, "../..");

// ---------- YAML Frontmatter ----------

export interface Frontmatter {
  [key: string]: unknown;
  name?: string;
  version?: string;
  description?: string;
  "argument-hint"?: string;
  "allowed-tools"?: string;
  "disable-model-invocation"?: boolean;
  globs?: string;
  context?: string;
}

export interface ParsedFile {
  path: string;
  relativePath: string;
  frontmatter: Frontmatter | null;
  body: string;
  raw: string;
  lineCount: number;
}

/**
 * Parse YAML frontmatter from a markdown file.
 * Returns null if no frontmatter found.
 */
export function parseFrontmatter(content: string): Frontmatter | null {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  try {
    return parseYaml(match[1]) as Frontmatter;
  } catch {
    return null;
  }
}

/**
 * Extract the body (everything after frontmatter).
 */
export function extractBody(content: string): string {
  const match = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)$/);
  return match ? match[1] : content;
}

/**
 * Parse a markdown file into structured parts.
 */
export function parseFile(filePath: string): ParsedFile {
  const raw = readFileSync(filePath, "utf-8");
  return {
    path: filePath,
    relativePath: relative(REPO_ROOT, filePath),
    frontmatter: parseFrontmatter(raw),
    body: extractBody(raw),
    raw,
    lineCount: raw.split("\n").length,
  };
}

// ---------- Discovery ----------

/**
 * Find all skills by looking for SKILL.md files.
 */
export function listSkills(root = REPO_ROOT): string[] {
  const skillsDir = join(root, ".claude", "skills");
  if (!existsSync(skillsDir)) return [];

  return readdirSync(skillsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => join(skillsDir, d.name, "SKILL.md"))
    .filter((p) => existsSync(p));
}

/**
 * Find all rule files in rules/ and .claude/rules/.
 */
export function listRules(root = REPO_ROOT): string[] {
  const paths: string[] = [];

  const rulesDir = join(root, "rules");
  if (existsSync(rulesDir)) {
    for (const entry of readdirSync(rulesDir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith(".md")) {
        paths.push(join(rulesDir, entry.name));
      }
    }
  }

  const dotRulesDir = join(root, ".claude", "rules");
  if (existsSync(dotRulesDir)) {
    for (const entry of readdirSync(dotRulesDir, { withFileTypes: true })) {
      if (entry.name.endsWith(".md")) {
        paths.push(join(dotRulesDir, entry.name));
      }
    }
  }

  return paths;
}

/**
 * List reference files for a skill directory.
 */
export function listReferences(skillDir: string): string[] {
  const refsDir = join(skillDir, "references");
  if (!existsSync(refsDir)) return [];

  return readdirSync(refsDir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => join(refsDir, d.name));
}

/**
 * Get the skill name from a SKILL.md path (directory name).
 */
export function skillNameFromPath(skillPath: string): string {
  return basename(dirname(skillPath));
}

/**
 * Get the skill directory from a SKILL.md path.
 */
export function skillDirFromPath(skillPath: string): string {
  return dirname(skillPath);
}

// ---------- Content Analysis ----------

/**
 * Check if a file is a symlink and whether its target exists.
 */
export function symlinkStatus(
  filePath: string
): { isSymlink: boolean; targetExists: boolean; target?: string } {
  try {
    const stats = lstatSync(filePath);
    if (!stats.isSymbolicLink()) return { isSymlink: false, targetExists: true };
    const target = readFileSync(filePath, "utf-8"); // readFileSync follows symlinks
    return { isSymlink: true, targetExists: existsSync(filePath), target: resolve(dirname(filePath), readlinkSync(filePath)) };
  } catch {
    return { isSymlink: false, targetExists: false };
  }
}

import { readlinkSync } from "fs";

/**
 * Extract all ${CLAUDE_SKILL_DIR}/references/* paths from skill body.
 */
export function extractReferenceRefs(body: string): string[] {
  const pattern = /\$\{CLAUDE_SKILL_DIR\}\/references\/([^\s`"')]+)/g;
  const refs: string[] = [];
  let match;
  while ((match = pattern.exec(body)) !== null) {
    refs.push(match[1]);
  }
  return refs;
}

/**
 * Check if allowed-tools includes write/side-effect tools.
 */
export function hasSideEffectTools(allowedTools: string | undefined): boolean {
  if (!allowedTools) return false;
  const sideEffectPatterns = [
    /\bWrite\b/,
    /\bEdit\b/,
    /\bBash\s*\([^)]*(?:rm|cp|mkdir|mv)[^)]*\)/,
  ];
  return sideEffectPatterns.some((p) => p.test(allowedTools));
}

/**
 * Extract version strings from skill body text.
 * Looks for patterns like "skill-name vX.Y.Z" in the body.
 */
export function extractBodyVersions(body: string, skillName: string): string[] {
  const escaped = skillName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`${escaped}\\s+v(\\d+\\.\\d+\\.\\d+)`, "g");
  const versions: string[] = [];
  let match;
  while ((match = pattern.exec(body)) !== null) {
    versions.push(match[1]);
  }
  return [...new Set(versions)];
}

/**
 * Check if the body contains --version handling.
 */
export function hasVersionHandling(body: string): boolean {
  return /\$ARGUMENTS.*--version/i.test(body) || /--version.*\$ARGUMENTS/i.test(body);
}

/**
 * Check if the body contains a version check section.
 */
export function hasSessionVersionCheck(body: string): boolean {
  return /version check/i.test(body) && /SKILL\.md.*from disk/i.test(body);
}

/**
 * Extract the first H1 or H2 heading from markdown.
 */
export function extractFirstHeading(body: string): string | null {
  const match = body.match(/^#{1,2}\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

/**
 * Check if body contains "Prerequisite: Read X" and extract the reference.
 */
export function extractPrerequisites(body: string): string[] {
  const prereqs = new Set<string>();

  // Match backtick-wrapped: Prerequisite: Read `file.md`
  const pattern1 = /[Pp]rerequisite.*?[Rr]ead.*?`([^`]+\.md)`/g;
  let match;
  while ((match = pattern1.exec(body)) !== null) {
    prereqs.add(match[1]);
  }

  // Match bare: Prerequisite: Read and follow file.md
  const pattern2 = /[Pp]rerequisite.*?[Rr]ead.*?([a-zA-Z0-9_-]+\.md)/g;
  while ((match = pattern2.exec(body)) !== null) {
    prereqs.add(match[1]);
  }

  return [...prereqs];
}

/**
 * Normalize a version value from YAML frontmatter.
 * YAML parses unquoted `2.3.0` as float 2.3 — this recovers the original.
 */
export function normalizeVersion(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  const str = String(value);
  // Already valid semver
  if (/^\d+\.\d+\.\d+$/.test(str)) return str;
  // YAML float: "2.3" → "2.3.0"
  if (/^\d+\.\d+$/.test(str)) return `${str}.0`;
  // YAML integer: "2" → "2.0.0"
  if (/^\d+$/.test(str)) return `${str}.0.0`;
  return str;
}

/**
 * Validate semver format.
 */
export function isValidSemver(version: string): boolean {
  return /^\d+\.\d+\.\d+$/.test(version);
}
