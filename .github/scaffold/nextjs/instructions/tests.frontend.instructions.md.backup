---
name: Frontend tests rules
description: フロントエンド（Next.js/React）のテスト実務ルール
applyTo:
  - "**/*.{test,spec}.{ts,tsx}"
  - "packages/**/*.{ts,tsx}"
  - "src/**/*.{ts,tsx}"
  - "app/**/*.{ts,tsx}"
---
- Storybook を UI コンポーネントの確認基盤として採用し、状態ごとに Story を管理する。
- UIユニットテストは Vitest + React Testing Library を標準とし、DOM環境は jsdom（または happy-dom）を採用する。
- API通信を伴うUIのテストは MSW でHTTPをモックし、成功/失敗/遅延/空を最低1ケースずつ含める。
- E2E は Playwright を採用し、主要導線のスモークテストを最小セットで維持する。
- Next.js依存（`next/navigation`, `next/image`, `next/link`）は共通モック/スタブへ集約し、各テストに重複実装しない。
- カバレッジは `packages/` と `src/` を中心に測定し、`app/` はテスト対象境界を明記する（例: Server Component は数値目標の対象外）。
