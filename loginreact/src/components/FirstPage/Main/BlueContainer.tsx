import React from "react";
import Image from "next/image";
import BlueTextBox from "../Components/BlueTextBox";
const BlueContainer = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        <Image
          src="/textSubmit.png"
          alt="ことわざ 発信"
          width={512}
          height={512}
        />
      </div>

      <div
        className="flex flex-col xl:flex-row justify-between m-auto pb-96"
        style={{ width: "90%" }}
      >
        {/* md以上で表示する画像 */}
        <div className="relative hidden md:block md:basis-2/3 w-full">
          <Image
            src="/postingPhotoPC.png"
            alt="ことわざの輪（PC版）"
            width={1024}
            height={768}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        {/* md未満で表示する画像 */}
        <div className="relative block md:hidden w-full">
          <Image
            src="/postingPhotoMobile.png"
            alt="ことわざの輪（モバイル版）"
            width={768}
            height={1024}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="flex flex-col justify-center items-center basis-1/3">
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
