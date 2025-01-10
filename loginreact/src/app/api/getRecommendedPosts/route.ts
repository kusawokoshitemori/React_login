import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("recommend_post")
      .select("recommend_array , created_at")
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch {
    return new NextResponse(JSON.stringify({ error: "サーバーエラー" }), {
      status: 500,
    });
  }
}
