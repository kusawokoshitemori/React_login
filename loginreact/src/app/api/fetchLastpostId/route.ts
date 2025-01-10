import { supabase } from "@/services/supabaseClient";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("posts")
    .select("id")
    .order("id", { ascending: false })
    .limit(1);

  if (error) {
    return NextResponse.json(
      { error: "最新の投稿IDを取得できませんでした。" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    lastPostId: data && data.length > 0 ? data[0].id : null,
  });
}
