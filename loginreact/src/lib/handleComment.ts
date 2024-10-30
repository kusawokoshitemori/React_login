// handleComment.ts
export const handleComment = async (postId: number) => {
  try {
    // `comment`カウントを1増やすリクエスト
    const response = await fetch(
      `/api/postReaction/${postId}/CommentIncrement`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("投稿の`comment`カウントを増やすのに失敗しました");
      return;
    }

    console.log("投稿の`comment`カウントが1増えました");
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
};
