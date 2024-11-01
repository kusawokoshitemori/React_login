"use client";

import React, { useState, useRef, RefObject, useEffect } from "react";
import Contents from "@/components/contents";
import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";
import useIntersectionObserver from "../utils/IntersectionObserver";
import useAuth from "@/hooks/useAuth";

const SearchScreen = () => {
  const PlayerUser = useAuth();
  // 新着順のIDを格納する配列
  const [searchedPosts, setSearchedPosts] = useState<number[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log("try動いた");
        // postsを取得するAPIをID降順で3件取得
        const response = await fetch("/api/new_arrival_order");
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }

        console.log("レスポンスにデータを入れる前だよ。");
        // データを入れる
        const data = await response.json();
        setSearchedPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };

    fetchPosts();
  }, []);

  const elementRefs = useRef<RefObject<HTMLDivElement>[]>(
    searchedPosts.map(() => React.createRef<HTMLDivElement>())
  );

  // seemsのAPIを呼び出す関数
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

      <div className="pt-24 pb-32 bg-pink-50">
        {/* searchedPosts配列の各postIdに対してContentsコンポーネントを表示 */}
        {searchedPosts.map((postId, index) => (
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

export default SearchScreen;
