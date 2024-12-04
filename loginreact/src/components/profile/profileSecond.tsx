"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const ProfileSecond = ({ userId }: { userId: string }) => {
  //フォロー,フォロワー数を送ってもらうやつ
  const [followCount, setFollowCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);

  // 名前取得
  const [playerName, setPlayerName] = useState<string>("名無し");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(`/api/follow?userId=${userId}`);

        setFollowersCount(response.data.followersCount);
        setFollowCount(response.data.followCount);
      } catch (error) {
        console.error(
          "フォロワー数またはフォロー数の取得に失敗しました",
          error
        );
      }
    };

    fetchCounts();
  }, [userId]);

  // 名前をuserIdから取るよ
  useEffect(() => {
    const fetchPlayerName: () => Promise<void> = async () => {
      try {
        const response = await fetch(`/api/fetchName`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }), // userIdをリクエストボディに含める
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setPlayerName(data.name || "名無し");
      } catch (error) {
        console.error("名前を取得することに失敗しました:", error);
        setPlayerName("名無し");
      }
    };

    fetchPlayerName();
  }, [userId]);

  return (
    <div className="flex items-center">
      <div className="h-16 w-1/2 border-2 border-blue-400 bg-blue-100 flex items-center justify-center text-2xl">
        {playerName}
      </div>
      <div className="w-1/2 flex flex-col">
        <p className="border-2 border-blue-400 bg-orange-200 text-black h-8 flex items-center justify-center text-lg m-0">
          {followCount}フォロー
        </p>
        <p className="border-2 border-blue-400 bg-green-300 text-black h-8 flex items-center justify-center text-lg m-0">
          {followersCount}フォロワー
        </p>
      </div>
    </div>
  );
};

export default ProfileSecond;
