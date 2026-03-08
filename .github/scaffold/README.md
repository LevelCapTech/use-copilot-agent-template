# Scaffold Directory

このディレクトリは **プロジェクト設定の雛形（scaffold）を管理するための場所**です。

このリポジトリでは、複数種類のプロジェクト（Nodeライブラリ、Next.jsアプリなど）を扱うため、
`.github` やルート直下の設定ファイルを **直接共通化することができません。**

そのため、以下の目的で **scaffold（プロジェクト骨組み）をここに保管しています。

---

## 目的

scaffold ディレクトリは次の用途で使用します。

* 新しいリポジトリ作成時の **設定テンプレート**
* プロジェクトタイプ別の **CI / 設定管理**
* 設定ファイルの **SSOT（Single Source of Truth）**

ここに保存された構成は **自動では使用されません。**

必要に応じて各リポジトリのルートへコピーして使用します。

---

## ディレクトリ構造

```
.github/scaffold/
  node-library/
  nextjs-app/
  php-library/
```

各ディレクトリは **プロジェクトタイプ別の雛形**を表します。

---

## 使い方

新しいプロジェクトを作る場合は、対象 scaffold から設定をコピーします。

例

```
cp -R .github/scaffold/node-library/* .
```

または必要な設定だけコピーします。

```
cp .github/scaffold/node-library/config/tsconfig.json .
```

---

## 注意事項

このディレクトリ内のファイルは **GitHub によって自動実行されません。**

例えば workflow を `.github/workflows` に置くと CI が自動実行されますが、
この scaffold 内の workflow は **保存用です。**

---

## 命名について

`template` ではなく **scaffold** を使用しています。

理由

* GitHubの `ISSUE_TEMPLATE` や `workflow-templates` と混同しないため
* プロジェクト骨組み（scaffolding）という開発用語として明確なため

---

## 管理方針

このディレクトリは **設定のカタログ**として扱います。

CI / 設定を変更する場合は

1. scaffold を更新
2. 各リポジトリへ反映

という流れで管理します。
