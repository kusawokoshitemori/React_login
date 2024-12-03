import { supabase } from "@/services/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("id , created_at , good , comment");

    if (error) {
      console.error("データ取得エラー:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    // RecommendScoreの計算
    const updatedPosts = data.map((post) => {
      const { good, comment, created_at } = post;

      // ここにRecommendScoreの計算式を入れる
      const baseScore = good * 10 + comment * 5 + 15;

      const currentDate = new Date();
      const createdDate = new Date(created_at);
      const timeDifferenceInMs = currentDate.getTime() - createdDate.getTime();

      // n日たった
      const timeDifferenceInDays = timeDifferenceInMs / (1000 * 60 * 60 * 24);

      const timeFactor = 10 / (timeDifferenceInDays + 1);

      const recommendScore = baseScore * timeFactor;

      return { ...post, recommendScore };
    });

    // RecommendScoreをデータベースに保存
    for (const post of updatedPosts) {
      const { error: updateError } = await supabase
        .from("posts")
        .update({ recommendScore: post.recommendScore })
        .eq("id", post.id);

      if (updateError) {
        console.error("RecommendScore保存エラー:", updateError);
      }
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("サーバーエラー:", error);
    return new Response(JSON.stringify({ error: "サーバーエラー" }), {
      status: 500,
    });
  }
}
