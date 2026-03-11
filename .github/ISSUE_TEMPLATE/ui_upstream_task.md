---
name: UI整備Issueテンプレート(Upstream)
about: Next.js + Atomic Design + Storybook のUI整備専用テンプレートです
title: "[UI] Upstream: ★ここに画面名★ UI整備"
labels: "ui"
assignees: ""
---

<!--
置換手順:
1. ★ここに画面名★: 対象画面名に置換する（例: 進捗ダッシュボード）。
2. <design-doc-path>: 参照する機能設計書Markdownのパスに置換する（例: .github/copilot/plans/123-page-foo.md）。
3. <owner>: リポジトリのオーナー名に置換する（例: LevelCapTech）。
4. <repo>: リポジトリ名に置換する（例: Agile-PMBOK-Assist）。
5. <issue-number>: 設計Issue番号に置換する（例: 123）。
6. <pr-number>: 設計PR番号に置換する（例: 456）。
7. <mock-path>: モックファイルパスまたは参照リンクに置換する。
8. <component-prefix>: 命名衝突回避プレフィックスに置換する（例: Lc）。
-->

# [UI] Upstream: ★ここに画面名★ UI整備

## 1. ゴール

* UI整備完了後、次のAgentがページ統合作業のみを行えば完了できる状態にする。
* Atomic Design 粒度で UI を実装し、Storybook で視覚確認できる状態にする。
* UI は Pure Component とし、ロジックや外部依存を持たない。

### 1.1 In Scope

* React + Tailwind モックの分解
* Atomic Design 粒度での再設計
* コンポーネント実装
* Storybook 生成
* Storybook Test Runner 対応
* CSS競合排除

### 1.2 技術スタック

* Next.js
* React
* TailwindCSS
* MUI（Emotion 前提）

## 2. SSOT参照

* 実装は必ず機能設計書（Markdown）を SSOT とする。
* 設計Issue本文・設計Issueコメント・設計PR本文・設計PRコメントを参照する。
* SSOT と差異がある場合は実装しない（DESIGN へ差し戻す）。
* 参照する機能設計書: `<design-doc-path>`

### 2.1 参照ブロック（必須）

* `.github/copilot/00-index.md`
* `.github/copilot-instructions.md`
* `.github/instructions/**/*.instructions.md`
* `.github/copilot/10-requirements.md`
* `.github/copilot/20-architecture.md`
* `.github/copilot/30-coding-standards.md`
* `.github/copilot/40-testing-strategy.md`
* `.github/copilot/50-security.md`
* `.github/copilot/60-ci-quality-gates.md`
* `.github/copilot/80-templates/*`

## 3. 設計Issueリンク

* https://github.com/<owner>/<repo>/issues/<issue-number>
* 設計Issue本文とコメントの内容を参照すること。

## 4. 設計PRリンク

* https://github.com/<owner>/<repo>/pull/<pr-number>
* 設計PR本文とコメントの内容を参照すること。

## 5. モック情報

* モック参照先: `<mock-path>`
* モックは UI 形状合わせのみに使用し、仕様追加は禁止。

## 6. Atomic分解方針

### 6.1 分解ルール

* モックをそのままコンポーネント化しない。
* 設計書に軽く触れられている粒度を最低単位とする。
* モックより細かい単位で分解する。
* Atomic Design 階層（Atoms / Molecules / Organisms / Templates）を明示する（Pages は対象外）。

### 6.2 分解結果（必須）

| Atomic階層 | 対象要素 | コンポーネント候補 | 目的/責務 |
| --- | --- | --- | --- |
| Atoms | `<ボタン/ラベル/アイコンなど最小要素>` | `<component-prefix><Name> / <Name>Atom` | `<単一責務を1文で記載>` |
| Molecules | `<入力行/カード行など複合要素>` | `<Feature><Name>Item` | `<Atomsを組み合わせる責務>` |
| Organisms | `<一覧/ヘッダ/ナビ等のセクション>` | `<Feature><Section>Panel` | `<セクション全体の表示責務>` |
| Templates（必要な場合のみ） | `<画面レイアウト全体>` | `<ScreenName>LayoutTemplate` | `<領域配置・構造提供の責務>` |

## 7. コンポーネント一覧

* 各コンポーネントは「責務」「Props型」「状態保持の有無」「依存コンポーネント」「再利用可否」「表示専用」を必ず定義する。
* 状態保持は原則なし（保持する場合は理由を明記する）。
* 状態を持つもの、イベントハンドラを持つもの、MUIの `styled` または `sx` を利用するものは `'use client'` を必須とする。

| Atomic階層 | コンポーネント名 | 責務（1文） | Props型定義 | 状態保持 | 制御方式（Controlled/Uncontrolled） | `'use client'` の要否 | 依存コンポーネント | 再利用可否 | 表示専用 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Atoms | `<component-prefix><Name>` | `<何を表示するかを1文で記載>` | `<Name>Props` | `なし` | `Uncontrolled` | `必須/不要` | `なし` | `可/否` | `はい` |
| Molecules | `<Feature><Name>Item` | `<何を組み合わせて表示するか>` | `<Name>ItemProps` | `なし/あり（理由必須）` | `Controlled/Uncontrolled` | `必須/不要` | `<component-prefix><Name>, ...` | `可/否` | `はい` |
| Organisms | `<Feature><Section>Panel` | `<セクション単位の表示責務>` | `<Section>PanelProps` | `なし/あり（理由必須）` | `Controlled/Uncontrolled` | `必須/不要` | `<Feature><Name>Item, ...` | `可/否` | `はい` |
| Templates | `<ScreenName>LayoutTemplate` | `<画面構造を提供する責務>` | `<ScreenName>LayoutTemplateProps` | `なし` | `Uncontrolled` | `必須/不要` | `<Header>, <Sidebar>, ...` | `可/否` | `はい` |

### 7.0.1 DashboardHeaderの制御方式（必須）

* `DashboardHeader` の検索入力は `props.searchQuery` と `props.onSearchChange` を用いた完全なControlledコンポーネントとする。
* `DashboardHeader` 内で検索入力値のために `useState` を使用することを禁止する。

### 7.1 命名衝突回避ルール（必須）

* Atoms は `<component-prefix>` を先頭に付与する（例: `<component-prefix>Avatar`, `<component-prefix>IconButton`）。
* 代替として接尾辞 `Atom` 方式を採用してもよい（例: `AvatarAtom`）。Issue内で方式を統一する。
* MUIの同名コンポーネント（`Avatar`, `IconButton`, `Button` 等）を直接exportしない。
* Barrel export時にMUI名へ再エイリアスしない（例: `export { <component-prefix>Avatar as Avatar }` を禁止）。

### 7.1.1 アイコン描画ルール（必須）

* `iconKey` は共通UIコンポーネント（例: `<Icon iconKey={iconKey} />`）に委譲して描画する。
* `Icon` 内部で `iconKey` と実アイコンの対応表を持つ実装を禁止する。
* アイコン実体の解決は、AppProvider 等の Context から注入された関数（例: `useIcon(iconKey)`）を使用する。
* アイコンを各コンポーネントで個別に `@mui/icons-material` から静的importしない。

### 7.2 ViewModel/Props型定義（必須）

* このセクションだけで実装可能なように、コンポーネント用の型を完全展開する。
* 「設計書参照のみ」「既存型を参照」等の省略記載を禁止する。
* 型定義には最低限 `ViewModel（参考情報）`、各セクションItem型、各コンポーネントProps型を含める。
* 特定画面固有の型名や構造をテンプレートに固定しない。画面ごとに必要な型をこのセクションへ展開する。
* 本Issueの成果物は UI/UXコンポーネント群であり、`<ScreenName>PageProps` の実装は対象外とする。
* ページ系の型（例: `<ScreenName>PageProps`, `<ScreenName>ViewModel`）はモックデータ作成やStory組み立ての参考情報としてのみ定義してよい。
* `React.ReactNode` などの型を使用する場合、import前提を明記する（例: `import type { ReactNode } from "react";`）。

```ts
// import前提（必須）
import type { ReactNode } from "react";

// 例: 画面ViewModel（参考情報）
export interface <ScreenName>ViewModel {
  header: <ScreenName>HeaderView;
  sidebar: <ScreenName>SidebarView;
  // TODO: 画面で使用する一覧/統計/設定などを省略せず記載
}

// 例: Item型（必須）
export interface <ScreenName>ProjectItem {
  id: string;
  name: string;
  status: string;
  // TODO: 必要プロパティを完全展開
}

// 例: Organism Props型（必須）
export interface <ScreenName>HeaderProps {
  title: string;
  isLoading?: boolean;
  error?: { code: string; message: string };
}

export interface <ScreenName>ListPanelProps {
  items: <ScreenName>PrimaryItem[];
  isLoading?: boolean;
  error?: { code: string; message: string };
}

// 例: 画面固有Item型（必要件数だけ定義）
export interface <ScreenName>PrimaryItem {
  id: string;
  name: string;
  status: string;
  // TODO: 画面固有フィールドを完全展開
}

export interface <ScreenName>SecondaryItem {
  id: string;
  label: string;
  value: string;
  // TODO: 画面固有フィールドを完全展開
}

// 例: Template Props型（必要な場合のみ）
export interface <ScreenName>LayoutTemplateProps {
  header: ReactNode;
  sidebar?: ReactNode;
  main: ReactNode;
}
```

| 型カテゴリ | 型名 | 定義場所（このIssue本文内） | 完全展開 |
| --- | --- | --- | --- |
| ViewModel（参考情報） | `<ScreenName>ViewModel` | `7.2` | `任意` |
| Item DTO | `<ScreenName>PrimaryItem / <ScreenName>SecondaryItem` | `7.2` | `必須` |
| Component Props | `<ComponentName>Props（Atoms/Molecules/Organisms/Templates）` | `7.2` | `必須` |

## 8. CSS責務定義

### 8.1 CSS前提

* StyledEngineProvider の `injectFirst` を前提とする。
* MUI は構造/コンポーネント責務、Tailwind はユーティリティ用途のみ。
* 同一要素で同一CSSプロパティの多重指定を禁止する。
* MUI と Tailwind で同一スタイル責務を持たせない。
* UpstreamではPC画面専用。メディアクエリ/レスポンシブ設計/スマートフォン対応を禁止する。
* 将来拡張のためだけの過剰抽象化（未使用の汎用レイヤ、不要なジェネリクス、過度なDI）は禁止する。
* ただしAtomic再利用に必要な最小抽象化（size variants、tone variants、共通Props化）は許可する。

### 8.2 CSS責務一覧（必須）

| 対象 | MUI責務 | Tailwind責務 | 競合回避方針 |
| --- | --- | --- | --- |
| `<ComponentName>` | `<構造/寸法/色/境界線など>` | `<余白/整列/表示制御など>` | `<同一CSSプロパティを片側固定>` |

### 8.3 Atoms単位スタイル責務（推奨）

* Atomsごとに「MUI利用/Tailwind利用/禁止プロパティ」を1行で固定する。
* 競合しやすい `padding`, `margin`, `font-size`, `color`, `border`, `background`, `width`, `height` は必ず担当を固定する。
* ※ これらは「スタイルを指定する場合の管轄」であり、デザイン上不要なプロパティ（`padding: 0` 等）の明示的な初期化を強制するものではない。

| Atom名 | MUI(sx/styled)利用 | Tailwind class利用 | 担当固定プロパティ（必須） | 禁止プロパティ（禁止側に記載） |
| --- | --- | --- | --- | --- |
| `<component-prefix><ComponentName>` | `あり/なし` | `あり/なし` | `padding:<MUI/TW>, margin:<MUI/TW>, font-size:<MUI/TW>, color:<MUI/TW>, border:<MUI/TW>, background:<MUI/TW>, width:<MUI/TW>, height:<MUI/TW>` | `例: <property> を<MUI/TW>で指定禁止` |
| `<ComponentName>Atom` | `あり/なし` | `あり/なし` | `padding:<MUI/TW>, margin:<MUI/TW>, font-size:<MUI/TW>, color:<MUI/TW>, border:<MUI/TW>, background:<MUI/TW>, width:<MUI/TW>, height:<MUI/TW>` | `例: <property> を<MUI/TW>で指定禁止` |

### 8.4 テーマ変数変換ルール（必須）

* モック由来のTailwind色クラスをハードコード値へ置き換えない。
* 色・背景・枠線は MUI Theme 変数へ変換して指定する（例: `theme.palette.*`）。

| モック表現（Tailwind例） | MUI Theme変換先（例） | 禁止事項 |
| --- | --- | --- |
| `text-gray-500` | `theme.palette.text.secondary` | `color: \"#6b7280\"` の直接指定禁止 |
| `text-gray-900` | `theme.palette.text.primary` | `color` の16進ハードコード禁止 |
| `bg-white` | `theme.palette.background.paper` | 背景色の固定値指定禁止 |
| `bg-gray-50` | `theme.palette.background.default` | 背景色の固定値指定禁止 |
| `border-gray-200` | `theme.palette.divider` | 枠線色の固定値指定禁止 |
| `text-blue-600` | `theme.palette.primary.main` | 主要色の固定値指定禁止 |
| `text-green-600` | `theme.palette.success.main` | 状態色の固定値指定禁止 |
| `text-amber-600` | `theme.palette.warning.main` | 状態色の固定値指定禁止 |

### 8.5 バリアント/デザイン・トークン対応表（必須）

* `size` / `tone` は下表の対応を必須とする。
* 下表にない値は、Issue本文に追加して合意されるまで実装しない。

| 種別 | 値 | マッピング先（必須） |
| --- | --- | --- |
| `size` | `sm` | `16px` |
| `size` | `md` | `24px` |
| `size` | `lg` | `32px` |
| `tone` | `primary` | `theme.palette.primary.main` |
| `tone` | `success` | `theme.palette.success.main` |
| `tone` | `warning` | `theme.palette.warning.main` |
| `tone` | `error` | `theme.palette.error.main` |
| `tone` | `neutral` | `theme.palette.text.secondary` |

### 8.6 Typographyマッピング（必須）

* 見出し・本文・数値は MUI `Typography` の `variant` と `component` を固定する。
* 見出し用途を `div` / `span` で代替する実装を禁止する。

| 対象コンポーネント | 用途 | MUI `Typography` variant | HTMLタグ（component） |
| --- | --- | --- | --- |
| `LcSectionTitle` | セクション見出し | `h6` | `h2` |
| `LcSectionTitle` | 補助説明 | `body2` | `p` |
| `LcMetricValue` | 主要数値 | `h5` | `p` |
| `LcMetricValue` | 単位/補足 | `caption` | `span` |
| `LcStatusChip` | 状態ラベル | `caption` | `span` |

## 9. Storybook生成要件

* 全てのAtomic Design階層（Atoms / Molecules / Organisms / Templates）でStoryを作成する。
* Propsバリエーションがある場合は全パターン作成する。
* Controls有効化、Docs自動生成を有効化する。
* Storyのデコレーターで、UI描画に必要なダミーContext（例: アイコン解決用 `IconResolverContext`）を注入する。
* Storybook Test Runnerで以下を満たすこと。
  * 全Storyのレンダリング成功
  * console error なし
  * interaction test成功（存在する場合）
  * a11y違反なし（導入済みの場合）

### 9.1 必須Story一覧（推奨）

* 生成物のSSOTとして、コンポーネントごとに最低限必要なStoryキーを列挙する。
* `default` のみで完了扱いにしない。状態/variantがある場合は対応Storyを必須化する。

| Atomic階層 | コンポーネント名 | 必須Storyキー | Play関数での検証内容 |
| --- | --- | --- | --- |
| Atoms | `<component-prefix><Name>` | `default`, `disabled` | `disabled` で `toBeDisabled()` を検証 |
| Molecules | `<Feature><Name>Item` | `default`, `empty` | `empty` で空状態文言/件数0表示を検証 |
| Organisms | `<Feature><Section>Panel` | `default`, `loading`, `error` | `loading` でローディング表示、`error` でエラー文言表示を検証 |
| Templates | `<ScreenName>LayoutTemplate` | `default` | 主要領域（header/main等）の表示を検証 |
| Molecules | `SettingActionButton` | `default`, `disabled` | `disabled` でクリック不能かつ `onClick` スパイ未呼出しを検証 |

### 9.2 StoryキーとProps契約の整合ルール（必須）

* `loading` story を要求するコンポーネントは、対応するPropsに `isLoading?: boolean` を必ず定義する。
* `error` story を要求するコンポーネントは、対応するPropsに `error?: { code: string; message: string }` を必ず定義する。
* `empty` story を要求するコンポーネントは、対応するPropsに空配列を受け取る一覧型（例: `items: Item[]`）を必ず定義する。
* `disabled` story を要求するコンポーネントは、対応するPropsに `disabled?: boolean` を必ず定義する。

| Storyキー | Props必須契約 | 例 |
| --- | --- | --- |
| `loading` | `isLoading?: boolean` | `ProjectListPanelProps` |
| `error` | `error?: { code: string; message: string }` | `BudgetExecutionPanelProps` |
| `empty` | `items: Item[]`（空配列許容） | `MemberListPanelProps` |
| `disabled` | `disabled?: boolean` | `LcIconButtonProps` |

### 9.3 Mock Provider注入要件（必須）

* Storybook では `preview.ts` または各Storyの `decorators` で Mock Provider をラップする。
* アイコン描画は、`useIcon(iconKey)` を返すダミー実装を注入して検証する。
* Context依存の値をStory内で直接ハードコードせず、Provider経由で注入する。

## 10. 変更禁止範囲

### 10.1 Out of Scope（実装禁止）

* API呼び出し / データフェッチ
* API import / fetch / axios / useQuery 系
* 状態管理ロジック / useEffect / 非同期処理
* グローバル状態参照（Zustand/Recoil/Redux 等）
* ルーティング処理 / ページ統合 / コンテナ実装
* サーバーコンポーネント利用

### 10.2 変更禁止パス・モジュール（必要に応じて追記）

* DO NOT CHANGE:
  * なし

## 11. 品質ゲート

* format
* lint
* typecheck
* unit test
* security
* Storybook build
* Storybook Test Runner

## 12. Done定義

* 6章で定義したAtomic分解に対応するUIコンポーネントが実装されている
* 7章で定義したProps型と実装コードが一致している（型エラーなし）
* 7章で定義した `'use client'` 要否に違反がない
* `DashboardHeader` がControlled実装（`searchQuery`/`onSearchChange`）であり、内部 `useState` を持たない
* 命名衝突回避ルールに違反するコンポーネント名が存在しない
* MUI同名コンポーネントの直接exportが存在しない
* アイコン描画が共通 `<Icon iconKey={...} />` 経路へ統一され、解決がContext注入関数（例: `useIcon`）経由になっている
* UI実装にAPI呼び出し・非同期処理・グローバル状態参照が混入していない
* CSS責務定義（8章）どおりに実装され、同一プロパティの多重指定がない
* 色指定が8.4のテーマ変数変換ルールに従い、ハードコード色を使用していない
* 8.5のバリアント/デザイン・トークン対応表に従って `size` / `tone` が実装されている
* 8.6のTypographyマッピングに従って `variant` と `component` が設定されている
* 9.1で定義した必須Storyキーが全コンポーネントで作成されている
* 9.1で定義したPlay関数アサーションが各Storyに実装されている
* 9.2で定義したStoryキーとProps契約の整合ルールを満たしている
* 9.3のMock Provider注入要件を満たし、StorybookでContext依存が解決されている
* Storybook上で全Storyが表示確認でき、console error が発生しない
* Storybook Test Runner が成功する
* format / lint / typecheck / unit test / security / Storybook build が成功する
* コンポーネントは `pages` 配下に存在しない
* データ未接続（Container未実装・外部依存なし）を維持している
