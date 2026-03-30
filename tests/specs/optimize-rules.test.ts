import { copyFixture, cleanup } from "../lib/fixtures.js";
import { runSkill } from "../lib/runner.js";
import { fileExists, fileContains, listFiles } from "../lib/assertions.js";

describe("/optimize-rules", () => {
  let testDir: string;

  beforeEach(() => {
    testDir = copyFixture("optimize-rules");
  });

  afterEach(() => {
    cleanup(testDir);
  });

  it("creates a backup directory", async () => {
    await runSkill("/optimize-rules .claude/rules/", { cwd: testDir });

    expect(fileExists(testDir, ".claude/unoptimized-rules")).toBe(true);
  });

  it("backs up all original rule files", async () => {
    await runSkill("/optimize-rules .claude/rules/", { cwd: testDir });

    const backups = listFiles(testDir, ".claude/unoptimized-rules");
    expect(backups).toContain("rule-a.md");
    expect(backups).toContain("rule-b.md");
    expect(backups).toContain("rule-c.md");
  });

  it("produces a single optimized-rules.md", async () => {
    await runSkill("/optimize-rules .claude/rules/", { cwd: testDir });

    const rules = listFiles(testDir, ".claude/rules");
    expect(rules).toEqual(["optimized-rules.md"]);
  });

  it("preserves key constraints in the optimized output", async () => {
    await runSkill("/optimize-rules .claude/rules/", { cwd: testDir });

    // These constraints exist across the original rules — they must survive
    expect(fileContains(testDir, ".claude/rules/optimized-rules.md", "commit")).toBe(true);
    expect(fileContains(testDir, ".claude/rules/optimized-rules.md", "verify")).toBe(true);
    expect(fileContains(testDir, ".claude/rules/optimized-rules.md", "test")).toBe(true);
  });

  it("--revert restores original rule files", async () => {
    await runSkill("/optimize-rules .claude/rules/", { cwd: testDir });
    await runSkill("/optimize-rules --revert .claude/rules/", { cwd: testDir });

    const rules = listFiles(testDir, ".claude/rules");
    expect(rules).toContain("rule-a.md");
    expect(rules).toContain("rule-b.md");
    expect(rules).toContain("rule-c.md");
    expect(rules).not.toContain("optimized-rules.md");
    expect(fileExists(testDir, ".claude/unoptimized-rules")).toBe(false);
  });
});
