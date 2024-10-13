import React from "react";
import "./page.css";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="PageLink_container">
      <Link href="/register">新規登録</Link>
      <Link href="/login">ログイン</Link>
    </div>
  );
};

export default HomePage;
