"use client";

import React, { useState, useRef, RefObject, useEffect } from "react";
import Contents from "@/components/contents";
import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";
import { getRecommendedPosts } from "@/lib/getRecommendedPosts";
import { saveRecommendPosts } from "@/lib/saveRecommendPosts";
import useIntersectionObserver from "../utils/IntersectionObserver";
import { isTimeExceeded } from "../utils/timeUtils";
import useAuth from "@/hooks/useAuth";

const Main = () => {
  const PlayerUser = useAuth();
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null); // Intersection Observer用

  // おすすめの投稿のIDを格納する配列
  const [recommendedPosts, setRecommendedPosts] = useState<number[]>([]); // 初期値
  const [recommendedPostsTime, setRecommendedPostsTime] = useState<
    string | undefined
  >(undefined);

  // おすすめの投稿のIDを取得するコード
  useEffect(() => {
    const getPosts = async () => {
      const response = await getRecommendedPosts();
      const data = response?.[0];

      // 配列と時間データの取得
      const recommendArray = data?.recommend_array;
      const createdAt = data?.created_at;

      if (recommendArray && Array.isArray(recommendArray) && createdAt) {
        setRecommendedPosts(recommendArray); // データが取得できた場合、状態を更新
        setRecommendedPostsTime(createdAt);
        console.log("おすすめ投稿:", recommendArray);
        console.log("取得時間:", createdAt);
      } else {
        console.log("投稿の取得に失敗しました"); // エラーがあった場合、エラーメッセージを設定
      }

      // ここにおすすめの投稿の配列を作るやつ
      if (createdAt && isTimeExceeded(createdAt)) {
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
          }
        };
        saveRecommendScore();

        // 新しいおすすめ投稿の配列を生成
        const makeNewRecommendedArray = async () => {
          try {
            const response = await fetch("/api/makeNewRecommendedArray", {
              method: "GET",
            });

            if (!response.ok) {
              throw new Error("APIリクエストが失敗しました");
            }
            const result = await response.json();
            console.log("makeNewRecommendedArray結果:", result);
          } catch (error) {
            console.error(error);
          }
        };
        makeNewRecommendedArray();
        const newRecommendArray = [1, 2, 3, 4]; // ここは動的に生成するロジックに変更可能

        setRecommendedPosts(newRecommendArray);
      }
      console.log("createdAt : " + createdAt);
      setLoading(false);
    };
    getPosts();
  }, []); // 初回レンダリング時に一度だけ実行

  // ここに配列のAPI送るやつ作ろうか
  useEffect(() => {
    if (!loading) {
      const fetchData = async () => {
        await saveRecommendPosts(recommendedPosts); // おすすめの関数を送信
      };
      fetchData();
    }
  }, [loading, recommendedPosts]);

  const [displayedPosts, setDisplayedPosts] = useState<number[]>(
    recommendedPosts.slice(0, 3)
  ); // 最初の3件を表示

  // 画面の配列に追加する関数
  const fetchMorePosts = () => {
    const currentLength = displayedPosts.length;

    // 追加する分のデータがまだ残っているか確認
    if (currentLength < recommendedPosts.length) {
      const nextPosts = recommendedPosts.slice(
        currentLength,
        currentLength + 3
      ); // 次の3件を取得
      setDisplayedPosts((prevPosts) => [...prevPosts, ...nextPosts]); // 3件ずつ追加
    } else {
      console.log("これ以上の投稿はありません");
    }
  };
  const elementRefs = useRef<RefObject<HTMLDivElement>[]>(
    recommendedPosts.map(() => React.createRef<HTMLDivElement>())
  );

  // Intersection Observerを使ってスクロールを検知
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMorePosts();
      }
    });

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) observer.observe(currentLoaderRef);

    return () => {
      if (currentLoaderRef) observer.unobserve(currentLoaderRef);
      observer.disconnect();
    };
  }, [loaderRef.current]);

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

      {/* スクロール検知用のローダー要素 */}
      <div ref={loaderRef} className="pb-32">
        Loading...
      </div>

      <footer className="fixed bottom-0 left-0 right-0">
        <MainFooter />
      </footer>
    </div>
  );
};

export default Main;
