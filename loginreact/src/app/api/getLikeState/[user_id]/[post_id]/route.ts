import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

export async function GET(
  req: Request,
  { params }: { params: Promise<Record<string, number>> }
) {
  const resolvedParams = await params; // Promiseを解決
  const user_id = resolvedParams.user_id;
  const post_id = resolvedParams.post_id;
  try {
    if (!user_id || !post_id) {
      return NextResponse.json(
        { error: "user_idとpost_idが存在しません" },
        { status: 400 }
      );
    }

    const { data: fetchData, error: fetchError } = await supabase
      .from("likes")
      .select("*")
      .eq("user_id", user_id)
      .eq("post_id", post_id)
      .maybeSingle();

    if (fetchError) {
      if (fetchError.code !== "PGRST116") {
        return NextResponse.json(
          { error: "Supabaseのデータの取得中にエラーが発生しました" },
          { status: 500 }
        );
      }
      // "PGRST116" は「データが存在しない」エラーなので、その場合は正常なレスポンスを返す
      return NextResponse.json({ isLiked: false }, { status: 200 });
    }
    // ここでデータを送信する
    if (fetchData) {
      return NextResponse.json({ isLiked: true }, { status: 200 }); // `true` を返す
    } else {
      return NextResponse.json({ isLiked: false }, { status: 200 }); // `false` を返す
    }
  } catch {
    return NextResponse.json(
      { error: "予期しないエラーが発生しました" },
      { status: 500 }
    );
  }
}
