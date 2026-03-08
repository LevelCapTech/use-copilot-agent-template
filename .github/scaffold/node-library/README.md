# Node Library Scaffold

このディレクトリは **Node.js ライブラリプロジェクト用の設定雛形**です。

npm公開パッケージや内部コンポーネントライブラリを作成する際の
基本的な CI と TypeScript 設定をまとめています。

---

## 対象プロジェクト

この scaffold は次の用途を想定しています。

* npm公開ライブラリ
* React / TypeScript コンポーネントライブラリ
* 内部共有パッケージ

例

* UI component library
* utility library
* framework extension

---

## ディレクトリ構造

```
node-library/
  ci/
    ci.yml
    gh-pages.yml
    npm-publish.yml

  config/
    tsconfig.json
    tsconfig.build.json
    tsconfig.test.json
```

---

## CI構成

### ci.yml

基本CI

* install
* lint
* build
* test

---

### gh-pages.yml

GitHub Pages公開用CI

主な用途

* Storybook
* ドキュメントサイト
* デモページ

---

### npm-publish.yml

npm公開CI

主な処理

* build
* version
* publish

---

## TypeScript設定

### tsconfig.json

ベース設定

* 共通compilerOptions
* TypeScript strict設定

---

### tsconfig.build.json

ライブラリビルド用

* src をコンパイル
* test を除外

---

### tsconfig.test.json

テスト用設定

* test ディレクトリを含む
* Jest / Vitest 用

---

## 利用方法

新しい Node ライブラリを作成する場合は、
必要な設定をプロジェクトへコピーして使用します。

例

```
cp -R .github/scaffold/node-library/config/* .
cp -R .github/scaffold/node-library/ci/* .github/workflows/
```

---

## 設計方針

この scaffold は **Node library 用の最小構成**を提供します。

各プロジェクトの要件に応じて

* ESLint
* Prettier
* bundler（tsup / rollup / vite）

などを追加してください。
