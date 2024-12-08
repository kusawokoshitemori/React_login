"use client";

import useAuth from "@/hooks/useAuth";
import { handleAddFollow } from "@/lib/handleAddFollow";
import { handleRemoveFollow } from "@/lib/handleRemoveFollow";
import { Dispatch, SetStateAction, useEffect } from "react";
import { fetchFollowStatus } from "@/lib/fetchFollowStatus";

interface ButtonProps {
  userId: string;
  isFollow: boolean;
  setIsFollow: Dispatch<SetStateAction<boolean>>;
  setPushFollow: Dispatch<SetStateAction<number>>;
}

const ButtonFollow: React.FC<ButtonProps> = ({
  userId,
  isFollow,
  setIsFollow,
  setPushFollow,
}) => {
  const PlayerUser = useAuth(); // フォローする人
  const OtherUserId = userId; // フォローする対象

  // フォローの状態を調べる
  useEffect(() => {
    const initializeFollowStatus = async () => {
      if (PlayerUser?.id) {
        const status = await fetchFollowStatus(PlayerUser.id, OtherUserId);
        setIsFollow(status);
      }
    };

    initializeFollowStatus();
  }, [PlayerUser?.id, OtherUserId, setIsFollow]);

  // ボタンを押したときの機能
  const handleClick = async () => {
    if (isFollow) {
      // フォロー解除
      if (PlayerUser?.id) {
        await handleRemoveFollow(PlayerUser.id, OtherUserId);
        setIsFollow(false);
        setPushFollow(-1);
      }
    } else {
      // フォロー追加
      if (PlayerUser?.id) {
        await handleAddFollow(PlayerUser.id, OtherUserId);
        setIsFollow(true);
        setPushFollow(1);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-lg p-4 text-lg whitespace-nowrap ${
        isFollow
          ? "text-gray-700 bg-gray-300 hover:bg-gray-400" // フォロー済みのスタイル
          : "text-white bg-blue-500 hover:bg-blue-700" // フォローするのスタイル
      }`}
    >
      {isFollow ? "フォロー中" : "フォローする"}
    </button>
  );
};

export default ButtonFollow;
