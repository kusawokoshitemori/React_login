import { useState, useEffect } from "react";

const usePlayerName = (userId: string) => {
  const [playerName, setPlayerName] = useState<string>("名無し");

  useEffect(() => {
    const fetchPlayerName = async () => {
      try {
        const response = await fetch(`/api/fetchName`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }), // userIdをリクエストボディに含める
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setPlayerName(data.name || "名無し");
      } catch (error) {
        console.error("名前を取得することに失敗しました:", error);
        setPlayerName("名無し");
      }
    };

    if (userId) {
      fetchPlayerName();
    }
  }, [userId]);

  return playerName;
};

export default usePlayerName;
