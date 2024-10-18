"use client";

import Image from "next/image";

const Contents = () => {
  return (
    <div className="w-5/6 mx-auto border-4 rounded-lg border-blue-300 ">
      <div className="w-full flex items-center border-b-4 border-green-500">
        <Image
          src="/karukaru.png"
          alt="test用画像"
          width={50}
          height={50}
          className="rounded-full mr-4 ml-1 m-1"
        />
        <p className="whitespace-nowrap text-lg">ここに名前入る</p>
      </div>
      <p className="text-2xl flex items-center justify-center mt-2">
        ここにことわざ
      </p>
    </div>
  );
};

export default Contents;
