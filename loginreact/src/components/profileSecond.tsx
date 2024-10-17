"use client";

const ProfileSecond = () => {
  return (
    <div className="flex items-center">
      <div className="h-16 w-1/2 border-2 border-blue-400 bg-blue-100 flex items-center justify-center text-2xl">
        名前
      </div>
      <div className="w-1/2 flex flex-col">
        <p className="border-2 border-blue-400 bg-orange-200 h-8 flex items-center justify-center text-lg">
          2フォロー
        </p>
        <p className="border-2 border-blue-400 bg-green-300 h-8 flex items-center justify-center text-lg">
          3フォロワー
        </p>
      </div>
    </div>
  );
};

export default ProfileSecond;
