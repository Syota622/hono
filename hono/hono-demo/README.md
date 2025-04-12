```
npm install
npm run dev
```

```
npm run deploy
```

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