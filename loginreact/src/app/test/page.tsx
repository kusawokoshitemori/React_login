"use client";

// ExampleButton.tsx

import { useState } from "react";

const ExampleButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const saveRecommendScore = async () => {
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
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  saveRecommendScore();

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? "処理中..." : "スコア計算"}
      </button>
    </div>
  );
};

export default ExampleButton;
