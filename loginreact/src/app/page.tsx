import React from "react";
import Link from "next/link";

const FirstPage = () => {
  return (
    <div className="PageLink_container">
      <Link href="/register">新規登録</Link>
      <Link href="/login">ログイン</Link>
      <Link href="/post">投稿画面</Link>
      <Link href="/HomePage">テスト画面</Link>
      <Link href="/profile">プロフィール</Link>
      <Link href="/main">メインページ</Link>
    </div>
  );
};

export default FirstPage;
