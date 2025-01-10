import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

export async function GET(
  req: Request,
  { params }: { params: Promise<Record<string, string>> }
) {
  const resolvedParams = await params;
  const userId = resolvedParams.userId;
  try {
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
      return NextResponse.json(
        { error: "フォロー数の取得中にエラーが発生しました" },
        { status: 500 }
      );
    }

    // フォロワーの数を返す
    const { count: followersCount, error: followersError } = await supabase
      .from("follows")
      .select("*", { count: "exact" })
      .eq("followee_id", userId);

    if (followersError) {
      return NextResponse.json(
        { error: "フォロワー数の取得中にエラーが発生しました" },
        { status: 500 }
      );
    }

    // フォロー数とフォロワー数を返す
    return NextResponse.json({
      success: true,
      followCount: followCount || 0, // null の場合 0 を返す
      followersCount: followersCount || 0,
    });
  } catch {
    return NextResponse.json(
      { error: "予期しないエラーが発生しました" },
      { status: 500 }
    );
  }
}
