// フォロー数取るやつ
import { useState, useEffect } from "react";
import axios from "axios";

interface FollowCountProps {
  userId: string;
  pushFollow: number;
}

const useFollowCounts = ({ userId, pushFollow }: FollowCountProps) => {
  const [followCount, setFollowCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);

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

    if (userId) {
      fetchCounts();
    }
  }, [userId]);

  // ここの処理変える
  useEffect(() => {
    if (pushFollow) {
      // 一時的にローカルのフォロワー数を+1 or -1
      setFollowersCount((prev) => prev + pushFollow);
    }
  }, [pushFollow, userId]);

  return { followCount, followersCount };
};

export default useFollowCounts;
