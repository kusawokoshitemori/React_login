"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import usePlayerName from "@/hooks/usePlayerName";

const ProfileSecond = ({ userId }: { userId: string }) => {
  //フォロー,フォロワー数を送ってもらうやつ
  const [followCount, setFollowCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);

  // 名前取得
  const playerName = usePlayerName(userId);

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
