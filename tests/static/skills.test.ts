import { existsSync } from "fs";
import { join } from "path";
import {
  listSkills,
  parseFile,
  skillNameFromPath,
  skillDirFromPath,
  extractReferenceRefs,
  hasSideEffectTools,
  extractBodyVersions,
  hasVersionHandling,
  hasSessionVersionCheck,
  isValidSemver,
  normalizeVersion,
  listReferences,
} from "../lib/parsers.js";

const skills = listSkills();

describe.each(skills.map((p) => [skillNameFromPath(p), p]))(
  "Skill: %s",
  (name, skillPath) => {
    const file = parseFile(skillPath);
    const fm = file.frontmatter;

    // --- Frontmatter ---

    it("has YAML frontmatter", () => {
      expect(fm).not.toBeNull();
    });

    it("has required frontmatter fields: name, version, description", () => {
      expect(fm?.name).toBeDefined();
      expect(fm?.version).toBeDefined();
      expect(fm?.description).toBeDefined();
    });

    it("name is kebab-case and matches directory", () => {
      expect(fm?.name).toMatch(/^[a-z][a-z0-9-]*$/);
      expect(fm?.name).toBe(name);
    });

    it("version is valid semver", () => {
      const normalized = normalizeVersion(fm?.version);
      expect(normalized).not.toBeNull();
      expect(isValidSemver(normalized!)).toBe(true);
    });

    it("description is under 250 characters", () => {
      expect(String(fm?.description ?? "").length).toBeLessThanOrEqual(250);
    });

    // --- Version Consistency ---

    it("has --version handling in body", () => {
      expect(hasVersionHandling(file.body)).toBe(true);
    });

    it("has session version check (reads SKILL.md from disk)", () => {
      expect(hasSessionVersionCheck(file.body)).toBe(true);
    });

    it("frontmatter version matches versions in body", () => {
      const fmVersion = normalizeVersion(fm?.version);
      if (!fmVersion) return; // covered by "version is valid semver" test
      const bodyVersions = extractBodyVersions(file.body, String(fm?.name ?? ""));
      if (bodyVersions.length > 0) {
        for (const bv of bodyVersions) {
          expect(bv).toBe(fmVersion);
        }
      }
    });

    // --- Reference Integrity ---

    it("all ${CLAUDE_SKILL_DIR}/references/* in body exist on disk", () => {
      const refs = extractReferenceRefs(file.body);
      const skillDir = skillDirFromPath(skillPath);
      for (const ref of refs) {
        const refPath = join(skillDir, "references", ref);
        expect(existsSync(refPath), `Missing reference: ${ref}`).toBe(true);
      }
    });

    it("all files in references/ are referenced in body or are reasonable", () => {
      const diskRefs = listReferences(skillDirFromPath(skillPath));
      // Just verify the directory is not bloated with orphan files.
      // A reference file is okay if it exists — we don't enforce usage.
      expect(diskRefs.length).toBeLessThanOrEqual(20);
    });

    // --- Side-Effect Guards ---

    it("side-effect skills set disable-model-invocation: true", () => {
      const allowedTools = String(fm?.["allowed-tools"] ?? "");
      if (hasSideEffectTools(allowedTools)) {
        expect(fm?.["disable-model-invocation"]).toBe(true);
      }
    });

    // --- Basic Structure ---

    it("SKILL.md is under 500 lines", () => {
      expect(file.lineCount).toBeLessThanOrEqual(500);
    });
  }
);

// Ensure we actually found skills to test
it("discovers at least 1 skill", () => {
  expect(skills.length).toBeGreaterThan(0);
});
