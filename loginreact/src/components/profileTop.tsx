"use client";
import Image from "next/image";
import Button from "./Button";

const ProfileTop = () => {
  return (
    <div>
      3Word
      <div className="flex items-center">
        <Image
          src="/karukaru.png"
          alt="test用画像"
          layout="responsive"
          width={100}
          height={100}
          className="rounded-full"
        />
        <Button />
      </div>
    </div>
  );
};

export default ProfileTop;
