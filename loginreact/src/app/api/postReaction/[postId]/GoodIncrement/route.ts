import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

// POSTメソッド用のハンドラーを名前付きエクスポートで定義
export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;

  if (!postId) {
    return NextResponse.json(
      { message: "Post ID is required" },
      { status: 400 }
    );
  }

  try {
    // `good` カウントを1増やす
    const { data, error: fetchError } = await supabase
      .from("posts")
      .select("good")
      .eq("id", postId)
      .single();

    if (fetchError) {
      console.error(fetchError);
      return NextResponse.json(
        { message: "Failed to fetch good count" },
        { status: 500 }
      );
    }

    const newGoodCount = (data?.good || 0) + 1;

    const { error: updateError } = await supabase
      .from("posts")
      .update({ good: newGoodCount })
      .eq("id", postId);

    if (updateError) {
      console.error(updateError);
      return NextResponse.json(
        { message: "Failed to increment good count" },
        { status: 500 }
      );
    }

    // 成功レスポンスを返す
    return NextResponse.json(
      { message: "Good count incremented successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
