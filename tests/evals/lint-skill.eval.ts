import { join } from "path";
import { runEval, logCost, writeCostReport, writeEvalResult } from "../lib/sdk.js";

const hasAPIKey = !!process.env.ANTHROPIC_API_KEY;
const fixturesDir = join(import.meta.dirname, "fixtures");

const lintResultSchema = {
  type: "object" as const,
  properties: {
    summary: {
      type: "object" as const,
      properties: {
        pass: { type: "number" as const },
        warn: { type: "number" as const },
        fail: { type: "number" as const },
        na: { type: "number" as const },
      },
      required: ["pass", "warn", "fail", "na"],
    },
    findings: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" as const },
          result: {
            type: "string" as const,
            enum: ["PASS", "WARN", "FAIL", "N/A"],
          },
          description: { type: "string" as const },
        },
        required: ["id", "result"],
      },
    },
  },
  required: ["summary", "findings"],
};

afterAll(() => {
  if (hasAPIKey) writeCostReport();
});

describe.skipIf(!hasAPIKey)("Eval: /lint-skill", () => {
  it(
    "produces zero FAILs on a known-good skill",
    async () => {
      const result = await runEval(
        `Lint the skill at ${join(fixturesDir, "good-skill")}/ and return the results as structured JSON with a summary (pass/warn/fail/na counts) and findings array (id + result per check).`,
        {
          cwd: fixturesDir,
          allowedTools: ["Read", "Glob", "Grep", "WebFetch"],
          maxBudget: 0.50,
          maxTurns: 15,
          schema: lintResultSchema,
        }
      );

      logCost("lint-skill-good", result.cost);
      writeEvalResult("lint-skill-good", result);

      const output = result.output as {
        summary: { fail: number };
        findings: Array<{ id: string; result: string }>;
      };

      expect(output.summary.fail).toBe(0);
    },
    120_000
  );

  it(
    "catches defects in a known-bad skill",
    async () => {
      const result = await runEval(
        `Lint the skill at ${join(fixturesDir, "bad-skill")}/ and return the results as structured JSON with a summary (pass/warn/fail/na counts) and findings array (id + result per check).`,
        {
          cwd: fixturesDir,
          allowedTools: ["Read", "Glob", "Grep", "WebFetch"],
          maxBudget: 0.50,
          maxTurns: 15,
          schema: lintResultSchema,
        }
      );

      logCost("lint-skill-bad", result.cost);
      writeEvalResult("lint-skill-bad", result);

      const output = result.output as {
        summary: { fail: number };
        findings: Array<{ id: string; result: string }>;
      };

      // Known-bad skill should have multiple FAILs
      expect(output.summary.fail).toBeGreaterThan(0);
    },
    120_000
  );
});
