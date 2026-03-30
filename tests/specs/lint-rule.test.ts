import { copyFixture, cleanup } from "../lib/fixtures.js";
import { runSkill } from "../lib/runner.js";
import { writeCostReport } from "../lib/cost.js";

const hasAPIKey = !!process.env.ANTHROPIC_API_KEY;

afterAll(() => {
  if (hasAPIKey) writeCostReport();
});

describe.skipIf(!hasAPIKey)("/lint-rule", () => {
  let testDir: string;

  beforeEach(() => {
    testDir = copyFixture("lint-rule");
  });

  afterEach(() => {
    cleanup(testDir);
  });

  it("passes a well-structured rule", async () => {
    const result = await runSkill(
      "/lint-rule .claude/rules/good-rule.md",
      { cwd: testDir }
    );

    const output = result.output.toLowerCase();
    // Good rule should have no FAILs (or very few)
    // We can't assert zero because the linter may find minor issues,
    // but it should NOT flag the major structural checks
    expect(output).not.toMatch(/fail.*r01/); // has title
    expect(output).not.toMatch(/fail.*r04/); // no vague directives
    expect(output).not.toMatch(/fail.*r07/); // single concern
  });

  it("catches vague directives in a bad rule", async () => {
    const result = await runSkill(
      "/lint-rule .claude/rules/bad-rule.md",
      { cwd: testDir }
    );

    const output = result.output.toLowerCase();
    // Bad rule has vague directives like "handle errors appropriately"
    // and no structure — the linter should catch these
    expect(output).toMatch(/fail|warn/);
  });
});
