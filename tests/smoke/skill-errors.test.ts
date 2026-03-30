import { listSkills, parseFile, skillNameFromPath } from "../lib/parsers.js";
import { runCLI, logCost, writeCostReport } from "../lib/sdk.js";

const hasAPIKey = !!process.env.ANTHROPIC_API_KEY;

afterAll(() => {
  if (hasAPIKey) writeCostReport();
});

// Test skills that accept path arguments — they should reject nonexistent paths
const skillsWithArgs = listSkills()
  .map((p) => ({
    name: skillNameFromPath(p),
    path: p,
    file: parseFile(p),
  }))
  .filter((s) => {
    const hint = s.file.frontmatter?.["argument-hint"];
    return hint && (String(hint).includes("path") || String(hint).includes("["));
  });

describe.skipIf(!hasAPIKey).each(skillsWithArgs.map((s) => [s.name, s.path]))(
  "Smoke: %s error handling",
  (name) => {
    it(
      "rejects nonexistent path",
      async () => {
        const result = await runCLI(
          `/${name} /nonexistent/path/definitely-not-here.md`
        );
        logCost(`${name}--bad-path`, result.cost);

        expect(result.output.toLowerCase()).toMatch(
          /not found|no .* matching|error|does not exist|invalid|couldn't find|no such/
        );
      },
      60_000
    );
  }
);
