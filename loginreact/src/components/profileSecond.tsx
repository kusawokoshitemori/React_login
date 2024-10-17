"use client";

import useAuth from "@/hooks/useAuth";

const ProfileSecond = () => {
  const user = useAuth(); // useAuthでデータ取得
  return (
    <div className="flex items-center">
      <div className="h-16 w-1/2 border-2 border-blue-400 bg-blue-100 flex items-center justify-center text-2xl">
        {user?.name || "名無し"}
      </div>
      <div className="w-1/2 flex flex-col">
        <p className="border-2 border-blue-400 bg-orange-200 text-black h-8 flex items-center justify-center text-lg m-0">
          2フォロー
        </p>
        <p className="border-2 border-blue-400 bg-green-300 text-black h-8 flex items-center justify-center text-lg m-0">
          3フォロワー
        </p>
      </div>
    </div>
  );
};

export default ProfileSecond;
