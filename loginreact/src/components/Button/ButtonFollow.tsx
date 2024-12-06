"use client";

import useAuth from "@/hooks/useAuth";
import { handleAddFollow } from "@/lib/handleAddFollow";
import { handleRemoveFollow } from "@/lib/handleRemoveFollow";
import { Dispatch, SetStateAction } from "react";

interface ButtonProps {
  userId: string;
  isFollow: boolean;
  setIsFollow: Dispatch<SetStateAction<boolean>>;
}

const ButtonFollow: React.FC<ButtonProps> = ({
  userId,
  isFollow,
  setIsFollow,
}) => {
  const PlayerUser = useAuth(); // フォローする人
  const OtherUserId = userId; // フォローする対象
  return (
    <button
      onClick={() => {
        if (isFollow) {
          if (PlayerUser?.id) {
            handleRemoveFollow(PlayerUser.id, OtherUserId);
            setIsFollow((prev) => !prev);
          }
        } else {
          if (PlayerUser?.id) {
            handleAddFollow(PlayerUser.id, OtherUserId);
            setIsFollow((prev) => !prev);
          }
        }
      }}
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
