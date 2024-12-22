"use client";

import ProfileTopOther from "@/components/profile/ProfileTopOther";
import ProfileSecondOther from "@/components/profile/profileSecondOther";
import ProfileNoPost from "@/components/profile/ProfileNoPost";
import Introduce from "@/components/Introduce";
import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";
import Contents from "@/components/contents";
import { supabase } from "@/services/supabaseClient";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "next/navigation";

// Post型の定義
interface Post {
  id: number;
  proverb: string;
  explanation?: string;
  created_at: string;
  userid: string;
  good: number;
  comment: number;
}

const Profile = () => {
  const params = useParams();
  const userId = params.userId;

  const [posts, setPosts] = useState<Post[]>([]); // 投稿の配列を管理
  const [loading, setLoading] = useState(true); // ローディング状態を管理
  const [pushFollow, setPushFollow] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      if (userId) {
        const { data, error } = await supabase
          .from("posts")
          .select("*") // 投稿のすべてのフィールドを取得
          .eq("userid", userId); // userIdに基づいて投稿を取得

        if (error) {
          console.error("Error fetching posts:", error);
        } else {
          console.log("Fetched posts:", data);
          setPosts(data as Post[]); // 取得した投稿の配列をセット
        }
        setLoading(false); // ローディングを終了
      }
    };

    fetchPosts();
  }, [userId]);

  const [isFollow, setIsFollow] = useState(false);

  if (typeof userId !== "string") return;

  return (
    <div className="w-full h-screen">
      <header className="fixed top-0 left-0 right-0 z-10">
        <MainHeader />
      </header>

      <div className="w-full pt-24 pb-32">
        <ProfileTopOther
          userId={userId}
          isFollow={isFollow}
          setIsFollow={setIsFollow}
          setPushFollow={setPushFollow}
        />
        {userId ? (
          <ProfileSecondOther userId={userId} pushFollow={pushFollow} />
        ) : (
          <div>Loading...</div> // ローディング中の表示
        )}
        {userId ? (
          <Introduce userId={userId} />
        ) : (
          <div>Loading...</div> // ローディング中の表示
        )}
        {loading ? (
          <div>Loading...</div> // ローディング中の表示
        ) : posts.length > 0 ? ( // 投稿があるか確認
          <>
            {posts.map((post) => (
              <Contents key={post.id} postId={post.id} /> // 取得した各投稿のpostIdをContentsに渡す
            ))}
          </>
        ) : (
          <div className="flex items-center justify-center">
            <ProfileNoPost />
          </div> // 投稿が見つからない場合の表示
        )}
      </div>

      <footer className="fixed bottom-0 left-0 right-0">
        <MainFooter />
      </footer>
    </div>
  );
};

export default Profile;
