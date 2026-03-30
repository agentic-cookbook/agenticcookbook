import { copyFixture, cleanup } from "../lib/fixtures.js";
import { runSkill } from "../lib/runner.js";

describe("/cookbook-help", () => {
  let testDir: string;

  beforeEach(() => {
    testDir = copyFixture("cookbook-help");
  });

  afterEach(() => {
    cleanup(testDir);
  });

  it("shows setup status with installed rule detected", async () => {
    const result = await runSkill(
      "/cookbook-help setup",
      { cwd: testDir }
    );

    const output = result.output.toLowerCase();
    // Should detect the installed cookbook.md rule
    expect(output).toMatch(/installed|status/);
    // Should show the cookbook path
    expect(output).toMatch(/cookbook/);
  });

  it("shows skills list", async () => {
    const result = await runSkill(
      "/cookbook-help skills",
      { cwd: testDir }
    );

    const output = result.output.toLowerCase();
    // Should list available skills
    expect(output).toMatch(/skills/);
    expect(output).toMatch(/install-cookbook|configure-cookbook|lint/);
  });

  it("shows troubleshooting info", async () => {
    const result = await runSkill(
      "/cookbook-help troubleshooting",
      { cwd: testDir }
    );

    const output = result.output.toLowerCase();
    // Should include common issues section
    expect(output).toMatch(/troubleshoot/);
    expect(output).toMatch(/common|issue|fix/);
  });
});
