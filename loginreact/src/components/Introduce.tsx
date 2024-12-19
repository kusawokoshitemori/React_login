"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const Introduce = ({ userId }: { userId: string }) => {
  const [introduce, setIntroduce] = useState<string | null>(null); // 自己紹介取り出す

  useEffect(() => {
    if (userId) {
      const fetchIntroduce = async () => {
        try {
          const response = await axios.get(`/api/users/${userId}`);
          if (response.data.success) {
            setIntroduce(response.data.introduce); // 自己紹介記憶
          }
        } catch (error) {
          console.error("自己紹介文の取得に失敗しました", error);
        }
      };
      fetchIntroduce();
    }
  }, [userId]);

  return <div>{introduce || "自己紹介文はありません。"}</div>; // 自己紹介文を表示
};

export default Introduce;
