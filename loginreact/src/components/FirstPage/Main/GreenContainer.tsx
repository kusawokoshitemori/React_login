import React from "react";
import GreenTextBox from "../Components/GreenTextBox";
import LoginContainer from "../Components/LoginContainer";
import SubmitContainer from "../Components/SubmitContainer";

const GreenContainer = () => {
  return (
    <div className="font-bold text-3xl py-12">
      <div>
        <GreenTextBox text="今すぐことわざを共有してコミュニティに参加しよう" />
        {/* ボタン2つ「新規登録はこちら」「既に登録している方はこちら」 */}
        <div className="w-3/4  flex flex-col md:flex-row items-center justify-between mx-auto my-12">
          <SubmitContainer />
          <LoginContainer />
        </div>
      </div>
    </div>
  );
};

export default GreenContainer;
