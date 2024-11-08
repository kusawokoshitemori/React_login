import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { recommendedPosts } = await req.json();
    console.log("受け取ったデータ:", recommendedPosts);
    const { data, error } = await supabase.from("recommend_post").insert([
      {
        recommend_array: recommendedPosts,
      },
    ]);

    if (error) {
      console.error("おすすめ配列のデータを送信するところでエラー:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
    console.log("データベースに保存しました:", data);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    // 例外エラーハンドリング
    console.error("サーバー側でエラーが発生しました:", error);
    return new Response(JSON.stringify({ error: "サーバーエラー" }), {
      status: 500,
    });
  }
}
