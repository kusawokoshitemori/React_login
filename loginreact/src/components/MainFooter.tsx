"use client";

import Image from "next/image";
import Link from "next/link";

const MainFooter = () => {
  {
    /* 画面が大きいときはwidth調節して画像の右側にスペース入れたい。(画像大きく) */
  }
  return (
    <div className="bg-gray-300">
      <div className="flex justify-between h-32 lg:w-[80%] mx-auto">
        <Link href="/main">
          <div className="flex flex-col items-center">
            <Image
              src="/homepage.png"
              alt="家のアイコン"
              width={80}
              height={80}
            />
            <p className="text-sm">ホーム</p>
          </div>
        </Link>
        <Link href="/search">
          <div className="flex flex-col items-center">
            <Image
              src="/search.png"
              alt="虫眼鏡アイコン"
              width={80}
              height={80}
            />
            <p className="text-sm">新着順</p>
          </div>
        </Link>
        <Link href="/post">
          <div className="flex flex-col items-center">
            <Image src="/post.png" alt="投稿アイコン" width={80} height={80} />
            <p className="text-sm">投稿</p>
          </div>
        </Link>
        <div
          className="flex flex-col items-center"
          onClick={() => alert("この機能は未実装です")}
        >
          <Image src="/favorite.png" alt="実績" width={80} height={80} />
          <p className="text-sm">実績</p>
        </div>
        <Link href="/profile">
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
        </Link>
      </div>
    </div>
  );
};

export default MainFooter;
