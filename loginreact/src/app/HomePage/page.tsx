"use client";

import React from "react";
import "./page.css";
import useAuth from "../../hooks/useAuth"; // ユーザーフックをインポート

const HomePage = () => {
  const user = useAuth(); // ユーザー情報を取得

  return (
    <div className="home-page">
      <h1>ようこそ！</h1>
      {user ? (
        <div>
          <p>名前: {user.id}</p>
          <p>メールアドレス: {user.email}</p>
        </div>
      ) : (
        <p>ユーザー情報を読み込んでいます...</p>
      )}
    </div>
  );
};

export default HomePage;
