// いいねを1増やす機能
export const handleLike = async (userId: string, postId: number) => {
  try {
    // いいねを追加するリクエスト
    const response = await fetch("/api/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, postId }),
    });

    if (!response.ok) {
      console.error("いいねの追加に失敗しました");
      return;
    }

    console.log("いいねが追加されました");

    // `good`カウントを1増やすリクエスト
    const updateResponse = await fetch(
      `/api/postReaction/${postId}/GoodIncrement`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!updateResponse.ok) {
      console.error("投稿の`good`カウントを増やすのに失敗しました");
    } else {
      console.log("投稿の`good`カウントが1増えました");
    }
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
};
