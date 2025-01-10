"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: string;
  email: string;
  name: string;
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token"); // トークンを取得
      if (!token) {
        setUserLoading(false);
        return;
      }

      const response = await axios.get("/api/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`, // トークンをAuthorizationヘッダーに設定
        },
      });

      if (response.data && response.data.user) {
        setUser({
          id: response.data.user.id, // response.data.user から取得
          email: response.data.user.email, // response.data.user から取得
          name: response.data.user.name,
        });
      }
    } catch {
      setUser(null);
    } finally {
      setUserLoading(false); // API呼び出しが完了したらローディングを終了
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, userLoading };
};

export default useAuth;
