"use client";

// ExampleButton.tsx

import { useState } from "react";

const ExampleButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/saveRecommendScore", {
        method: "GET", // POSTでもOK、データが必要ならbodyで渡す
      });

      if (!response.ok) {
        throw new Error("APIリクエストが失敗しました");
      }

      const result = await response.json();
      console.log("結果:", result);
    } catch (error) {
      setError("エラーが発生しました");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? "処理中..." : "スコア計算"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default ExampleButton;
