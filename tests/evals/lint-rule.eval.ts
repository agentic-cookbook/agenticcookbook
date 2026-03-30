import { join } from "path";
import { runEval, logCost, writeCostReport, writeEvalResult } from "../lib/sdk.js";

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
  writeCostReport();
});

describe("Eval: /lint-rule", () => {
  it(
    "produces zero FAILs on a known-good rule",
    async () => {
      const result = await runEval(
        `Lint the rule file at ${join(fixturesDir, "good-rule", "rule.md")} and return the results as structured JSON with a summary (pass/warn/fail/na counts) and findings array (id + result per check).`,
        {
          cwd: fixturesDir,
          allowedTools: ["Read", "Glob", "Grep", "WebFetch"],
          maxBudget: 0.50,
          maxTurns: 15,
          schema: lintResultSchema,
        }
      );

      logCost("lint-rule-good", result.cost);
      writeEvalResult("lint-rule-good", result);

      const output = result.output as {
        summary: { fail: number };
        findings: Array<{ id: string; result: string }>;
      };

      expect(output.summary.fail).toBe(0);
    },
    120_000
  );

  it(
    "catches defects in a known-bad rule",
    async () => {
      const result = await runEval(
        `Lint the rule file at ${join(fixturesDir, "bad-rule", "rule.md")} and return the results as structured JSON with a summary (pass/warn/fail/na counts) and findings array (id + result per check).`,
        {
          cwd: fixturesDir,
          allowedTools: ["Read", "Glob", "Grep", "WebFetch"],
          maxBudget: 0.50,
          maxTurns: 15,
          schema: lintResultSchema,
        }
      );

      logCost("lint-rule-bad", result.cost);
      writeEvalResult("lint-rule-bad", result);

      const output = result.output as {
        summary: { fail: number };
        findings: Array<{ id: string; result: string }>;
      };

      expect(output.summary.fail).toBeGreaterThan(0);
    },
    120_000
  );
});
