import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json(); // リクエストボディをJSON形式で取得
  const { email, password } = body; // ボディからemailとpasswordを抽出

  // ここで認証処理を行う

  if (email === "test@example.com" && password === "password") {
    return NextResponse.json({ message: "ログイン成功" }); // 成功した場合
  } else {
    return NextResponse.json(
      { message: "メールアドレスまたはパスワードが無効です" },
      { status: 401 }
    );
  }
}
