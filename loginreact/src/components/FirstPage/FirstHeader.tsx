"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const FirstHeader = () => {
  return (
    <div className="bg-green-300 flex items-center h-24">
      <Image
        src="/original_proverb.png"
        alt="アイコン"
        width={100}
        height={100}
      ></Image>
      <p className="text-red-700 flex items-center justify-center text-2xl lg:text-3xl text-shadow-md select-none">
        誰でも偉人になれる
      </p>

      <div className="flex justify-end items-center h-24 p-4 ml-auto">
        <div className="relative group">
          <Link href="register">
            <Image
              src="/New_registration.png"
              alt="新規登録"
              width={100}
              height={100}
              className="group-hover:opacity-100 transition-opacity duration-300"
            />
          </Link>
          <div
            className="absolute top-[75%] left-[20%] transform -translate-x-1/2 mt-2 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ zIndex: 1 }}
          >
            <Image
              src="/speech_bubble_new.png"
              alt="吹き出し"
              width={100}
              height={100}
            />
          </div>
        </div>

        <div className="relative group">
          <Link href="login">
            <Image
              src="/login.png"
              alt="ログイン"
              width={100}
              height={100}
              className="group-hover:opacity-100 transition-opacity duration-300"
            />
          </Link>
          <div
            className="absolute top-[75%] left-[25%] transform -translate-x-1/2 mt-2 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ zIndex: 1 }}
          >
            <Image
              src="/speech_bubble_login.png"
              alt="吹き出し"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstHeader;
