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
      return;
    }
  } catch {}
};
