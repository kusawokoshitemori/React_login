// ちゃんと投稿したコメントが表示できるかのテスト

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Postの型を定義
type Post = {
  id: number; // idは整数型であるためnumberに変更
  proverb: string; // ことわざ
  explanation: string | null; // 説明（nullも考慮）
  created_at: string; // 作成日時
  userid: string; // ユーザーID
  good: number; // いいねの数
  comment: number; // コメントの数
};

const FetchPosts = ({ userId }) => {
  const [posts, setPosts] = useState<Post[]>([]); // 投稿の状態を管理

  useEffect(() => {
    const fetchPosts = async () => {
      const ExchengeUserId = `user${userId}`;
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("userid", ExchengeUserId); // userIdを使用してフィルタリング

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        console.log("Fetched posts:", data);
        setPosts(data as Post[]); // 型アサーションを使用
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div>
      <h2>Posts from user4</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <p>{post.proverb}</p>
              <p>{post.explanation || "説明はありません。"}</p>{" "}
              {/* 説明がnullの場合の処理 */}
              <p>いいね: {post.good}</p> {/* いいねの数 */}
              <p>コメント: {post.comment}</p> {/* コメントの数 */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found for user4.</p>
      )}
    </div>
  );
};

export default FetchPosts;
