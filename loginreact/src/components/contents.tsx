"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Post {
  id: number;
  proverb: string;
  explanation: string | null;
  created_at: string;
  userid: string;
  good: number;
  comment: number;
}
interface User {
  id: number; // ユーザーのID
  name: string; // 名前
}

const Contents = ({ postId }) => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [post, setPost] = useState<Post | null>(null); //投稿,名前を管理
  const [user, setUser] = useState<User | null>(null);

  const toggleAccordion = () => {
    setIsOpenDetail(!isOpenDetail);
  };

  useEffect(() => {
    const fetchPostById = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single(); // 特定の投稿を取得

      if (error) {
        console.error("Error fetching post:", error);
      } else {
        console.log("Fetched post:", data);
        setPost(data as Post);
        // useridを使用してnameを取り出す
        fetchUserById(data.userid);
      }
    };
    // nameを取り出す関数
    const fetchUserById = async (userId: string) => {
      const { data, error } = await supabase
        .from("users")
        .select("name")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user:", error);
      } else {
        console.log("Fetched user:", data);
        setUser(data as User);
      }
    };

    if (postId) {
      fetchPostById();
    }
  }, [postId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-5/6 mx-auto my-2 border-4 rounded-lg border-blue-300">
      <div className="w-full flex items-center border-b-4 border-green-500">
        <Image
          src="/karukaru.png"
          alt="test用画像"
          width={50}
          height={50}
          className="rounded-full mr-4 ml-1 m-1"
        />
        <p className="whitespace-nowrap text-lg">
          {user ? user.name : "名前を取得中..."}
        </p>
      </div>
      <p className="text-2xl sm:text-4xl flex items-center justify-center mt-2">
        {post.proverb}
      </p>
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
  );
};

export default Contents;
