import React from "react";
import Image from "next/image";

const PinkContainer = () => {
  return (
    <div className="flex justify-center items-center">
      {/* ロゴ本体 */}
      <div className="z-10 ">
        <Image
          src="/proverb_icon.png"
          alt="ことわざの輪ロゴ"
          width={768}
          height={768}
        />
      </div>

      {/* イラストの配置 */}
      <div className="absolute top-0 left-0 transform translate-x-[-10%] translate-y-[-10%]">
        <Image
          src="/proverb/proverb1.png"
          alt="ことわざ1"
          width={48}
          height={48}
        />
      </div>
      <div className="absolute top-0 right-0 transform translate-x-[50%] translate-y-[-50%]">
        <Image
          src="/proverb/proverb2.png"
          alt="ことわざ2"
          width={48}
          height={48}
        />
      </div>
      <div className="absolute bottom-0 left-0 transform translate-x-[-50%] translate-y-[50%]">
        <Image
          src="/proverb/proverb3.png"
          alt="ことわざ3"
          width={48}
          height={48}
        />
      </div>
      <div className="absolute bottom-0 right-0 transform translate-x-[50%] translate-y-[50%]">
        <Image
          src="/proverb/proverb4.png"
          alt="ことわざ4"
          width={48}
          height={48}
        />
      </div>
      <div className="absolute top-1/2 left-0 transform translate-x-[-50%] translate-y-[-50%]">
        <Image src="/proverb/flower.png" alt="花1" width={48} height={48} />
      </div>
      <div className="absolute top-1/2 right-0 transform translate-x-[50%] translate-y-[-50%]">
        <Image src="/proverb/flower.png" alt="花2" width={48} height={48} />
      </div>
    </div>
  );
};

export default PinkContainer;
