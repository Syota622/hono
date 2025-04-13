import { Hono } from 'hono'
import { prettyJSON } from "hono/pretty-json"

interface BlogPost {
  id: string
  title: string
  content: string
}

let blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "blog1",
    content: "content1"
  },
  {
    id: "2",
    title: "blog2",
    content: "content2"
  },
  {
    id: "3",
    title: "blog3",
    content: "content3"
  }
]

const app = new Hono()
app.use("*", prettyJSON())

app.get("/", (c) => {
  return c.text("Hello Hono!")
})

// 全てのpostを取得
app.get("/entry", (c) => {
  return c.json(blogPosts)
})

// blogPostsからtitle、contentを取得して返す
app.get("/entry/:id", (c) => {
  const id = c.req.param("id")
  const post = blogPosts.find((post) => post.id === id)
  if (!post) {
    return c.json({
      "error": "post not found"
    }, 404)
  }
  return c.json({
    "you id is": id,
    "title": post.title,
    "content": post.content
  })
})

// POST から blogPostsに追加
app.post("/entry", async (c) => {
  const { title, content } = await c.req.json<{ title: string, content: string }>()
  blogPosts.push({ id: String(blogPosts.length + 1), title, content })
  // 0から始まるため-1をして新しいpostを取得
  const newPost = blogPosts[blogPosts.length - 1]
  return c.json({
    "new post": newPost
  }, 201)
})

export default app