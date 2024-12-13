"use client";

import { useRouter } from "next/navigation";

const FirstButtonLogin = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/register"); // /register ページに移動
  };
  return (
    <button
      onClick={handleClick}
      className="text-white bg-gradient-to-r from-[#6C75D6] to-[#4C58A8] hover:from-[#4C6AC5] hover:to-[#2F4F8F] shadow-lg hover:shadow-2xl transition-all duration-300 whitespace-nowrap p-4 text-3xl rounded-md border-2 border-[#3E59A0] hover:scale-110"
    >
      ログイン
    </button>
  );
};

export default FirstButtonLogin;
