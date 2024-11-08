// おすすめの配列を保存する機能
export const saveRecommendPosts = async (recommendArray) => {
  // 配列を保存するリクエスト
  try {
    const saveArray = await fetch("/api/saveRecommendPosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recommendArray: recommendArray }),
    });

    if (!saveArray.ok) {
      console.error("おすすめの配列を保存することに失敗しました");
    } else {
      console.log("おすすめの配列を保存できました:");
    }
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
};
