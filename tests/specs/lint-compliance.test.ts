import { copyFixture, cleanup } from "../lib/fixtures.js";
import { runSkill } from "../lib/runner.js";

describe("/lint-compliance", () => {
  let testDir: string;

  beforeEach(() => {
    testDir = copyFixture("lint-compliance");
  });

  afterEach(() => {
    cleanup(testDir);
  });

  it("runs audit mode on recipe with Compliance section", async () => {
    const result = await runSkill(
      "/lint-compliance cookbook/recipes/ui/auditable-recipe.md",
      { cwd: testDir }
    );

    const output = result.output.toLowerCase();
    // Should detect audit mode and evaluate existing compliance table
    expect(output).toMatch(/audit/);
    expect(output).toMatch(/summary/);
    expect(output).toMatch(/categories evaluated/);
  });

  it("runs guidance mode on recipe without Compliance section", async () => {
    const result = await runSkill(
      "/lint-compliance cookbook/recipes/ui/guidance-recipe.md",
      { cwd: testDir }
    );

    const output = result.output.toLowerCase();
    // Should detect guidance mode and recommend applicable checks
    expect(output).toMatch(/guidance/);
    expect(output).toMatch(/summary/);
  });
});
