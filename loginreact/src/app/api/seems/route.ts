import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

export async function POST(req: Request) {
  try {
    const { user_id, post_id } = await req.json();

    if (!user_id || !post_id) {
      return NextResponse.json(
        { error: "user_idとpost_idが存在しません" },
        { status: 400 }
      );
    }

    // `user_id`と`post_id`でレコードを検索
    const { data: fetchData, error: fetchError } = await supabase
      .from("seems")
      .select("*")
      .eq("user_id", user_id)
      .eq("post_id", post_id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return NextResponse.json(
        { error: "データの取得中にエラーが発生しました。" },
        { status: 500 }
      );
    }

    if (fetchData) {
      // 既存のレコードがある場合は`viewed_at`を更新
      const { error: updateError } = await supabase
        .from("seems")
        .update({ viewed_at: new Date() })
        .eq("user_id", user_id)
        .eq("post_id", post_id);

      if (updateError) {
        return NextResponse.json(
          { error: "viewed_atの更新中にエラーが発生しました。" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: "viewed_atが更新されました。" },
        { status: 200 }
      );
    } else {
      // 既存のレコードがない場合は新規レコードを作成
      const { error: insertError } = await supabase
        .from("seems")
        .insert([{ user_id, post_id, viewed_at: new Date() }]);

      if (insertError) {
        return NextResponse.json(
          { error: "新規レコードの挿入中にエラーが発生しました。" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: "新しいレコードが作成されました。" },
        { status: 201 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "予期しないエラーが発生しました。" },
      { status: 500 }
    );
  }
}
