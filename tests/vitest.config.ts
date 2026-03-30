import { defineConfig } from "vitest/config";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const libAlias = { "@lib": path.resolve(import.meta.dirname, "lib") };

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "static",
          globals: true,
          include: ["static/**/*.test.ts"],
          testTimeout: 10_000,
        },
        resolve: { alias: libAlias },
      },
      {
        test: {
          name: "smoke",
          globals: true,
          include: ["smoke/**/*.test.ts"],
          testTimeout: 60_000,
          pool: "threads",
          poolOptions: { threads: { maxThreads: 3 } },
        },
        resolve: { alias: libAlias },
      },
      {
        test: {
          name: "evals",
          globals: true,
          include: ["evals/**/*.eval.ts"],
          testTimeout: 180_000,
          pool: "threads",
          poolOptions: { threads: { maxThreads: 2 } },
        },
        resolve: { alias: libAlias },
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
