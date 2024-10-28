"use client";

import Image from "next/image";
import { useEffect, useState, forwardRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import CommentSection from "./CommentSection";
import useAuth from "@/hooks/useAuth";

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

// ClickHeartを別のとこで定義したほうがきれいなコードになるかも

const Contents = forwardRef<HTMLDivElement, { postId: number }>(
  ({ postId }, ref) => {
    const PlayerUser = useAuth();
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const [isOpenComment, setIsOpenComment] = useState(false);
    const [post, setPost] = useState<Post | null>(null); // 投稿, 名前を管理
    const [user, setUser] = useState<User | null>(null);
    const [comments, setComments] = useState<{ content: any }[]>([]);

    const ClickArrow = () => {
      setIsOpenDetail(!isOpenDetail);
    };
    const ClickComment = () => {
      setIsOpenComment(!isOpenComment);
    };

    useEffect(() => {
      const fetchData = async () => {
        if (!postId) return;

        try {
          // 特定の投稿を取得
          const { data: postData, error: postError } = await supabase
            .from("posts")
            .select("*")
            .eq("id", postId)
            .single();

          if (postError) {
            console.error("Error fetching post:", postError);
            return;
          }

          console.log("Fetched post:", postData);
          setPost(postData as Post);

          // ユーザー名を取得
          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("name")
            .eq("id", postData.userid)
            .single();

          if (userError) {
            console.error("Error fetching user:", userError);
          } else {
            console.log("Fetched user:", userData);
            setUser(userData as User);
          }

          // コメントを取得
          const { data: commentsData, error: commentsError } = await supabase
            .from("comments")
            .select("content")
            .eq("post_id", postId);

          if (commentsError) {
            console.error("Error fetching comments:", commentsError);
            return;
          }

          setComments(commentsData);
        } catch (error) {
          console.error("Error in fetchData:", error);
        }
      };

      fetchData();
    }, [postId]);

    if (!post) {
      return <p>Loading...</p>;
    }

    // いいね機能
    const ClickHeart = async (userId, postId) => {
      if (!userId) {
        userId = PlayerUser ? PlayerUser.id : null; // 引数がnullの場合のみ設定 ここがおかしくなるかも
      } // PlayerUserがnullの場合はnullを代入

      if (!userId) {
        console.error("ユーザーが認証されていないか、IDが取得できません。");
        return; // ユーザーが認証されていない場合は処理を中止
      }

      try {
        const response = await fetch("/api/likes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, postId }),
        });

        if (response.ok) {
          console.log("いいねが追加されました");

          // ここでpostsテーブルの`good`カウントを1増やすリクエストを追加
          const updateResponse = await fetch(
            `/api/postReaction/${postId}/GoodIncrement`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (updateResponse.ok) {
            console.log("投稿の`good`カウントが1増えました");
          } else {
            console.error("投稿の`good`カウントを増やすのに失敗しました");
          }
          // ここまで
        } else {
          console.error("いいねの追加に失敗しました");
        }
      } catch (error) {
        console.error("エラーが発生しました:", error);
      }
    };

    return (
      <div
        ref={ref}
        id={`post-${postId}`}
        className="w-5/6 mx-auto my-2 border-4 rounded-lg border-blue-300"
      >
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
              onClick={() => ClickHeart(PlayerUser.id, post.id)}
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
              onClick={ClickComment}
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
              onClick={ClickArrow}
            />
          </div>
        </div>
        {/* コメントを出す */}
        {isOpenComment && (
          <CommentSection comments={comments} postId={postId} />
        )}
      </div>
    );
  }
);

Contents.displayName = "Contents";

export default Contents;
