import { supabase } from "@/services/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { PlayerUser, OtherUserId } = await req.json();

    // データベースから削除
    const { error } = await supabase
      .from("follows")
      .delete()
      .match({ follower_id: PlayerUser, followee_id: OtherUserId });

    if (error) {
      // エラーのレスポンスを返す
      return NextResponse.json(
        { error: "フォロー解除に失敗しました" },
        { status: 500 }
      );
    }

    // 正常なレスポンスを返す
    return NextResponse.json(
      { success: true, message: "フォロー解除に成功しました" },
      { status: 200 }
    );
  } catch {
    // エラーのレスポンスを返す
    return NextResponse.json(
      { error: "予期しないエラーが発生しました" },
      { status: 500 }
    );
  }
}
