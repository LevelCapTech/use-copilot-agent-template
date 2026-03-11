import { defineConfig, globalIgnores } from "eslint/config";
import nextTs from "eslint-config-next/typescript";

// ESLint configuration for mock directory linting.
// Deliberately separate from eslint.config.mjs (production), which excludes mock/.
// Uses TypeScript rules only; Next.js-specific rules from core-web-vitals are omitted
// because mock/v1/web is a React Router / Vite application.
const eslintMockConfig = defineConfig([
  ...nextTs,
  globalIgnores([
    "mock/**/node_modules/**",
    "mock/**/.react-router/**",
    "mock/**/build/**",
    "mock/**/.next/**",
  ]),
]);

export default eslintMockConfig;
