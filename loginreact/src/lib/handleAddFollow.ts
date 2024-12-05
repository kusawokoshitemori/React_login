// フォローするやつ
export const handleAddFollow = async (
  PlayerUser: string,
  OtherUserId: string
) => {
  try {
    const response = await fetch("/api/AddFollow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ PlayerUser, OtherUserId }),
    });

    if (!response.ok) {
      console.log("フォローの追加に失敗しました");
      return;
    }
    console.log("フォローしました");
  } catch (error) {
    console.error("エラーが発生しました", error);
  }
};
