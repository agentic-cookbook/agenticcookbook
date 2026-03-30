import {
  listSkills,
  parseFile,
  skillNameFromPath,
  normalizeVersion,
} from "../lib/parsers.js";
import { runCLI, logCost, writeCostReport } from "../lib/sdk.js";

const hasAPIKey = !!process.env.ANTHROPIC_API_KEY;
const skills = listSkills();

afterAll(() => {
  if (hasAPIKey) writeCostReport();
});

describe.skipIf(!hasAPIKey).each(skills.map((p) => [skillNameFromPath(p), p]))(
  "Smoke: %s --version",
  (name, skillPath) => {
    it(
      "responds to --version with correct version",
      async () => {
        const file = parseFile(skillPath);
        const expected = normalizeVersion(file.frontmatter?.version);
        if (!expected) return;

        const result = await runCLI(`/${name} --version`);
        logCost(`${name}--version`, result.cost);

        expect(result.output).toContain(`${name} v${expected}`);
      },
      30_000
    );
  }
);
