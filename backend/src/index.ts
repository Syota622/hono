import { Hono } from 'hono'
import { logger } from 'hono/logger'

// Honoアプリケーションのインスタンスを作成
const app = new Hono()

// ミドルウェア: ロギング
app.use('*', logger())

// ルート (/) へのGETリクエスト - Hello Worldを返す
app.get('/', (c) => {
  return c.json({
    message: 'Hello World',
    timestamp: new Date().toISOString()
  })
})

// ヘルスチェックエンドポイント
app.get('/health', (c) => {
  return c.text('OK')
})

// サーバーポートの設定（環境変数またはデフォルト値）
const port = parseInt(process.env.PORT || '3000', 10)

// サーバーの起動
console.log(`Server is starting on port ${port}...`)
// Honoの最新バージョンでの起動方法は以下のようになります
import { serve } from '@hono/node-server'
serve({ fetch: app.fetch, port })