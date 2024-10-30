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
  const [recommendedPosts, setRecommendedPosts] = useState<number[]>([
    4, 3, 2, 1,
  ]); // 初期値として[4, 3]を設定
  const elementRefs = useRef<RefObject<HTMLDivElement>[]>(
    recommendedPosts.map(() => React.createRef<HTMLDivElement>())
  );

  // APIを呼び出す関数
  const fetchIntersectionData = async (user_id: string, post_id: number) => {
    try {
      const response = await fetch("/api/seems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, post_id }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // IntersectionObserverフックを使用
  useIntersectionObserver(elementRefs.current, (postId) => {
    console.log("表示機能は動いたよ");
    if (!PlayerUser || !PlayerUser.id) {
      console.error("NULLだからログインしてねー");
      return; // PlayerUserがnullまたはIDがない場合は何もしない
    }
    const userId = PlayerUser.id;
    console.log(`userId: ${userId} postId: ${postId}`);

    // ここで直接APIを呼び出す
    fetchIntersectionData(userId, postId);
  });

  return (
    <div className="w-full h-screen">
      <header className="fixed top-0 left-0 right-0 z-10">
        <MainHeader />
      </header>

      <div className="pt-24 pb-32">
        {/* recommendedPosts配列の各postIdに対してContentsコンポーネントを表示 */}
        {recommendedPosts.map((postId, index) => (
          <Contents
            key={postId}
            postId={postId}
            ref={elementRefs.current[index]}
          />
        ))}
      </div>

      <footer className="fixed bottom-0 left-0 right-0">
        <MainFooter />
      </footer>
    </div>
  );
};

export default Main;
