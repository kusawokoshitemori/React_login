"use client";

import useAuth from "@/hooks/useAuth";
import { handleAddFollow } from "@/lib/handleAddFollow";

interface ButtonProps {
  userId: string;
}

const ButtonFollow: React.FC<ButtonProps> = () => {
  const PlayerUser = useAuth();
  return (
    <button
      onClick={() => PlayerUser?.id && handleAddFollow(PlayerUser.id)}
      className="text-white bg-blue-500 rounded-lg hover:bg-blue-700 whitespace-nowrap p-4 text-lg"
    >
      フォローする
    </button>
  );
};

export default ButtonFollow;
