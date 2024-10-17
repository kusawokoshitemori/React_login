"use client";

import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

const Introduce = () => {
  const user = useAuth(); // useAuthでデータ取得
  const [introduce, setIntroduce] = useState<string | null>(null); // 自己紹介取り出す

  useEffect(() => {
    const fetchIntroduce = async () => {
      if (user?.id) {
        try {
          const response = await axios.get(`/api/users/${user.id}`); // 動的にAPI
          if (response.data.success) {
            setIntroduce(response.data.introduce); // 自己紹介記憶
          }
        } catch (error) {
          console.error("自己紹介文の取得に失敗しました", error);
        }
      }
    };

    fetchIntroduce();
  }, [user]);

  return <div>{introduce || "自己紹介文はありません。"}</div>; // 自己紹介文を表示
};

export default Introduce;
