import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

// パラメータをパスから取得
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

    // Supabaseからデータを取得
    const { data: fetchData, error: fetchError } = await supabase
      .from("users")
      .select("introduce")
      .eq("id", userId)
      .single();

    if (fetchError) {
      console.error("Supabaseのエラーが発生しました", fetchError.message);
      return NextResponse.json(
        { error: "Supabaseのデータの取得中にエラーが発生しました" },
        { status: 500 }
      );
    }

    // データを返却
    if (fetchData) {
      return NextResponse.json({
        success: true,
        introduce: fetchData.introduce,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "指定されたユーザーが見つかりません",
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
