import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

// POSTメソッド用のハンドラーを名前付きエクスポートで定義
export async function POST(
  req: Request,
  { params }: { params: Promise<Record<string, string>> }
) {
  const resolvedParams = await params;
  const postId = resolvedParams.postId;

  if (!postId) {
    return NextResponse.json(
      { message: "Post ID is required" },
      { status: 400 }
    );
  }

  try {
    // `comment` カウントを1増やす
    const { data, error: fetchError } = await supabase
      .from("posts")
      .select("comment")
      .eq("id", postId)
      .single();

    if (fetchError) {
      console.error(fetchError);
      return NextResponse.json(
        { message: "postsテーブルのcommentを取れなかった" },
        { status: 500 }
      );
    }

    const newCommentCount = (data?.comment || 0) + 1;

    const { error: updateError } = await supabase
      .from("posts")
      .update({ comment: newCommentCount })
      .eq("id", postId);

    if (updateError) {
      console.error(updateError);
      return NextResponse.json(
        { message: "コメントの数を増やせなかった" },
        { status: 500 }
      );
    }

    // 成功レスポンスを返す
    return NextResponse.json(
      { message: "コメントの数増やせた" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "コメント増やす時にエラー" },
      { status: 500 }
    );
  }
}
