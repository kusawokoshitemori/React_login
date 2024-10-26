"use client";

import React, { useState, useRef, RefObject } from "react";
import Contents from "@/components/contents";
import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";
import useIntersectionObserver from "../utils/IntersectionObserver";
import useAuth from "@/hooks/useAuth";

const Main = () => {
  const PlayerUser = useAuth();
  // おすすめの投稿のIDを格納する配列
  const [recommendedPosts, setRecommendedPosts] = useState<number[]>([4, 3]); // 初期値として[4, 3]を設定
  const elementRefs = useRef<RefObject<HTMLDivElement>[]>(
    recommendedPosts.map(() => React.createRef<HTMLDivElement>())
  );

  // APIを呼び出す関数
  const handleIntersection = async (userId: string, postId: number) => {
    try {
      const response = await fetch("/api/seems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, postId }),
      });

      if (!response.ok) {
        throw new Error("Failed to save to database");
      }

      const data = await response.json();
      console.log("データが保存されました:", data);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  // IntersectionObserver フックを使用
  useIntersectionObserver(elementRefs.current, (postId) => {
    if (PlayerUser) {
      // ユーザーが認証されている場合のみ
      handleIntersection(PlayerUser.id, postId);
    } else {
      console.error("ユーザーが認証されていないため、データを保存できません。");
    }
  });

  return (
    <div className="w-full">
      <MainHeader />
      {/* recommendedPosts配列の各postIdに対してContentsコンポーネントを表示 */}
      {recommendedPosts.map((postId, index) => (
        <Contents
          key={postId}
          postId={postId}
          ref={elementRefs.current[index]}
        />
      ))}
      <MainFooter />
    </div>
  );
};

export default Main;
