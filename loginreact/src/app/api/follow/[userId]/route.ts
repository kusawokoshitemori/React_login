// src/app/api/follows/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

// NextRequestをインポート
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest, // NextRequestを使う
  { params }: { params: { userId: string } } // paramsを第二引数から取得
) {
  try {
    const { userId } = params; // paramsからuserIdを取得

    if (!userId) {
      return NextResponse.json(
        { error: "userIdが指定されていません" },
        { status: 400 }
      );
    }

    // フォローの数を返す
    const { count: followCount, error: followError } = await supabase
      .from("follows")
      .select("*", { count: "exact" })
      .eq("follower_id", userId);

    if (followError) {
      console.error("Supabaseのエラーが発生しました", followError.message);
      return NextResponse.json(
        { error: "フォロー数の取得中にエラーが発生しました" },
        { status: 500 }
      );
    }

    // フォロワーの数を返す
    const { count: followersCount, error: followersError } = await supabase
      .from("follows")
      .select("*", { count: "exact" }) // フォロワー数をカウント
      .eq("followee_id", userId);

    if (followersError) {
      console.error("Supabaseのエラーが発生しました", followersError.message);
      return NextResponse.json(
        { error: "フォロワー数の取得中にエラーが発生しました" },
        { status: 500 }
      );
    }

    // ここでデータを送信する
    if (followCount && followersCount) {
      return NextResponse.json({
        success: true,
        followCount,
        followersCount,
      });
    }
  } catch (error) {
    console.error("予期しないエラーが発生しました", error);
    return NextResponse.json(
      { error: "予期しないエラーが発生しました" },
      { status: 500 }
    );
  }
}