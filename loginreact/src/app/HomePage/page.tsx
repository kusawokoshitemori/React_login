"use client";

import React from "react";
import useAuth from "../../hooks/useAuth"; // ユーザーフックをインポート
import Link from "next/link";

const HomePage = () => {
  const user = useAuth(); // ユーザー情報を取得

  console.log("User data:", user);

  return (
    <div className="text-4xl">
      <h1>ようこそ！</h1>
      {user ? (
        <div>
          <p>名前: {user.id}</p>
          <p>メールアドレス: {user.email}</p>
        </div>
      ) : (
        <p>ユーザー情報を読み込んでいます...</p>
      )}
      <br />
      <Link href="/post">投稿画面</Link>
      <Link href="/profile">プロフィール</Link>
    </div>
  );
};

export default HomePage;
