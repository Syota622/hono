# Hono TypeScript API

TypeScriptとHonoフレームワークを使用したシンプルなAPIアプリケーション。

## 機能

- 基本的なHello World APIエンドポイント
- TypeScriptを使用した型安全なコード
- Honoフレームワークによる高速なルーティング
- Dockerコンテナ対応

## 開発環境のセットアップ

### 必要条件

- Node.js 18.x以上
- npm 8.x以上
- Docker（オプション）

### インストールと実行

```bash
# 依存関係のインストール
npm install

# 開発モードで実行
npm run dev

# 本番用にビルド
npm run build

# 本番モードで実行
npm start
```

### Dockerを使用した実行

```bash
# Dockerイメージのビルドと実行
docker compose up --build
```

## APIエンドポイント

| メソッド | エンドポイント | 説明 |
|----------|----------------|------|
| GET      | /              | Hello Worldメッセージを返す |
| GET      | /health        | ヘルスチェック用のOKレスポンスを返す |

## プロジェクト構造

```
.
├── src/                # ソースコード
│   └── index.ts        # メインアプリケーションファイル
├── dist/               # コンパイル済みのJavaScriptファイル
├── Dockerfile          # Dockerコンテナの定義
├── docker-compose.yml  # Dockerコンポーズの設定
├── package.json        # プロジェクト依存関係と設定
├── tsconfig.json       # TypeScript設定
└── README.md           # プロジェクト説明書
```

## デプロイ

### Dockerイメージのビルド

```bash
docker build -t hono-api .
```

### コンテナの実行

```bash
docker run -p 3000:3000 hono-api
```

サーバーは http://localhost:3000 で起動し、「Hello World」メッセージを返します。