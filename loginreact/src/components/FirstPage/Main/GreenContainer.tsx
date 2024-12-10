import React from "react";
import GreenTextBox from "../Components/GreenTextBox";

const GreenContainer = () => {
  return (
    <div className="font-bold text-3xl py-12">
      <div>
        <GreenTextBox text="今すぐことわざを共有してコミュニティに参加しよう" />
        {/* ボタン2つ「新規登録はこちら」「既に登録している方はこちら」 */}
      </div>
    </div>
  );
};

export default GreenContainer;
