import { supabase } from "@/lib/supabaseClient";

// GETメソッド専用の関数
export async function GET(request) {
  console.log("リクエストを受信しました"); // このログが表示されるべきです

  // クエリパラメータを取得
  const url = new URL(request.url);
  const lastFetchedId = url.searchParams.get("lastFetchedId");

  let query;
  if (lastFetchedId === null || lastFetchedId === "null") {
    // lastFetchedIdがnullの場合は、最新の3件を取得
    query = supabase
      .from("posts")
      .select("id")
      .order("id", { ascending: false })
      .limit(3);
  } else {
    // lastFetchedIdが指定されている場合は、それより小さいIDを取得
    query = supabase
      .from("posts")
      .select("id")
      .lt("id", lastFetchedId)
      .order("id", { ascending: false })
      .limit(3);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching posts:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 }); // データをそのまま返す
}
