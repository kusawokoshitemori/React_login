import React from "react";
import Image from "next/image";

const PinkContainer = () => {
  return (
    <div className="font-bold text-3xl py-12">
      <div className="flex justify-center items-center">
        <Image
          src="/proverb_icon.png"
          alt="Sample Image"
          layout="intrinsic" // 元のアスペクト比を保持
          width={800} // 幅を指定
          height={200} // 必要に応じて高さも指定
        />
      </div>
    </div>
  );
};

export default PinkContainer;
