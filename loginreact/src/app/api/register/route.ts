import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  //ハッシュ化する
  const hashedPassword = await bcrypt.hash(password, 10);

  // ユーザー情報をSupabaseに追加
  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, password: hashedPassword }]);

  if (error) {
    // エラーコードが23505の場合、メールアドレスが重複している
    if (error.code === "23505") {
      return NextResponse.json(
        { message: "そのメールアドレスは既に登録されています。" },
        { status: 400 }
      );
    }

    console.error("Supabase Error:", error);
    return NextResponse.json(
      { message: "ユーザー登録に失敗しました。" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "ユーザー登録が成功しました！", data });
}
