import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

// POSTメソッドに対応する関数
export async function POST(req: Request) {
  try {
    const { proverb, explanation } = await req.json(); // リクエストのJSONデータをパース

    const { data, error } = await supabase
      .from("proverbs")
      .insert([{ proverb, explanation }]);

    if (error) {
      return NextResponse.json(
        { message: "投稿に失敗しました", error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "投稿が成功しました",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "予期しないエラーが発生しました", error },
      { status: 500 }
    );
  }
}
