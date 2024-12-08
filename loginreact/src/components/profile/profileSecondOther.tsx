"use client";

import useFollowCounts from "@/hooks/useFollowCounts";
import usePlayerName from "@/hooks/usePlayerName";

interface ProfileSecondOtherProps {
  userId: string; // ユーザーID
  pushFollow: number;
}

const ProfileSecondOther: React.FC<ProfileSecondOtherProps> = ({
  userId,
  pushFollow,
}) => {
  const { followCount, followersCount } = useFollowCounts({
    userId,
    pushFollow,
  });

  const playerName = usePlayerName(userId);

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

export default ProfileSecondOther;
