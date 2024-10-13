import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  // Supabaseからユーザーを取得
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  if (error || !users || users.length === 0) {
    return NextResponse.json(
      { success: false, message: "メールアドレスが無効です" },
      { status: 401 }
    );
  }

  const user = users[0];

  // パスワードのチェック
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    return NextResponse.json({ success: true, message: "ログイン成功" });
  } else {
    return NextResponse.json(
      { success: false, message: "パスワードが間違っています" },
      { status: 401 }
    );
  }
}
