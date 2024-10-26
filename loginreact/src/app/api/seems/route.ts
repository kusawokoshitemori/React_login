import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { user_id, post_id } = await request.json();

    if (!user_id || !post_id) {
      return NextResponse.json(
        { error: "user_idとpost_idは必須です。" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("seems")
      .insert([{ user_id, post_id }]);

    if (error) {
      console.error("Supabase Error:", error.message, error.details);
      return NextResponse.json(
        { error: `データの挿入中にエラーが発生しました: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "データが正常に挿入されました。", data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected Error:", error);
    return NextResponse.json(
      { error: "データの挿入中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}
