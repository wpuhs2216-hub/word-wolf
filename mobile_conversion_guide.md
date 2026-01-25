# Webアプリをモバイルアプリに変換する手順 (Capacitor使用)

このプロジェクトは、Web技術を使ってモバイルアプリを作成できる **Capacitor** を使用するように設定されました。
以下の手順に従って、AndroidおよびiOSアプリとしてビルド・実行してください。

## 1. 事前準備 (環境構築)

モバイルアプリをビルドするには、各OSのネイティブ開発ツールが必要です。

### Android向け (Windows/Mac/Linux)
1. **Android Studio** をダウンロードしてインストールしてください。
   - [Android Studio 公式サイト](https://developer.android.com/studio)
2. インストール時に、**Android SDK** と **Android Virtual Device (AVD)** が含まれていることを確認してください。

### iOS向け (Macのみ)
1. **Xcode** をMac App Storeからインストールしてください。
2. Xcodeを開き、追加のコンポーネントのインストールを完了させてください。
3. **CocoaPods** をインストールします (ターミナルで実行):
   ```bash
   sudo gem install cocoapods
   ```

## 2. アプリのビルドと同期

Webアプリのコードを変更した後は、必ず以下のコマンドを実行して、モバイルプロジェクトに変更を反映させる必要があります。

1. **Webアプリをビルド**:
   ```bash
   npm run build
   ```
   これにより、`dist` フォルダに最新のWebアプリが生成されます。

2. **Capacitorと同期**:
   ```bash
   npx cap sync
   ```
   これにより、`dist` の内容が `android` および `ios` フォルダにコピーされ、プラグインが更新されます。

## 3. アプリの実行

### Androidで実行
1. 以下のコマンドでAndroid Studioを開きます:
   ```bash
   npx cap open android
   ```
2. Android Studioが起動したら、プロジェクトの読み込みが完了するまで待ちます。
3. 右上のデバイス選択メニューから、エミュレーターを作成・選択するか、USB接続したAndroid端末を選択します。
4. 緑色の再生ボタン (Run) をクリックしてアプリを起動します。

### iOSで実行 (Macのみ)
1. 以下のコマンドでXcodeを開きます:
   ```bash
   npx cap open ios
   ```
2. Xcodeが起動したら、左上のデバイス選択メニューからシミュレーターまたは接続したiPhoneを選択します。
3. 再生ボタン (Run) をクリックしてアプリを起動します。
   - 実機で動かす場合は、Apple IDでの署名設定が必要になることがあります (Signing & Capabilities タブで設定)。

## 4. 開発のヒント

- **ライブリロード**: 開発中に毎回ビルドするのが面倒な場合、同じWi-Fiネットワーク上のPCサーバーに接続して開発できます。`capacitor.config.ts` の `server.url` を設定することで可能ですが、本番ビルド時には削除することを忘れないでください。
- **アイコンとスプラッシュスクリーン**: `capacitor-assets` ツールを使うと、アイコンや起動画面を自動生成できます。
  ```bash
  npm install @capacitor/assets --save-dev
  npx capacitor-assets generate
  ```
  (※ `assets` フォルダに `icon.png` と `splash.png` を用意する必要があります)

## トラブルシューティング

- **同期がうまくいかない場合**: `dist` フォルダが存在するか確認してください (`npm run build` を実行済みか)。
- **Android Studioのエラー**: SDKのバージョンなどが不足している場合があります。Android Studio内のSDK Managerで必要なコンポーネントをインストールしてください。
