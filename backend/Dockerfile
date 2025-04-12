# ビルドステージ
FROM node:20-alpine AS builder

# 作業ディレクトリの設定
WORKDIR /app

# パッケージ関連ファイルのコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm ci

# ソースコードのコピー
COPY . .

# TypeScriptのコンパイル
RUN npm run build

# 実行ステージ
FROM node:20-alpine

# セキュリティのため非rootユーザーを作成
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# 作業ディレクトリの設定
WORKDIR /app

# 本番環境用の依存関係のみをインストールするための設定
COPY package*.json ./
RUN npm ci --omit=dev

# ビルドステージからコンパイル済みのコードをコピー
COPY --from=builder /app/dist ./dist

# 権限の設定
RUN chown -R appuser:appgroup /app
USER appuser

# 環境変数の設定
ENV PORT=3000
ENV NODE_ENV=production

# ポートの公開
EXPOSE 3000

# ヘルスチェックの設定
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# アプリケーションの実行
CMD ["node", "dist/index.js"]