import { copyFixture, cleanup } from "../lib/fixtures.js";
import { runSkill } from "../lib/runner.js";

describe("/validate-cookbook", () => {
  let testDir: string;

  beforeEach(() => {
    testDir = copyFixture("validate-cookbook");
  });

  afterEach(() => {
    cleanup(testDir);
  });

  it("detects cookbook mode and reports frontmatter results", async () => {
    const result = await runSkill(
      "/validate-cookbook --category frontmatter",
      { cwd: testDir, timeout: 600_000 }
    );

    const output = result.output.toLowerCase();
    // Should detect cookbook mode
    expect(output).toMatch(/mode.*cookbook/);
    // Should produce frontmatter results
    expect(output).toMatch(/frontmatter/);
    // Should have a summary
    expect(output).toMatch(/summary/);
  });

  it("validates content structure", async () => {
    const result = await runSkill(
      "/validate-cookbook --category content",
      { cwd: testDir, timeout: 600_000 }
    );

    const output = result.output.toLowerCase();
    // Should check content structure
    expect(output).toMatch(/content/);
    expect(output).toMatch(/summary/);
  });
});
