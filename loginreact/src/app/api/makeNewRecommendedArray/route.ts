import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .order("recommendScore", { ascending: false })
      .limit(1000);

    if (error) {
      console.error("データ取得エラー:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    // idだけを抽出して新しい配列を作成
    const idArray = data.map((post) => post.id);

    return new Response(JSON.stringify(idArray), { status: 200 });
  } catch (error) {
    console.error("サーバーエラー:", error);
    return new Response(JSON.stringify({ error: "サーバーエラー" }), {
      status: 500,
    });
  }
}
