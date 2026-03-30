import { execFile } from "child_process";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import { REPO_ROOT } from "./parsers.js";

// ---------- Cost Tracking ----------

interface CostEntry {
  test: string;
  cost: number;
  timestamp: string;
}

const costLog: CostEntry[] = [];

export function logCost(testName: string, cost: number) {
  costLog.push({ test: testName, cost, timestamp: new Date().toISOString() });
}

export function writeCostReport() {
  const total = costLog.reduce((sum, e) => sum + e.cost, 0);
  const report = {
    total_cost_usd: Number(total.toFixed(4)),
    entries: costLog,
    generated: new Date().toISOString(),
  };
  const reportPath = join(import.meta.dirname, "..", "cost-report.json");
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
}

// ---------- CLI Runner ----------

export interface CLIResult {
  output: string;
  cost: number;
  exitCode: number;
  raw: string;
}

/**
 * Run a Claude Code CLI session in headless mode.
 * Uses `claude -p` with `--output-format json` and `--bare`.
 */
export async function runCLI(
  prompt: string,
  opts?: { cwd?: string; timeout?: number }
): Promise<CLIResult> {
  const cwd = opts?.cwd ?? REPO_ROOT;
  const timeout = opts?.timeout ?? 60_000;

  return new Promise((resolve, reject) => {
    const proc = execFile(
      "claude",
      ["-p", prompt, "--output-format", "json", "--bare"],
      { cwd, timeout, maxBuffer: 1024 * 1024 },
      (error, stdout, stderr) => {
        try {
          // Try to parse JSON output
          const parsed = JSON.parse(stdout);
          resolve({
            output: parsed.result ?? "",
            cost: parsed.total_cost_usd ?? 0,
            exitCode: error?.code ?? 0,
            raw: stdout,
          });
        } catch {
          // If JSON parsing fails, return raw output
          resolve({
            output: stdout || stderr || "",
            cost: 0,
            exitCode: error?.code ?? (error ? 1 : 0),
            raw: stdout,
          });
        }
      }
    );
  });
}

// ---------- Agent SDK Runner ----------

/**
 * Run a Claude Code eval session using the Agent SDK.
 * Returns structured output if a schema is provided.
 */
export async function runEval(
  prompt: string,
  opts: {
    cwd: string;
    allowedTools: string[];
    maxBudget?: number;
    maxTurns?: number;
    schema?: object;
  }
): Promise<{ output: unknown; cost: number; sessionId: string }> {
  // Dynamic import to avoid requiring the SDK when only running static tests
  const { query } = await import("@anthropic-ai/claude-agent-sdk");

  const queryOpts: Record<string, unknown> = {
    cwd: opts.cwd,
    allowedTools: opts.allowedTools,
    permissionMode: "bypassPermissions",
  };

  if (opts.maxBudget) queryOpts.maxBudgetUsd = opts.maxBudget;
  if (opts.maxTurns) queryOpts.maxTurns = opts.maxTurns;

  if (opts.schema) {
    queryOpts.outputFormat = {
      type: "json_schema",
      schema: opts.schema,
    };
  }

  let result: { output: unknown; cost: number; sessionId: string } = {
    output: null,
    cost: 0,
    sessionId: "",
  };

  for await (const message of query({
    prompt,
    options: queryOpts as Parameters<typeof query>[0]["options"],
  })) {
    if ((message as Record<string, unknown>).type === "result") {
      const msg = message as Record<string, unknown>;
      result = {
        output:
          (msg.structured_output as unknown) ?? (msg.result as string) ?? "",
        cost: (msg.total_cost_usd as number) ?? 0,
        sessionId: (msg.session_id as string) ?? "",
      };
    }
  }

  return result;
}

// ---------- Eval Results ----------

export function writeEvalResult(
  testName: string,
  result: { output: unknown; cost: number; sessionId: string }
) {
  const dir = join(import.meta.dirname, "..", "eval-results");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const filename = testName.replace(/[^a-zA-Z0-9-]/g, "_") + ".json";
  writeFileSync(
    join(dir, filename),
    JSON.stringify(
      {
        test: testName,
        ...result,
        timestamp: new Date().toISOString(),
      },
      null,
      2
    )
  );
}
