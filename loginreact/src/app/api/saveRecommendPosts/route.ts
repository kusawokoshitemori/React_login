import { supabase } from "@/services/supabaseClient";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { recommendArray } = body;

    if (!recommendArray) {
      return new Response(JSON.stringify({ error: "配列がありません" }), {
        status: 400,
      });
    }

    const { data, error } = await supabase.from("recommend_post").insert([
      {
        recommend_array: recommendArray,
      },
    ]);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }
    return new Response(JSON.stringify(data), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "サーバーエラー" }), {
      status: 500,
    });
  }
}
