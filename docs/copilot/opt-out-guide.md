# GitHub Copilot 学習利用オプトアウト手順

## 概要

2026年4月24日以降、GitHub Copilot Free / Pro / Pro+ では、GitHub の機能やサービスでのやり取り（入力、出力、コード断片、関連コンテキストなど）が AI モデルの学習と改善に利用される場合があります。学習利用を避けたい場合は、個人アカウントの Copilot 設定でオプトアウトしてください。

## 対象

- GitHub Copilot Free
- GitHub Copilot Pro
- GitHub Copilot Pro+

## 前提条件

- GitHub にログイン済みである
- 自分のアカウント設定を変更できる
- GitHub へ HTTPS でアクセスできる

## 手順

1. GitHub にログインします。
2. 画面右上のプロフィール画像をクリックし、**Copilot settings** を開きます。
   - UI の表示差分により **Settings** を経由して **Copilot** セクションを開く構成になっている場合は、そちらを利用してください。
3. Copilot 設定画面で、**Allow GitHub to use my data for AI model training** を探します。
4. ドロップダウンを **Disabled** に変更します。
5. 変更後も表示が **Disabled** のままであることを確認します。

## 期待される状態

- GitHub Copilot の学習利用設定が無効化されている
- 以後、対象アカウントの入力データが AI モデル学習用として利用されない設定になっている

## 設定項目が表示されない場合

- Copilot Business / Enterprise ライセンスのアカウントでサインインしている可能性があります
  - これらのプランでは個人設定の表示が出ない場合があります
- GitHub の UI が更新され、項目名や配置が変わっている可能性があります
- 想定している GitHub アカウントではなく、別アカウントでログインしている可能性があります

上記に該当する場合は、GitHub の最新ドキュメントと現在の契約プランを確認してください。

## IDE 補足

2026年4月23日時点で確認できる GitHub 公式ドキュメントでは、AI モデル学習のオプトアウト設定は GitHub.com の個人向け Copilot 設定で管理します。

- VS Code / JetBrains では、Copilot の有効化状態や言語別設定も併せて確認してください
- IDE 側の補助設定と GitHub.com 側の設定に差異があると、利用者が現在の有効状態を誤認しやすくなります

## 注意事項

- この手順は手動操作を前提としています
- GitHub の UI や設定項目名は将来変更される可能性があります
- トークンや秘密情報を保存する手順は不要です

## 参考情報

- [Configuring your personal GitHub Copilot settings on GitHub.com](https://docs.github.com/en/copilot/configuring-github-copilot/configuring-your-personal-github-copilot-settings-on-githubcom)
- [Configuring GitHub Copilot in your environment](https://docs.github.com/en/copilot/managing-copilot/configure-personal-settings/configuring-github-copilot-in-your-environment?tool=webui)
