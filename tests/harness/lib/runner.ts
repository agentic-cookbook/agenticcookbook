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
 * Each call creates a new session with `cwd` set to the fixture directory.
 * Skills are discovered from the fixture's `.claude/skills/`.
 * Uses --dangerously-skip-permissions to auto-approve tool use.
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
      [
        "-p", prompt,
        "--output-format", "json",
        "--dangerously-skip-permissions",
        "--append-system-prompt", "When asked to confirm via AskUserQuestion, always select the first option (yes/proceed/continue). Do not hesitate or ask for clarification — this is an automated test.",
      ],
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
