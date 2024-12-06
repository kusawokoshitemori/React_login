// フォロー外すAPIを送る
export const handleRemoveFollow = async (
  PlayerUser: string,
  OtherUserId: string
) => {
  try {
    const response = await fetch("/api/removeFollow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ PlayerUser, OtherUserId }),
    });

    if (!response.ok) {
      console.log("フォローを外すのに失敗しました");
      return;
    }
    console.log("フォローを外しました");
  } catch (error) {
    console.error("エラーが発生しました", error);
  }
};
