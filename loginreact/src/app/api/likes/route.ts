import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

export async function POST(req: Request) {
  const { userId, postId } = await req.json();

  try {
    // 既に「いいね」しているか確認
    const { data: existingLike } = await supabase
      .from("likes")
      .select("*")
      .eq("user_id", userId)
      .eq("post_id", postId)
      .single();

    if (existingLike) {
      return NextResponse.json(
        { message: "既にいいねしています" },
        { status: 400 }
      );
    }

    // 「いいね」を追加
    const { error } = await supabase
      .from("likes")
      .insert({ user_id: userId, post_id: postId });

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "いいねが追加されました" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "エラーが発生しました" },
      { status: 500 }
    );
  }
}
