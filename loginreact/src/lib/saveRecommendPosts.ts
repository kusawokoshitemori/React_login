// おすすめの配列を保存する機能
export const saveRecommendPosts = async (recommendArray: number[]) => {
  // 配列を保存するリクエスト
  try {
    const saveArray = await fetch("/api/saveRecommendPosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recommendArray }),
    });

    if (!saveArray.ok) {
    } else {
    }
  } catch {}
};
