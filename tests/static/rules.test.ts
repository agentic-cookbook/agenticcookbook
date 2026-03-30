import { existsSync, lstatSync, readlinkSync } from "fs";
import { basename, dirname, join, resolve } from "path";
import {
  listRules,
  parseFile,
  extractFirstHeading,
  extractPrerequisites,
  REPO_ROOT,
} from "../lib/parsers.js";

const rules = listRules();

describe.each(rules.map((p) => [basename(p), p]))(
  "Rule: %s",
  (name, rulePath) => {
    // Handle symlinks: check target exists
    it("is not a broken symlink", () => {
      try {
        const stats = lstatSync(rulePath);
        if (stats.isSymbolicLink()) {
          const target = resolve(dirname(rulePath), readlinkSync(rulePath));
          expect(existsSync(target), `Symlink target missing: ${target}`).toBe(
            true
          );
        }
      } catch {
        // Not a symlink, that's fine
      }
    });

    // Skip content checks for non-.md files (e.g., .sh scripts)
    if (!name.endsWith(".md")) return;

    const file = parseFile(rulePath);

    it("has a title heading (H1 or H2)", () => {
      const heading = extractFirstHeading(file.body);
      expect(heading, "No H1 or H2 heading found").not.toBeNull();
    });

    it("is not empty", () => {
      expect(file.body.trim().length).toBeGreaterThan(0);
    });

    it("prerequisite references resolve to existing files", () => {
      const prereqs = extractPrerequisites(file.raw);
      for (const prereq of prereqs) {
        // Try resolving relative to rules/ directory
        const candidates = [
          join(dirname(rulePath), prereq),
          join(REPO_ROOT, "rules", prereq),
          join(REPO_ROOT, ".claude", "rules", prereq),
        ];
        const found = candidates.some((c) => existsSync(c));
        expect(found, `Prerequisite not found: ${prereq}`).toBe(true);
      }
    });
  }
);

// Ensure we actually found rules to test
it("discovers at least 1 rule", () => {
  expect(rules.length).toBeGreaterThan(0);
});
