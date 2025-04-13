# ビルドステージ: Node.jsを使ってアプリをビルド
FROM node:20-slim AS builder

WORKDIR /app

# パッケージファイルをコピー
COPY package.json pnpm-lock.yaml* ./

# 依存関係をインストール
RUN npm install -g pnpm && \
  pnpm install --frozen-lockfile

# ソースコードをコピー
COPY . .

# TypeScriptをJavaScriptにビルド
RUN pnpm build

# 本番依存関係のみインストール
RUN pnpm install --frozen-lockfile --prod

# 実行ステージ: distrolessを使用
FROM gcr.io/distroless/nodejs20-debian11

WORKDIR /app

# ビルド済みのアプリケーションと依存関係をコピー
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

# 実行ユーザーを非root権限に設定
USER nonroot:nonroot

# ポートを公開
EXPOSE 8080

# アプリケーションの起動
CMD ["dist/index.js"]