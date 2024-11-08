// おすすめの配列を送る
export const getRecommendedPosts = async () => {
  try {
    const response = await fetch("/api/getRecommendedPosts");
    if (!response.ok) {
      throw new Error(`HTTPエラー: ${response.status}`);
    }
    const data = await response.json();
    console.log("取得したデータ:", data);
    return data;
  } catch (error) {
    console.error("エラー:", error);
    return null;
  }
};
