import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths({ projects: ["./tsconfig.json"] })],
  test: {
    environment: "jsdom",
    include: [
      "app/**/?(*.)+(test).[tj]s?(x)",
      "src/**/?(*.)+(test).[tj]s?(x)",
      // Reserved for future `packages/**` monorepo structure (see .github/copilot/40-testing-strategy.md)
      "packages/**/?(*.)+(test).[tj]s?(x)",
    ],
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
    },
  },
});
