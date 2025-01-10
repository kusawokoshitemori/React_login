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
      return;
    }

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
    } else {
    }
  } catch {}
};
