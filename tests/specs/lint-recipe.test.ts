import { copyFixture, cleanup } from "../lib/fixtures.js";
import { runSkill } from "../lib/runner.js";

describe("/lint-recipe", () => {
  let testDir: string;

  beforeEach(() => {
    testDir = copyFixture("lint-recipe");
  });

  afterEach(() => {
    cleanup(testDir);
  });

  it("passes a complete recipe", async () => {
    const result = await runSkill(
      "/lint-recipe cookbook/recipes/ui/good-recipe.md",
      { cwd: testDir }
    );

    const output = result.output.toLowerCase();
    // Good recipe has all sections, valid frontmatter, requirements, test vectors
    expect(output).not.toMatch(/fail.*f01/); // has frontmatter
    expect(output).not.toMatch(/fail.*f02/); // has valid UUID
    expect(output).not.toMatch(/fail.*f06/); // has required fields
    expect(output).not.toMatch(/fail.*s03/); // no TODO text
  });

  it("catches problems in an incomplete recipe", async () => {
    const result = await runSkill(
      "/lint-recipe cookbook/recipes/ui/bad-recipe.md",
      { cwd: testDir }
    );

    const output = result.output.toLowerCase();
    // Bad recipe: missing id, missing sections, has TODO text, no test vectors
    expect(output).toMatch(/fail|warn/);
  });
});
