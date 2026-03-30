/**
 * Skill runner — invokes Claude Code skills via `claude -p` (CLI).
 *
 * Uses the CLI instead of the Agent SDK so test runs go through
 * the Claude Max subscription, not API billing.
 */

import { execFile } from "child_process";

export interface RunResult {
  output: string;
  exitCode: number;
  raw: string;
}

export interface RunOptions {
  cwd: string;
  timeout?: number;
}

const DEFAULT_TIMEOUT = 120_000; // 2 minutes

/**
 * Run a skill in a directory via `claude -p`.
 *
 * Each call creates a new isolated session. The `--bare` flag
 * strips all local config so only the fixture's `.claude/` is visible.
 *
 * Runs through Claude Max subscription — no API billing.
 */
export async function runSkill(
  prompt: string,
  opts: RunOptions
): Promise<RunResult> {
  const timeout = opts.timeout ?? DEFAULT_TIMEOUT;

  return new Promise((resolve, reject) => {
    execFile(
      "claude",
      ["-p", prompt, "--bare", "--output-format", "json"],
      {
        cwd: opts.cwd,
        timeout,
        maxBuffer: 1024 * 1024 * 5, // 5MB
      },
      (error, stdout, stderr) => {
        if (error && !stdout) {
          // Hard failure (timeout, not found, etc.)
          resolve({
            output: stderr || error.message,
            exitCode: error.code ?? 1,
            raw: stdout || "",
          });
          return;
        }

        try {
          const parsed = JSON.parse(stdout);
          resolve({
            output: parsed.result ?? "",
            exitCode: 0,
            raw: stdout,
          });
        } catch {
          // JSON parse failed — return raw output
          resolve({
            output: stdout || stderr || "",
            exitCode: error?.code ?? 0,
            raw: stdout,
          });
        }
      }
    );
  });
}
