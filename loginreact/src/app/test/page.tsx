"use client";

import { useRouter } from "next/navigation";

const TestProfile = () => {
  const router = useRouter();

  const userId = "1"; // テスト用固定値

  const handleButtonClick = () => {
    // 動的なURLに遷移
    router.push(`/profile/${userId}`);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>プロフィールページへ移動</button>
    </div>
  );
};

export default TestProfile;
