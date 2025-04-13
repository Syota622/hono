# Hono API with Distroless Docker

シンプルなHono APIアプリケーションをDistroless Dockerコンテナで実行するプロジェクトです。

## 特徴

- **Hono.js**: 高速で軽量なWebフレームワーク
- **TypeScript**: 型安全性の確保
- **Distroless**: 必要最小限のコンテナイメージで安全性とパフォーマンスを向上
- **Docker Compose**: 簡単なコンテナオーケストレーション

## プロジェクト構造

```
.
├── Dockerfile          # マルチステージビルドとDistrolessランタイム
├── docker-compose.yml  # Docker Compose設定
├── package.json        # 依存関係と実行スクリプト
├── tsconfig.json       # TypeScript設定
├── src
│   ├── index.ts        # サーバーエントリーポイント
│   └── app.ts          # Honoアプリケーション
└── .gitignore
```

## セットアップと実行方法

### ローカル開発

```bash
# 依存関係のインストール
npm install
# または
pnpm install

# 開発サーバーの起動
npm run dev
# または
pnpm dev
```

### Dockerコンテナでの実行

```bash
# Dockerイメージのビルドと実行
docker-compose up --build
```

サーバーは `http://localhost:8787` で実行されます。

## API エンドポイント

| メソッド | エンドポイント | 説明 |
|---------|--------------|------|
| GET     | /            | 「Hello Hono!」テキストを返す |
| GET     | /entry       | すべてのブログ投稿を返す |
| GET     | /entry/:id   | 指定されたIDのブログ投稿を返す |
| POST    | /entry       | 新しいブログ投稿を作成する |

## 使用例

```bash
# すべてのエントリーを取得
curl http://localhost:8787/entry

# 特定のエントリーを取得
curl http://localhost:8787/entry/1

# 新しいエントリーを作成
curl -X POST http://localhost:8787/entry -H "Content-Type: application/json" -d '{"title":"blog4","content":"content4"}'
```

## Dockerイメージについて

このプロジェクトでは、セキュリティとパフォーマンスを向上させるためにGoogle Distrolessイメージを使用しています。Distrolessイメージには、アプリケーションの実行に必要な最小限のコンポーネントのみが含まれています。

- シェルやパッケージマネージャーなどの不要なツールが含まれていない
- 攻撃対象領域が小さい
- イメージサイズが小さい
- セキュリティ脆弱性が少ない

## 注意事項

- このアプリケーションは、メモリ内データストレージを使用しています。コンテナの再起動時にデータはリセットされます。
- 本番環境では、永続的なデータストレージの実装を検討してください。

```log
suzukishouta@shota hono-demo % curl http://localhost:8787/entry/4 | jq .
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    26  100    26    0     0   3592      0 --:--:-- --:--:-- --:--:--  3714
{
  "error": "post not found"
}
suzukishouta@shota hono-demo % curl -X POST http://localhost:8787/entry -d '{"title":"blog4","content":"content4"}'
{"new post":{"id":"4","title":"blog4","content":"content4"}}%                           
suzukishouta@shota hono-demo % 
suzukishouta@shota hono-demo % 
suzukishouta@shota hono-demo % curl http://localhost:8787/entry/4 | jq .
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    54  100    54    0     0  11997      0 --:--:-- --:--:-- --:--:-- 13500
{
  "you id is": "4",
  "title": "blog4",
  "content": "content4"
}
```