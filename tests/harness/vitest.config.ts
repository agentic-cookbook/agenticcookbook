import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["specs/**/*.test.ts"],
    testTimeout: 120_000,
    hookTimeout: 30_000,
    pool: "threads",
    poolOptions: {
      threads: { maxThreads: 2 },
    },
  },
});
