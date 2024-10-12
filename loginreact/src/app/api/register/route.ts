// // src/app/api/register/route.ts
// import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";
// import { db } from "@/lib/db";

// export async function POST(request: Request) {
//   const { name, email, password } = await request.json();

//   // パスワードをハッシュ化
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // ユーザー情報をデータベースに保存
//   try {
//     const newUser = await db.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });

//     return NextResponse.json({ message: "ユーザー登録が成功しました！" });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "ユーザー登録に失敗しました。" },
//       { status: 500 }
//     );
//   }
// }

//とりあえずの動作確認
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json(); // リクエストからJSONデータを取得
    console.log("受け取ったデータ:", JSON.stringify(data, null, 2)); // 受け取ったデータをコンソールに表示

    // 成功レスポンスを返す
    return NextResponse.json({ message: "データを受け取りました。" });
  } catch (error) {
    console.error("エラーが発生しました:", error); // エラーメッセージをコンソールに表示
    return NextResponse.json(
      { message: "データの受け取りに失敗しました。" },
      { status: 500 }
    );
  }
}
