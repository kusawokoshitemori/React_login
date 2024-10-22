"use client";

import { useState } from "react";
import Contents from "@/components/contents";
import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";

const Main = () => {
  // おすすめの投稿のIDを格納する配列
  const [recommendedPosts, setRecommendedPosts] = useState<number[]>([4, 3]); // 初期値として[4, 3]を設定

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
