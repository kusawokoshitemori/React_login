import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";
import { generateToken } from "../../utils/auth";

export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    // ユーザー情報をSupabaseから取得
    const { data, error } = await supabase
      .from("users")
      .select("id, email, name")
      .eq("email", email)
      .single();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json(
        { message: "ユーザー情報の取得に失敗しました。" },
        { status: 500 }
      );
    }

    // トークン生成
    const token = generateToken({
      id: data.id,
      email: data.email,
      name: data.name,
    });

    return NextResponse.json({
      message: "トークンが正常に生成されました。",
      token,
    });
  } catch (err) {
    console.error("エラー:", err);
    return NextResponse.json(
      { message: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
