/**
 * Cost tracking for test runs.
 */

import { writeFileSync } from "fs";
import { join } from "path";

interface CostEntry {
  prompt: string;
  cost: number;
  timestamp: string;
}

const entries: CostEntry[] = [];

export function logCost(prompt: string, cost: number): void {
  entries.push({
    prompt: prompt.slice(0, 100),
    cost,
    timestamp: new Date().toISOString(),
  });
}

export function getTotalCost(): number {
  return entries.reduce((sum, e) => sum + e.cost, 0);
}

export function writeCostReport(dir?: string): void {
  const report = {
    total_cost_usd: Number(getTotalCost().toFixed(4)),
    test_count: entries.length,
    entries,
    generated: new Date().toISOString(),
  };
  const outDir = dir ?? import.meta.dirname;
  writeFileSync(
    join(outDir, "..", "cost-report.json"),
    JSON.stringify(report, null, 2)
  );
}
