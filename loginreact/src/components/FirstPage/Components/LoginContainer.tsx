// ログインのコンテナ

import React from "react";
import FirstButtonLogin from "./FirstButtonLogin";

const LoginContainer = () => {
  return (
    <div className="flex flex-col items-center w-4/5 md:w-2/5 border-2 border-black p-4 bg-gradient-to-r from-pink-100 to-pink-300 rounded-lg shadow-lg">
      <FirstButtonLogin />
      <p
        className="text-3xl"
        style={
          {
            WebkitTextStroke: "1px black",
            textStroke: "1px black",
          } as React.CSSProperties
        } // 型を明示的に指定してエラーを回避
      >
        ログイン済みの方はこちら
      </p>
    </div>
  );
};

export default LoginContainer;
