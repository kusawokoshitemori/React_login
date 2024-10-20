"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Post {
  id: number; // 投稿のid(数字のみ)
  proverb: string; // ことわざ
  explanation: string | null; // 説明（nullも考慮）
  created_at: string; // 作成日時
  userid: string; // ユーザーID
  good: number; // いいねの数
  comment: number; // コメントの数
}

const Contents = ({ userId }) => {
  const [isOpenDetail, setIsOpenDetail] = useState(false); // ▷が押されたかのチェック
  const toggleAccordion = () => {
    setIsOpenDetail(!isOpenDetail);
  };

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

  // userIdから名前を取得する

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="w-5/6 mx-auto border-4 rounded-lg border-blue-300"
        >
          <div className="w-full flex items-center border-b-4 border-green-500">
            <Image
              src="/karukaru.png"
              alt="test用画像"
              width={50}
              height={50}
              className="rounded-full mr-4 ml-1 m-1"
            />
            <p className="whitespace-nowrap text-lg">ここに名前入る</p>
          </div>
          {/* 画面の大きさで文字の大きさ変えてるから注意 */}
          <p className="text-2xl sm:text-4xl flex items-center justify-center mt-2">
            {post.proverb}
          </p>
          {/* 詳細画面を表示する */}
          <div
            className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
              isOpenDetail ? "max-h-96" : "max-h-0"
            }`}
          >
            <p>{post.explanation || "詳細はありません。"}</p>
          </div>
          <div className="w-5/6 flex justify-between items-center mx-auto">
            <div className="flex items-center">
              <Image
                src="/heart_white.png"
                alt="ハートの画像"
                width={40}
                height={40}
                className="rounded-full mr-4 ml-1 m-1 w-auto h-auto"
              />
              <p className="text-lg">{post.good}</p>
            </div>
            <div className="flex items-center">
              <Image
                src="/comment_white.png"
                alt="コメントの画像"
                width={50}
                height={50}
                className="rounded-full mr-4 ml-1 m-1  w-auto h-auto"
              />
              <p className="text-lg">{post.comment}</p>
            </div>
            <div>
              <Image
                src="/right_arrow.png"
                alt="▷の画像"
                width={30}
                height={30}
                className={`rounded-full mr-4 ml-1 m-1 cursor-pointer transition-transform duration-500 ease-in-out ${
                  isOpenDetail ? "rotate-90" : "rotate-0"
                }`}
                onClick={toggleAccordion}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Contents;
