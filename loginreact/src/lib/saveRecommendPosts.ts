// おすすめの配列を保存する機能
export const saveRecommendPosts = async (recommendArray) => {
  console.log("送信するおすすめ配列:", recommendArray);
  // 配列を保存するリクエスト
  try {
    const saveArray = await fetch("/api/saveRecommendPosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recommendArray: recommendArray }),
    });

    const responseData = await saveArray.json();
    if (!saveArray.ok) {
      console.error("おすすめの配列を保存することに失敗しました");
    } else {
      console.log("おすすめの配列を保存できました:", responseData);
    }
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
};
