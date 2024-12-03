import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  // ユーザー情報を取得する
  const { data, error } = await supabase
    .from("users")
    .select("introduce")
    .eq("id", userId)
    .single(); // 一つだけのデータを期待

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
  // データが存在しない場合のハンドリング
  if (!data) {
    return NextResponse.json(
      { success: false, message: "ユーザーが見つかりません" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, introduce: data?.introduce });
}
