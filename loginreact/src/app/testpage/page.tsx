"use client";

import { useEffect } from "react";

// 一回だけデータを送る
let isRequesting = false;

const TestComponent = () => {
  useEffect(() => {
    const testFetch = async () => {
      if (isRequesting) return; // すでにリクエスト中なら戻る
      isRequesting = true;

      try {
        const response = await fetch("/api/seems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: 2, postId: 1 }),
        });

        // レスポンスのステータスコードを確認
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    testFetch();
  }, []);

  return <div>テスト実行中...</div>;
};

export default TestComponent;
