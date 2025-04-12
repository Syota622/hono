// app/routes/_index.jsx
import type { TypedResponse } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// サーバーサイドのデータロード
export async function loader(): Promise<TypedResponse<{ message: string }>> {
  return new Response(JSON.stringify({ message: "Hello from Remix!" }), {
    headers: { "Content-Type": "application/json" },
  });
}

// シンプルなコンポーネント
export default function Index() {
  const data = useLoaderData<typeof loader>();
  
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", textAlign: "center", marginTop: "100px" }}>
      <h1>{data.message}</h1>
      <p>This is a simple Remix page</p>
      <h1>{data.message}</h1>
      <p>This is a simple Remix page</p>
      <h1>{data.message}</h1>
      <p>This is a simple Remix page</p>
    </div>
  );
}