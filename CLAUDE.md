# word-wolf プロジェクトルール

## プロジェクト概要
オフラインで遊べるワードウルフWebアプリ（PWA + Capacitorでネイティブアプリ対応）

## 技術スタック
- ビルド: Vite 7
- フレームワーク: React 19 + TypeScript (strict mode)
- UI: Tailwind CSS 3 + Framer Motion
- 状態管理: React Context + useReducer
- PWA: vite-plugin-pwa
- ネイティブ: Capacitor 7（Android / iOS）

## デプロイ
### Web
- ビルド: `npm run build` → `dist/` に出力
- デプロイ: `npm run deploy`（SFTP で `dist/` をアップロード）
- デプロイ先: `S:\html\word-wolf\` = サーバーの `/var/www/word-wolf`
- URL: `http://192.168.0.77/word-wolf/`

### ネイティブ（Android）
1. `npm run build`
2. `npx cap sync`
3. `npx cap open android` → Android Studio でビルド

## ディレクトリ構成
- `src/components/` - 画面コンポーネント（Setup, RoleAssignment, Discussion, Voting, Result）
- `src/components/ui/` - 共通UIコンポーネント
- `src/context/` - ゲーム状態管理（GameContext）
- `src/types/` - TypeScript型定義
- `src/utils/` - ユーティリティ・出題データ（wordPairs）
- `android/` - Capacitor Androidプロジェクト
- `ios/` - Capacitor iOSプロジェクト

## コーディング規約
### 画面追加時
- [ ] `src/components/` にコンポーネントを作成
- [ ] `src/types/game.ts` の `GamePhase` 型にフェーズを追加
- [ ] `src/context/GameContext.tsx` のreducerにアクションを追加
- [ ] `src/App.tsx` のフェーズ切り替えに追加

### 出題データ追加時
- [ ] `src/utils/wordPairs.ts` にカテゴリ・単語ペアを追加

### 壊さないガード（必須遵守）
- `vite.config.ts` の `base: '/word-wolf/'` を変更しない
- `GamePhase` の既存フェーズ名を変更しない（画面遷移が壊れる）
- `capacitor.config.ts` の `appId` を変更しない（ネイティブビルドに影響）
- Web側を変更したら `npx cap sync` を実行してネイティブと同期する
