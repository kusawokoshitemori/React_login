import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

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

  return NextResponse.json({ success: true, introduce: data?.introduce });
}
