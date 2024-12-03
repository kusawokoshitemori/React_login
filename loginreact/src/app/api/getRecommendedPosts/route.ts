import { supabase } from "@/services/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("recommend_post")
      .select("recommend_array , created_at")
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("データ取得エラー:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("サーバーエラー:", error);
    return new Response(JSON.stringify({ error: "サーバーエラー" }), {
      status: 500,
    });
  }
}
