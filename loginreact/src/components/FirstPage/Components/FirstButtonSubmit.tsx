"use client";

import { useRouter } from "next/navigation";

const FirstButtonSubmit: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/register"); // /register ページに移動
  };
  return (
    <button
      onClick={handleClick}
      className="text-white bg-gradient-to-r from-[#DA7DCF] to-[#B048A9] hover:from-[#CC4BA0] hover:to-[#A5297A] shadow-lg hover:shadow-2xl transition-all duration-300 whitespace-nowrap p-4 text-3xl rounded-md border-2 border-[#C1338E] hover:scale-110"
    >
      新規登録
    </button>
  );
};

export default FirstButtonSubmit;
