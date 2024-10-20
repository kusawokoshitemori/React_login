"use client";

import Image from "next/image";

const MainFooter = () => {
  {
    /* 画面が大きいときはwidth調節して画像の右側にスペース入れたい。(画像大きく) */
  }
  return (
    <div className="flex justify-between bg-gray-300">
      <div className="flex flex-col items-center">
        <Image src="/homepage.png" alt="家のアイコン" width={80} height={80} />
        <p className="text-sm">ホーム</p>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/search.png" alt="投稿アイコン" width={80} height={80} />
        <p className="text-sm">サーチ</p>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/post.png" alt="投稿アイコン" width={80} height={80} />
        <p className="text-sm">投稿</p>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/favorite.png" alt="お気に入り" width={80} height={80} />
        <p className="text-sm">お気に入り</p>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src="/karukaru.png"
          alt="家のアイコン"
          width={80}
          height={80}
          className="rounded-full"
        />
        <p className="text-sm">マイページ</p>
      </div>
    </div>
  );
};

export default MainFooter;
