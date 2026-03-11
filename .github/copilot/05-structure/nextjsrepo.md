# Next.js Repo 構成定義 — Upstream Demo SSOT

> NOTE: 本書は Next.js Repo 構成定義レイヤの SSOT であり、`.github/ISSUE_TEMPLATE/design_upstream_task.md` は本書と整合するように保守します。  
> RULE / DO NOT / EXAMPLE / NOTE のタグを使って規範を明示します。

---

## 1. 目的と適用範囲
- RULE: 対象は Upstream(public) の Next.js リポジトリ構成であり、設計/実装時のディレクトリ責務の単一情報源とする。
- RULE: 本書は `.github/copilot/00-index.md` から最優先で参照される構成定義レイヤとする。

---

## 2. 基本原則
- RULE: Next.js アプリはリポジトリルート直下に配置する（`apps/` 配下に置かない）。
- RULE: ルーティングは App Router（`app/`）を採用する。
- RULE: 依存解決（DI）は `src/providers/AppProvider.tsx` のみで行う。
- RULE: `packages/contracts` は interface/type のみを持ち、実装を含めない。
- RULE: `packages/ui` は public UI を保持し、会社固有前提を入れない。
- RULE: 実装の差し替え点は `packages/plugins` に集約する。
- DO NOT: `app/*/page.tsx` で具象実装（HTTP/DB/Storage）を直接 `new` しない。
- DO NOT: `contracts` に URL / 認証 / fetch などの実装詳細を持ち込まない。

---

## 3. 標準ディレクトリ構成（固定）
```text
repo-root/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── <slug>/
│       ├── page.tsx
│       ├── layout.tsx
│       ├── providers.tsx
│       └── _components/
│
├── public/
│
├── src/
│   ├── providers/
│   │   ├── AppProvider.tsx
│   │   └── AppContext.tsx
│   ├── composition/
│   │   ├── createClientContainer.ts
│   │   ├── createServerContainer.ts
│   │   ├── registerPlugins.ts
│   │   └── pluginRegistry.ts
│   └── lib/
│       ├── createClientDeps.ts
│       └── createServerDeps.ts
│
└── packages/
    ├── contracts/
    │   └── src/
    │       ├── index.ts
    │       ├── domain/
    │       ├── ports/
    │       ├── usecases/
    │       ├── dto/
    │       └── pages/
    │           └── <slug>.ts
    │
    ├── ui/
    │   └── src/
    │       ├── pages/
    │       │   └── <PageName>Page/
    │       │       └── <PageName>Page.tsx
    │       ├── atoms/
    │       ├── molecules/
    │       ├── organisms/
    │       └── templates/
    │
    └── plugins/
        └── src/
            ├── index.ts
            ├── http/
            ├── storage/
            ├── telemetry/
            └── auth/
```

---

## 4. 参照境界（依存方向）
- RULE: `app/*/page.tsx` は `packages/contracts/*` / `packages/ui/*` / `AppContext` のみ参照可能とする。
- RULE: `packages/ui` は props を受けて描画し、usecase 実行や I/O 実装を持たない。
- RULE: usecase 呼び出しは `app/` または `src/*`（container 側）で行う。
- RULE: `app/**/providers.tsx` は画面スコープ Provider とし、依存解決は行わない。
- RULE: `src/composition` は依存生成、`src/providers` は注入（Provider）を担当する。

---

## 5. packages & TypeScript paths
- RULE: import path の単一情報源は `tsconfig.json` の `compilerOptions.paths` とする。
- RULE: `packages/contracts` / `packages/ui` / `packages/plugins` はパッケージ境界を維持し、エイリアス経由で参照する。
- RULE: 推奨エイリアスは以下を使用する。
  - `@contracts/*` -> `packages/contracts/src/*`
  - `@ui/*` -> `packages/ui/src/*`
  - `@plugins/*` -> `packages/plugins/src/*`
  - `@app/*` -> `src/*`
- DO NOT: `../` で `app` と `packages` を横断する相対 import を行わない。
- DO NOT: `app/*/page.tsx` から `packages/contracts/*` / `packages/ui/*` / `AppContext` 以外を直接参照しない。
- EXAMPLE: `tsconfig.json` の最小例
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@contracts/*": ["packages/contracts/src/*"],
      "@ui/*": ["packages/ui/src/*"],
      "@plugins/*": ["packages/plugins/src/*"],
      "@app/*": ["src/*"]
    }
  }
}
```

---

## 6. CSS 方針
- RULE: MUI は Emotion エンジンを前提に運用する。
- RULE: `styled` は `@emotion/styled` を標準とする。
- RULE: Tailwind はユーティリティ用途（レイアウト/微調整/状態/レスポンシブ）に限定する。
- RULE: `StyledEngineProvider injectFirst` を使用し、MUI の注入順を固定する。
- DO NOT: 同一要素で同一CSSプロパティを多重指定しない。
- DO NOT: MUI を `@mui/styled-engine-sc` へ切り替えない。

---

## 7. 設計Issue運用
- RULE: DESIGN Issue の成果物は `.github/copilot/plans/<issue-number>-page-<slug>.md` のみとする。
- RULE: DESIGN Issue ではコード修正を禁止し、設計を製造Agentへ引き継ぐことを目的とする。
- RULE: 実装は IMPLEMENT Issue で実施し、plan に定義された受け入れ条件で検証する。

---

## 8. テスト戦略（Frontend + Backend）
- RULE: Storybook を UI コンポーネントの確認基盤として採用し、コンポーネント単位の状態を Story として管理する。
- RULE: UIユニットテストは Vitest + React Testing Library を標準とし、DOM環境は jsdom（または happy-dom）を採用する。
- RULE: API通信を伴うUIのテストは MSW によりHTTPをモックし、成功/失敗/遅延/空を最低1ケースずつ含める。
- RULE: ユースケース/ドメイン（`packages/**` の純TSロジック）は Vitest のユニットテストで検証する。
- RULE: HTTP境界（Route Handlers）は「ハンドラを直接呼ぶ統合テスト」を実施し、テストDBまたはトランザクションで検証する。
- RULE: 外部API連携は `nock` / `undici mock` / MSW（node）のいずれかでモックし、失敗/遅延/リトライを含めて検証する。
- RULE: E2Eは Playwright を採用し、主要導線のスモークテストを最小セットで維持する。
- RULE: E2E（Playwright）は「UI + Route + DB」を通すスモークで最終保証を行う。
- RULE: Next.js依存（`next/navigation`, `next/image`, `next/link`）はテスト用モック/スタブを共通化し、各テストに重複実装しない。
- RULE: カバレッジは `packages/` と `src/` を中心に測定し、`app/` は「テスト対象の境界」を明記する。
- RULE: DESIGN Issue では「テスト実行計画」を plan に記載し、IMPLEMENT Issue で実行結果を検証する。
- EXAMPLE: テスト探索設定（Vitest）
```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "app/**/?(*.)+(test).[tj]sx?",
      "src/**/?(*.)+(test).[tj]sx?",
      "packages/**/?(*.)+(test).[tj]s?"
    ],
    environment: "jsdom"
  }
});
```
- EXAMPLE: 実行コマンド
```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run storybook
```

---

## 9. 認証情報 / credentials 運用
- RULE: Secrets はリポジトリへコミットしない。
- RULE: `.env` には秘密値を直接記載せず、必要時は参照情報（キー名/パス名）のみを記載する。
- RULE: 認証情報の実体は GitHub Secrets / 環境変数注入 / 外部シークレットストアで管理する。
- RULE: public upstream のため、plan・ログ・PR本文に秘密情報や復元可能な値を出力しない。
- DO NOT: テストデータとして実在のトークン/鍵/個人情報を使用しない。

---

## 10. Dependabot
- RULE: `.github/dependabot.yml` はリポジトリルートで一元管理する。
- RULE: `open-pull-requests-limit` と `groups` を設定し、依存更新PRの同時発生を制御する。
- RULE: 更新対象ディレクトリは実在パスに限定する（例: `/`、必要時は `/mock/v1/web`）。
- RULE: 週次更新を基本とし、security updates は優先レビューする。
- DO NOT: 依存ファイルが存在しないディレクトリを `directory` に指定しない。
