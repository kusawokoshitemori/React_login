"use client";

import React, { useState, useRef, RefObject } from "react";
import Contents from "@/components/contents";
import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";
import useIntersectionObserver from "../utils/IntersectionObserver";

const Main = () => {
  // おすすめの投稿のIDを格納する配列
  const [recommendedPosts, setRecommendedPosts] = useState<number[]>([4, 3]); // 初期値として[4, 3]を設定
  const elementRefs = useRef<RefObject<HTMLElement>[]>(
    recommendedPosts.map(() => React.createRef<HTMLElement>())
  );

  // IntersectionObserver フックを使用
  useIntersectionObserver(elementRefs.current, () =>
    console.log("要素が10%表示されました！")
  );

  return (
    <div className="w-full">
      <MainHeader />
      {/* recommendedPosts配列の各postIdに対してContentsコンポーネントを表示 */}
      {recommendedPosts.map((postId) => (
        <Contents key={postId} postId={postId} />
      ))}
      <MainFooter />
    </div>
  );
};

export default Main;
