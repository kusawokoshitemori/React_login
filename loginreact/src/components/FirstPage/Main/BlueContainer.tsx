import React from "react";
import BlueTextBox from "../Components/BlueTextBox";
const BlueContainer = () => {
  return (
    <div className="font-bold text-3xl pb-60">
      <div>
        <p>ここにBlueの要素が入るよ</p>
        <BlueTextBox text="あなたのことわざを簡単シェア" />
        <BlueTextBox text="ことわざ　ｘ　SNS" />
      </div>
    </div>
  );
};

export default BlueContainer;
