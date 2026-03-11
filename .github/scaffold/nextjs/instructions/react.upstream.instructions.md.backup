---
name: React upstream DI rules
description: React components must rely on contracts and AppProvider DI
applyTo:
  - "app/**/*.{tsx,ts}"
---
- `app/*/page.tsx` は `packages/contracts/*` と `packages/ui/*` と `AppContext` を参照可能とする。
- 依存解決は AppProvider のみで行い、コンポーネント内部で具象実装を生成しない。
- `packages/ui` は props を受けて描画に専念し、具象I/O実装を持たない。
- `private/` ディレクトリを追加しない。
