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
      return;
    }
  } catch {}
};
