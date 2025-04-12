import { serve } from '@hono/node-server'
import app from './index'

// @hono/node-serverを使って明示的にサーバーを起動
// これにより、Node.js環境で簡単に実行できる
serve({
  fetch: app.fetch,
  port: app.port
})

console.log(`Server is running on http://localhost:${app.port}`)