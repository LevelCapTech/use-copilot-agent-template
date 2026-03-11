# [IMPLEMENT] <目的/画面名>

## 0. AI Agent 契約（最初に読む）

* あなたは **AIコーディングAgent**。このIssue本文と「入力（SSOT参照セット）」のみで作業する。
* **SSOTは plan**（確定planが最優先）。矛盾があれば **planを正** とする。
* **入力不足/矛盾/実装に必要な情報欠落** がある場合、実装を開始しない。

  * 代わりに `BLOCKER:` として不足点を列挙し、**DESIGNへ差し戻し**（plan修正依頼）を返す。
* **plan外の仕様追加/推測補完は禁止**。

## 1. 目的

* ゴール: plan通りにUpstream(public)実装を完了し、CI品質ゲートをすべて通す。
* 前提: Next.js（App Router） / Plugin型アーキテクチャ / DIP

  * **Composition Root（AppProvider）で依存解決**する。

## 2. 入力（SSOT参照セット）※ここが揃っていないと開始禁止

### 2.1 確定plan（固定パス / 最優先）

* `.github/copilot/plans/<issue-number>-<slug>-implementation-plan.md`

### 2.2 DESIGN Issue（仕様の背景・補助）

* [https://github.com/](https://github.com/)<owner>/<repo>/issues/<design-issue-number>

### 2.3 DESIGN PR（設計差分・合意点）

* [https://github.com/](https://github.com/)<owner>/<repo>/pull/<design-pr-number>


### 2.5 画面モック/画像（UIの形状合わせ用・仕様追加は禁止）

* <mock-path or link>

## 3. スコープ / 非ゴール

* 対象: **Upstream(public)のみ**（private参照・実装・言及は禁止）
* 対象: Next.js **App Router（`app/`）**
* 非ゴール:

  * plan外の機能追加
  * 大規模リファクタ
  * アーキ変更（DIP/Composition Rootの変更）

## 4. 変更許容範囲（plan厳守）

* planからの逸脱: **禁止**
* planが不足している場合: **実装しない** → `BLOCKER` で差し戻し
* planに「任意/裁量」と明記された箇所のみ、最小差分で判断してよい（判断理由をPR本文へ1〜3行で記録）

## 5. 成果物マニフェスト（必須 / planから転記）

> **この表が埋まっていない場合は実装開始禁止**。
> ここに書かれたものだけを作る（= planを転記）。テンプレ側で成果物を決めない。

| layer     | action(add/modify/delete) | path(相対) | export/API(型名/関数名) | wiring(どこ→どこ) | tests(追加/更新) |
| --------- | ------------------------- | -------- | ------------------ | ------------- | ------------ |
| docs      |                           |          |                    |               |              |
| contracts |                           |          |                    |               |              |
| ui        |                           |          |                    |               |              |
| app       |                           |          |                    |               |              |
| deps      |                           |          |                    |               |              |
| plugins   |                           |          |                    |               |              |

## 6. 受入条件（planから転記 / 不足はBLOCKER）

> planのAcceptance Criteriaをそのまま列挙（AIが増やさない）。

* 
* 
* 

## 7. ガードレール（禁止事項 / 変更してはいけないもの）

* DO NOT CHANGE（該当があれば列挙。なければ「なし」）:

  * <例: APIの外部公開シグネチャ>
  * <例: DBスキーマ>
* 仕様追加禁止（plan外の新要件、推測補完）
* private参照禁止（`@company/*`, `**/private/*` など）

## 8. アーキ制約（DIP / Plugin / Composition Root）

* 依存解決（DI）は **`src/providers/AppProvider.tsx` のみ**
* `app/**` は薄く（newしない・I/Oしない・depsはContextから取得してUIへ渡す）
* `packages/contracts/**` は interface/type のみ（実装・fetch・URL等の具体禁止）
* `packages/ui/**` は public UI（外部I/O禁止）
* Pluginsは planで要求される場合のみ追加（不要なら作らない）

## 9. 必読（規約/ゲート）

* `.github/copilot-instructions.md`
* `.github/instructions/**/*.instructions.md`
* `.github/copilot/30-coding-standards.md`
* `.github/copilot/50-security.md`
* `.github/copilot/60-ci-quality-gates.md`

## 10. 実行・品質ゲート（Done直結）

* format / lint
* typecheck
* test（planが要求する範囲）
* build

## 11. 作業ログ（AI Agentが残す最小記録）

> 人間向けではなく、**監査と再現**のための最小ログ。

* 参照したSSOT: plan / DESIGN Issue / DESIGN PR / docs
* 実装判断（裁量がある場合のみ）: 1〜3行
* 受入条件の担保証跡: テスト名/コマンド/スクショ（必要なら）

## 12. Done（必須）

* 成果物マニフェストの項目がすべて実装済み
* 受入条件がすべて満たされる（可能な限りテストで担保。planに従う）
* CI品質ゲートがすべて緑（format/lint/typecheck/test/security/build）
* ドキュメント更新は最小差分（planに従う）

## 13. BLOCKER（入力不足時の返却フォーマット）

> 実装開始前に不足があった場合のみ使用。

* BLOCKER: <不足点>
* 必要な追記先: <plan / DESIGN Issue / docs>
* 理由（1行）: <なぜこれが無いと実装できないか>
