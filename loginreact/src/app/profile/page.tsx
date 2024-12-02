"use client";

import useAuth from "@/hooks/useAuth";
import ProfileTop from "@/components/profileTop";
import ProfileSecond from "@/components/profileSecond";
import ProfileNoPost from "@/components/ProfileNoPost";
import Introduce from "@/components/Introduce";
import MainHeader from "@/components/MainHeader";
import MainFooter from "@/components/MainFooter";
import Contents from "@/components/contents";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal"; // モーダルウィンドウ
import ChengeProfile from "@/components/Modal/ChangeProfile";

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

  // モーダルウィンドウの制御
  const [isViewable, setIsViewable] = useState(false);

  // モーダルを開くための関数
  const openModal = () => {
    setIsViewable(true);
  };

  // モーダルを閉じるための関数
  const closeModal = () => {
    setIsViewable(false);
  };

  return (
    <div className="w-full h-screen">
      <header className="fixed top-0 left-0 right-0 z-10">
        <MainHeader />
      </header>

      <div className="w-full pt-24 pb-32">
        <ProfileTop openModal={openModal} />
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
            <ProfileNoPost />
          </div> // 投稿が見つからない場合の表示
        )}
      </div>

      <footer className="fixed bottom-0 left-0 right-0">
        <MainFooter />
      </footer>

      {isViewable && (
        <Modal closeModal={closeModal}>
          <ChengeProfile closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default Profile;
