/**
 * Skill runner — invokes Claude Code skills via the Agent SDK.
 */

import { logCost } from "./cost.js";

export interface RunResult {
  output: string;
  cost: number;
  sessionId: string;
}

export interface RunOptions {
  cwd: string;
  model?: string;
  maxBudget?: number;
  maxTurns?: number;
}

const DEFAULT_MODEL = "claude-haiku-4-5-20251001";
const DEFAULT_MAX_BUDGET = 0.5;
const DEFAULT_MAX_TURNS = 15;

/**
 * Run a skill in a directory via the Agent SDK.
 *
 * Each call creates a new isolated session. The skill runs against
 * whatever files are in `opts.cwd` — typically a temp directory
 * populated from a fixture.
 */
export async function runSkill(
  prompt: string,
  opts: RunOptions
): Promise<RunResult> {
  const { query } = await import("@anthropic-ai/claude-agent-sdk");

  const model = opts.model ?? process.env.TEST_MODEL ?? DEFAULT_MODEL;

  let result: RunResult = { output: "", cost: 0, sessionId: "" };

  for await (const msg of query({
    prompt,
    options: {
      cwd: opts.cwd,
      permissionMode: "bypassPermissions",
      model,
      maxTurns: opts.maxTurns ?? DEFAULT_MAX_TURNS,
      maxBudgetUsd: opts.maxBudget ?? DEFAULT_MAX_BUDGET,
    } as Record<string, unknown>,
  })) {
    const m = msg as Record<string, unknown>;
    if (m.type === "result") {
      result = {
        output: (m.result as string) ?? "",
        cost: (m.total_cost_usd as number) ?? 0,
        sessionId: (m.session_id as string) ?? "",
      };
    }
  }

  logCost(prompt, result.cost);
  return result;
}
