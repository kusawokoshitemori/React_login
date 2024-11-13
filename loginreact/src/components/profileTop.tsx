"use client";
import Image from "next/image";
import Button from "./Button";

const ProfileTop = () => {
  return (
    <div>
      {/* 3Word */}
      <div className="flex items-center">
        <Image
          src="/karukaru.png"
          alt="test用画像"
          width={100}
          height={100}
          className="rounded-full w-2/5 mx-4 object-cover max-w-64 max-h-64 md:mx-24"
          priority
        />
        <div className="absolute right-6 sm:right-12">
          <Button />
        </div>
      </div>
    </div>
  );
};

export default ProfileTop;
