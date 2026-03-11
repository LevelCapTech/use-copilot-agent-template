---
name: 'dependabot-yml-enable'
title: '🔧 Dependabot 設定ファイルの有効化'
labels: 'automation'
assignees: ''
---
# タスク: `.github/dependabot.yml` の有効化

## 背景
現在、`.github/dependabot.yml` は全体がコメントアウトされており、Dependabot が動作していない。

## 目的
Docker（本番/開発）および pip 依存関係の自動更新を有効化する。

## 作業内容
- `.github/dependabot.yml` のコメントアウトを解除し、有効な YAML として保存する
- 設定内容を以下で有効化する
  - `package-ecosystem: docker`（`/docker/prod`）
  - `package-ecosystem: docker`（`/docker/dev`）
  - `package-ecosystem: pip`（`/src`）
- `schedule.interval` はすべて `weekly`
- `open-pull-requests-limit` はすべて `5`

## 受け入れ条件
- `.github/dependabot.yml` が有効な YAML として解釈できる
- GitHub 上で Dependabot 設定エラーが発生しない
- 上記3エコシステムの更新設定が反映される

## 完了条件
- PR を作成し、CI 品質ゲート（lint / typecheck / test / security）を満たす
- 変更内容を PR に明記する