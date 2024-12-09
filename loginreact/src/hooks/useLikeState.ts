import { useEffect, useState } from "react";

const useLikeState = (postId: number, PlayerId: string | null) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!postId || !PlayerId) {
      return; // 必要なIDがない場合は何もしない
    }

    const getLikeState = async () => {
      try {
        const response = await fetch(
          `/api/getLikeState?postId=${postId}&PlayerId=${PlayerId}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setIsLiked(data.isLiked);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    };

    getLikeState();
  }, [postId, PlayerId]);

  return isLiked;
};

export default useLikeState;
