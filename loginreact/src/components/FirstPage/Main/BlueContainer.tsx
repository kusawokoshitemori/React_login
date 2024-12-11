import React from "react";
import Image from "next/image";
import BlueTextBox from "../Components/BlueTextBox";
const BlueContainer = () => {
  return (
    <div className="font-bold text-3xl pb-60">
      <div className="flex">
        <Image
          src="/postingPhoto.png"
          alt="アプリ画面の様子"
          width={1024}
          height={768}
        />
        <div className="flex flex-col justify-center items-center">
          <BlueTextBox text="あなたのことわざを簡単シェア" />
          <BlueTextBox text="ことわざ　ｘ　SNS" />
        </div>
      </div>
    </div>
  );
};

export default BlueContainer;
