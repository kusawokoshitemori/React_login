import React from "react";
import Image from "next/image";
import BlueTextBox from "../Components/BlueTextBox";
const BlueContainer = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        <Image
          src="/textSubmit.png"
          alt="ことわざを発信しよう"
          width={512}
          height={512}
        />
      </div>

      <div
        className="flex justify-between m-auto pb-96"
        style={{ width: "90%" }}
      >
        <Image
          src="/postingPhoto.png"
          alt="アプリ画面の様子"
          width={1024}
          height={768}
        />
        <div className="flex flex-col justify-center items-center">
          <div className="mb-4">
            <BlueTextBox text="あなたのことわざを簡単シェア" />
          </div>

          <BlueTextBox text="ことわざ　ｘ　SNS" />
        </div>
      </div>
    </div>
  );
};

export default BlueContainer;
