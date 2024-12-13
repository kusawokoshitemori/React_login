import { useEffect, useState } from "react";
import Image from "next/image";

const PinkContainer = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640); // smサイズ未満の条件
    };

    handleResize(); // 初期状態を設定
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      {/* ロゴ本体 */}
      <div className="z-10 relative">
        <Image
          src="/proverb_icon.png"
          alt="ことわざの輪ロゴ"
          width={768}
          height={768}
        />
        <Image
          src="/proverb/proverb1.png"
          alt="ことわざ1"
          width={150}
          height={150}
          className="absolute top-[50%] left-[10%] hidden md:block md:left-[-30px] lg:left-[-150px] transform -translate-y-1/2"
        />
        <Image
          src="/proverb/proverb2.png"
          alt="ことわざ2"
          width={isSmallScreen ? 100 : 150}
          height={isSmallScreen ? 100 : 150}
          className="absolute top-[-150px] left-[50%] transform -translate-x-1/2"
        />
        <Image
          src="/proverb/proverb3.png"
          alt="ことわざ3"
          width={150}
          height={150}
          className="absolute top-[50%] right-[10%] hidden md:block md:right-[-30px] lg:right-[-150px] transform -translate-y-1/2"
        />
        <Image
          src="/proverb/proverb4.png"
          alt="ことわざ4"
          width={isSmallScreen ? 100 : 150}
          height={isSmallScreen ? 100 : 150}
          className="absolute bottom-[-150px] left-[50%] transform -translate-x-1/2"
        />
        <Image
          src="/proverb/proverb5.png"
          alt="ことわざ5"
          width={isSmallScreen ? 100 : 150}
          height={isSmallScreen ? 100 : 150}
          className="absolute top-[-120px] left-[80%] transform -translate-x-1/2"
        />
        <Image
          src="/proverb/proverb6.png"
          alt="ことわざ6"
          width={isSmallScreen ? 100 : 150}
          height={isSmallScreen ? 100 : 150}
          className="absolute bottom-[-120px] left-[20%] transform -translate-x-1/2"
        />
        <Image
          src="/proverb/flower.png"
          alt="花"
          width={isSmallScreen ? 100 : 150}
          height={isSmallScreen ? 100 : 150}
          className="absolute top-[-120px] left-[20%] transform -translate-x-1/2"
        />
        <Image
          src="/proverb/flower.png"
          alt="花"
          width={isSmallScreen ? 100 : 150}
          height={isSmallScreen ? 100 : 150}
          className="absolute bottom-[-120px] left-[80%] transform -translate-x-1/2"
        />
      </div>
    </div>
  );
};

export default PinkContainer;
