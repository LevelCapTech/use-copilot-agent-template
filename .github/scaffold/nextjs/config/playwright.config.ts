import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:4100",
  },
  webServer: {
    command: "npm run build && npm run start -- --port 4100",
    port: 4100,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
