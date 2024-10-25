"use client";

import React, { useEffect, useRef } from "react";
import Test from "@/components/testtest"; // Testコンポーネントをインポート

const TestComponent = () => {
  // Post ID の配列を定義
  const postIds = [1, 2, 3, 4, 5]; // 例として5つのPost IDを使用
  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 要素が10%出たらコールバック
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            console.log("要素が10%表示されました！"); // ログを出力
          }
        });
      },
      {
        threshold: [0.1],
      }
    );

    // 監視対象をチェック
    const currentElements = elementRefs.current;
    currentElements.forEach((currentElement) => {
      if (currentElement) {
        observer.observe(currentElement);
      }
    });

    // 監視対象から外す
    return () => {
      currentElements.forEach((currentElement) => {
        if (currentElement) {
          observer.unobserve(currentElement);
        }
      });
    };
  }, []);

  return (
    <div>
      <div className="text-8xl">
        下にスクロールすることを強く推奨しておりますがしてもしなくてもあなたの勝手なのでどちらでもいいです。しかし私の見解としては下にスクロールしたほうが楽しめるのではないかと考えております。
      </div>
      {postIds.map((postId, index) => (
        <Test
          key={postId}
          ref={(el) => {
            elementRefs.current[index] = el; // refを配列に保存
          }}
          postId={postId}
        />
      ))}
    </div>
  );
};

export default TestComponent;
