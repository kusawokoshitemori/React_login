// src/app/api/follows/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  //フォローの数を返す
  const { count: followCount, error: followError } = await supabase
    .from("follows")
    .select("*", { count: "exact" })
    .eq("follower_id", userId);

  //フォロワーの数を返す
  const { count: followersCount, error: followersError } = await supabase
    .from("follows")
    .select("*", { count: "exact" }) // フォロワー数をカウント
    .eq("followee_id", userId);

  //エラーチェック
  if (followersError || followError) {
    return NextResponse.json(
      {
        success: false,
        message: followersError?.message || followError?.message,
      },
      { status: 400 }
    );
  }

  return NextResponse.json({ userId, followersCount, followCount });
}
