"use client";

import React from "react";
import { checkUserSession } from "@/services/supabaseClient"; // supabaseClient で定義された関数をインポート

const UserSessionButton: React.FC = () => {
  const handleButtonClick = async () => {
    try {
      const user = await checkUserSession();
      if (user) {
        console.log("認証されたユーザー:", user);
      } else {
        console.log("ユーザーは未認証です。");
      }
    } catch (error) {
      console.error("エラー:", error);
    }
  };

  return <button onClick={handleButtonClick}>現在のセッションを確認</button>;
};

export default UserSessionButton;
