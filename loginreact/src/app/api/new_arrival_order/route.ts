import { supabase } from "@/lib/supabaseClient";

// POSTメソッド専用の関数
export async function GET() {
  console.log("リクエストを受信しました"); // このログが表示されるべきです

  // データの取得
  const { data, error } = await supabase
    .from("posts")
    .select("id") // IDだけを選択
    .order("id", { ascending: false }) // 降順でソート
    .limit(3); // リミットを3に設定

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  const postIds = data.map((post) => post.id);
  return new Response(JSON.stringify(postIds), { status: 200 });
}
