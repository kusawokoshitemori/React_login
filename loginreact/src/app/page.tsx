"use client";

import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import FirstHeader from "@/components/FirstPage/FirstHeader";
import FirstMain from "@/components/FirstPage/Main/FirstMain";
import FirstFooter from "@/components/FirstPage/FirstFooter";
import Head from "next/head";

const FirstPage = () => {
  const router = useRouter();
  const user = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/main"); // ログイン済みならメインページにリダイレクト
    }
  }, [user, router]);

  return (
    <div className="w-full h-screen">
      <Head>
        {/* タイトル */}
        <title>ことわざの輪 - ことわざを共有する新しいSNS</title>
        {/* メタデータ */}
        <meta
          name="description"
          content="自作ことわざを投稿して共有できる新しいSNS。自由気ままに投稿しよう"
        />
        <meta
          name="keywords"
          content="ことわざの輪, ことわざ, SNS, ことわざ SNS, 面白いアプリ, ことわざ 珍しい, ことわざ 面白い, ことわざ 楽しい"
        />
        <meta name="author" content="草をこして森" />

        {/* レスポンシブ対応 */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* OGPタグ */}
        <meta
          property="og:title"
          content="ことわざの輪 - ことわざを共有する新しいSNS"
        />
        <meta property="og:description" content="面白いことわざを制作しよう" />
        <meta
          property="og:image"
          content="https://proverbsns.vercel.app/proverb_icon.png"
        />
        <meta property="og:url" content="https://proverbsns.vercel.app/" />
        <meta property="og:type" content="website" />

        {/* Twitterカード */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="ことわざの輪 - ことわざを共有する新しいSNS"
        />
        <meta name="twitter:description" content="面白いことわざを制作しよう" />
        <meta
          name="twitter:image"
          content="https://proverbsns.vercel.app/proverb_icon.png"
        />

        {/* ファビコン */}
        <link rel="icon" href="/original_proverb.png" />
      </Head>

      <FirstHeader />
      <FirstMain />
      <FirstFooter />
    </div>
  );
};

export default FirstPage;
