import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userIdが指定されていません" },
        { status: 400 }
      );
    }

    const { data: fetchData, error: fetchError } = await supabase
      .from("users")
      .select("introduce")
      .eq("id", userId)
      .single(); // 一つだけのデータを期待

    if (fetchError) {
      console.error("Supabaseのエラーが発生しました", fetchError.message);
      return NextResponse.json(
        { error: "Supabaseのデータの取得中にエラーが発生しました" },
        { status: 500 }
      );
    }
    // ここでデータを送信する
    if (fetchData) {
      return NextResponse.json({
        success: true,
        introduce: fetchData.introduce,
      });
    } else {
      return NextResponse.json({ success: false, message: "userIdが必要です" });
    }
  } catch (error) {
    console.error("予期しないエラーが発生しました", error);
    return NextResponse.json(
      { error: "予期しないエラーが発生しました" },
      { status: 500 }
    );
  }
}
