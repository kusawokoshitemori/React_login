// 新規登録のコンテナ

import React from "react";
import FirstButtonSubmit from "./FirstButtonSubmit";

const SubmitContainer = () => {
  return (
    <div className="flex flex-col items-center w-4/5 md:w-2/5 border-2 border-black p-4 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg">
      <FirstButtonSubmit />
      <p
        className="text-3xl"
        style={
          {
            WebkitTextStroke: "1px black",
            textStroke: "1px black",
          } as React.CSSProperties
        } // 型を明示的に指定してエラーを回避
      >
        初めての方はこちら
      </p>
    </div>
  );
};

export default SubmitContainer;
