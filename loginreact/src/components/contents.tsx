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
      {/* 画面の大きさで文字の大きさ変えてるから注意 */}
      <p className="text-2xl sm:text-4xl flex items-center justify-center mt-2">
        ここにことわざ
      </p>
      <div className="w-5/6 flex justify-between items-center mx-auto">
        <div className="flex items-center">
          <Image
            src="/heart_white.png"
            alt="ハートの画像"
            width={50}
            height={50}
            className="rounded-full mr-4 ml-1 m-1"
          />
          <p text-lg>1</p>
        </div>
        <div className="flex items-center">
          {" "}
          <Image
            src="/comment_white.png"
            alt="コメントの画像"
            width={50}
            height={50}
            className="rounded-full mr-4 ml-1 m-1"
          />
          <p>0</p>
        </div>
        <Image
          src="/right_arrow.png"
          alt="▷の画像"
          width={50}
          height={50}
          className="rounded-full mr-4 ml-1 m-1"
        />
      </div>
    </div>
  );
};

export default Contents;
