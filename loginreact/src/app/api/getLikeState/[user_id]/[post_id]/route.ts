import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

export async function GET(
  req: Request,
  { params }: { params: { user_id: number; post_id: number } }
) {
  try {
    const user_id = params.user_id;
    const post_id = params.post_id;

    if (!user_id || !post_id) {
      return NextResponse.json(
        { error: "user_idとpost_idが存在しません" },
        { status: 400 }
      );
    }

    const { data: fetchData, error: fetchError } = await supabase
      .from("likes")
      .select("*")
      .eq("user_id", user_id)
      .eq("post_id", post_id);
    // .single();

    if (fetchError) {
      if (fetchError.code !== "PGRST116") {
        console.error("Supabaseのエラーが発生しました", fetchError.message);
        return NextResponse.json(
          { error: "Supabaseのデータの取得中にエラーが発生しました" },
          { status: 500 }
        );
      }
      console.log("!!!!!データが存在しない");
      console.error("Error occurred:", fetchError.message);
      console.log("Returned data:", fetchData);
      // "PGRST116" は「データが存在しない」エラーなので、その場合は正常なレスポンスを返す
      return NextResponse.json({ isLiked: false }, { status: 200 });
    }
    // ここでデータを送信する
    if (fetchData && fetchData.length > 0) {
      console.log("イイねされてるはず");
      console.log("Returned data:", fetchData);
      return NextResponse.json({ isLiked: true }, { status: 200 }); // `true` を返す
    } else {
      console.log("イイねされてないはず");
      return NextResponse.json({ isLiked: false }, { status: 200 }); // `false` を返す
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "予期しないエラーが発生しました" },
      { status: 500 }
    );
  }
}
