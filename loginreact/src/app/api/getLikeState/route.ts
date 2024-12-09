import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const post_id = searchParams.get("post_id");

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
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Supabaseのエラーが発生しました", fetchError.message);
      return NextResponse.json(
        { error: "Supabaseのデータの取得中にエラーが発生しました" },
        { status: 500 }
      );
    }

    // ここでデータを送信する
    if (fetchData) {
      return NextResponse.json({ isLiked: true }, { status: 200 }); // `true` を返す
    } else {
      return NextResponse.json({ isLiked: false }, { status: 200 }); // `false` を返す
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "予期しないエラーが発生しました" },
      { status: 500 }
    );
  }
}
