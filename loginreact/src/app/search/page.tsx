"use client";

import React, {
  useState,
  useRef,
  RefObject,
  useEffect,
  useCallback,
} from "react";
import Contents from "@/components/contents";
import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";
import { fetchLastPostId } from "../api/fetchLastpostId/route";
import useIntersectionObserver from "../utils/IntersectionObserver";
import useAuth from "@/hooks/useAuth";

const SearchScreen = () => {
  const PlayerUser = useAuth();
  const loaderRef = useRef<HTMLDivElement | null>(null); // Intersection Observer用
  const [newArrayLoading, setNewArrayLoading] = useState(false);

  // 最新のIdから配列を作る
  const [LastPost, setLastPost] = useState(3);
  useEffect(() => {
    const fetchPoatId = async () => {
      const latestPostId = await fetchLastPostId();
      setLastPost(latestPostId);
    };
    fetchPoatId();
  }, []);

  const generatePostIds = (startId: number, count: number) => {
    return Array.from({ length: count }, (_, i) => startId - i);
  };

  const [searchedPosts, setSearchedPosts] = useState<number[]>([]);
  useEffect(() => {
    console.log(LastPost);
    const newSearchArray = generatePostIds(LastPost, 5);
    setSearchedPosts(newSearchArray);
  }, [LastPost]);

  const fetchMorePosts = useCallback(() => {
    if (!searchedPosts || searchedPosts.length === 0) {
      console.log("searchedPosts が初期化されていません");
      return;
    }

    const lastId = searchedPosts[searchedPosts.length - 1];

    // lastIdが3より小さい場合は投稿を取得しない else文でこれ以上の投稿は見つかりませんとかやってもいいかも
    if (lastId >= 3) {
      const newPosts = generatePostIds(lastId - 1, 5); // さらに5件追加
      setSearchedPosts((prevPosts) => [...prevPosts, ...newPosts]);
      console.log(searchedPosts, "動いている");
    } else {
      console.log(searchedPosts, "動いてはない");
    }
  }, [searchedPosts]);

  useEffect(() => {
    if (searchedPosts.length == 0) {
      console.log(searchedPosts);
      fetchMorePosts();
    } else {
      console.log(searchedPosts, "ここ通った");
    }
  }, [searchedPosts, fetchMorePosts]);

  // Intersection Observerを使ってスクロールを検知
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMorePosts();
        }
      },
      {
        threshold: 0.5, // 要素が50%見えるまで待つ
      }
    );

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) observer.observe(currentLoaderRef);

    return () => {
      if (currentLoaderRef) observer.unobserve(currentLoaderRef);
      observer.disconnect();
    };
  }, [fetchMorePosts]);

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
  const elementRefs = useRef<RefObject<HTMLDivElement>[]>(
    searchedPosts.map(() => React.createRef<HTMLDivElement>())
  );

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

  setTimeout(() => {
    setNewArrayLoading(true);
  }, 2000);

  return (
    <div className="w-full h-screen">
      <header className="fixed top-0 left-0 right-0 z-10">
        <MainHeader />
      </header>

      {/* <div className="text-8xl">ロード中ロード中ロード中ロード中ロード中</div> */}

      <div className="pt-24 bg-yellow-50">
        {/* searchedPosts配列の各postIdに対してContentsコンポーネントを表示 */}
        {searchedPosts.map((postId, index) => (
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

      {/* <footer className="fixed bottom-0 left-0 right-0">
        <MainFooter />
      </footer> */}
    </div>
  );
};

export default SearchScreen;
