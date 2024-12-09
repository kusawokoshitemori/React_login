"use client";

import { useEffect } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const FirstPage = () => {
  const router = useRouter();
  const user = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/profile"); // ログイン済みならマイページにリダイレクト
    }
  }, [user, router]);

  return (
    <div className="PageLink_container">
      <Link href="/register">新規登録</Link>
      <Link href="/login">ログイン</Link>
      <Link href="/post">投稿画面</Link>
      <Link href="/HomePage">テスト画面</Link>
      <Link href="/profile">プロフィール</Link>
      <Link href="/main">メインページ</Link>
      <Link href="/test">テスト</Link>
    </div>
  );
};

export default FirstPage;
