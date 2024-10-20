"use client";

import useAuth from "@/hooks/useAuth";
import ProfileTop from "@/components/profileTop";
import ProfileSecond from "@/components/profileSecond";
import Introduce from "@/components/Introduce";
import Contents from "@/components/contents"; // 修正：コンポーネント名の修正
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

// Post型の定義
interface Post {
  id: number;
  proverb: string;
  explanation?: string;
  created_at: string; // 日時の型を指定
  userid: string;
  good: number;
  comment: number;
}

const Profile = () => {
  const user = useAuth();
  const [posts, setPosts] = useState<Post[]>([]); // 投稿の配列を管理
  const [loading, setLoading] = useState(true); // ローディング状態を管理

  useEffect(() => {
    const fetchPosts = async () => {
      if (user?.id) {
        const { data, error } = await supabase
          .from("posts")
          .select("*") // 投稿のすべてのフィールドを取得
          .eq("userid", user.id); // user.idに基づいて投稿を取得

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
  }, [user]);

  return (
    <div className="w-full">
      <ProfileTop />
      {user?.id ? (
        <ProfileSecond userId={user.id} />
      ) : (
        <div>Loading...</div> // ローディング中の表示
      )}
      {user?.id ? (
        <Introduce userId={user.id} />
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
          まだ投稿がありません
        </div> // 投稿が見つからない場合の表示
      )}
    </div>
  );
};

export default Profile;
