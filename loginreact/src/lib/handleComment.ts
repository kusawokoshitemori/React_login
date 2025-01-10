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
      return;
    }
  } catch {}
};
