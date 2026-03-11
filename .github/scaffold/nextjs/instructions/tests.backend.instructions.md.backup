---
name: Backend tests rules
description: バックエンド（ユースケース/Route Handler/外部API連携）のテスト実務ルール
applyTo:
  - "packages/**/*.{ts,tsx}"
  - "src/**/*.{ts,tsx}"
  - "app/**/route.{ts,tsx}"
  - "app/**/*.{test,spec}.{ts,tsx}"
---
- ユースケース/ドメイン（`packages/**` の純TSロジック）は Vitest のユニットテストで検証する。
- HTTP境界（Route Handlers）は「ハンドラを直接呼ぶ統合テスト」を実施し、テストDBまたはトランザクションで検証する。
- 外部API連携は `nock` / `undici mock` / MSW（node）のいずれかでモックし、失敗/遅延/リトライを含めて検証する。
- E2E（Playwright）は「UI + Route + DB」を通すスモークで最終保証を行う。
- カバレッジは `packages/` と `src/` を中心に測定し、`app/` はテスト対象境界を明記する（例: Server Component は数値目標の対象外）。
