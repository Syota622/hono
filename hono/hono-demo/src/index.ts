import { Hono } from 'hono'

import { prettyJSON } from "hono/pretty-json";

let blogPosts = [
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

const app = new Hono();
app.use("*", prettyJSON());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

// blogPostsからtitle、contentを取得して返す
app.get("/entry/:id", (c) => {
  const id = c.req.param("id");
  const post = blogPosts.find((post) => post.id === id);
  if (!post) {
    return c.json({
      "error": "post not found"
    }, 404);
  }
  return c.json({
    "you id is": id,
    "title": post.title,
    "content": post.content
  });
});

export default app
