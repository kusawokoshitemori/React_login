"use client";

import Image from "next/image";

const MainHeader = () => {
  return (
    <div className="bg-green-300 flex items-center h-24">
      <Image
        src="/original_proverb.png"
        alt="アイコン"
        width={100}
        height={100}
      ></Image>
      <p className="text-red-700 flex items-center justify-center text-2xl">
        誰でも偉人になれる
      </p>
    </div>
  );
};

export default MainHeader;
