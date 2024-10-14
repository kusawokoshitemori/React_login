// src/app/api/auth/user/route.ts

import { NextResponse } from "next/server";
import { getUserFromToken } from "../../../utils/auth"; // ヘルパー関数をインポート

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1]; // Bearerトークンを取得
  if (!token) {
    return NextResponse.json(
      { success: false, message: "トークンが必要です" },
      { status: 401 }
    );
  }

  const user = getUserFromToken(token); // トークンからユーザー情報を取得
  if (!user) {
    return NextResponse.json(
      { success: false, message: "無効なトークン" },
      { status: 401 }
    );
  }

  // ユーザー情報を返す
  return NextResponse.json({ success: true, user });
}
