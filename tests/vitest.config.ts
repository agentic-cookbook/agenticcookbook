import { defineConfig } from "vitest/config";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");

export default defineConfig({
  test: {
    globals: true,
    workspace: [
      {
        test: {
          name: "static",
          include: ["static/**/*.test.ts"],
          testTimeout: 10_000,
        },
        resolve: {
          alias: { "@lib": path.resolve(import.meta.dirname, "lib") },
        },
      },
      {
        test: {
          name: "smoke",
          include: ["smoke/**/*.test.ts"],
          testTimeout: 60_000,
          pool: "threads",
          poolOptions: { threads: { maxThreads: 3 } },
        },
        resolve: {
          alias: { "@lib": path.resolve(import.meta.dirname, "lib") },
        },
      },
      {
        test: {
          name: "evals",
          include: ["evals/**/*.eval.ts"],
          testTimeout: 180_000,
          pool: "threads",
          poolOptions: { threads: { maxThreads: 2 } },
        },
        resolve: {
          alias: { "@lib": path.resolve(import.meta.dirname, "lib") },
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@lib": path.resolve(import.meta.dirname, "lib"),
      "@root": root,
    },
  },
});
