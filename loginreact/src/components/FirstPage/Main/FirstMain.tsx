import React from "react";
import PinkContainer from "./PinkContainer";
import BlueContainer from "./BlueContainer";
import GreenContainer from "./GreenContainer";

const FirstMain = () => {
  const pink = "#FAD5E0";
  const blue = "#96E3FF";
  const green = "#96FF9C";
  return (
    <div>
      <div className="relative">
        {/* ここに上の要素 */}
        <div className="text-white" style={{ backgroundColor: pink }}>
          <PinkContainer />
        </div>

        {/* 波線 */}
        <svg
          className="absolute inset-x-0 bottom-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill={blue}
            d="M0,160L48,144C96,128,192,96,288,90.7C384,85,480,107,576,122.7C672,139,768,149,864,122.7C960,96,1056,42,1152,48C1248,53,1344,139,1392,176L1440,213L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        <div className="h-60" style={{ backgroundColor: pink }}>
          <h2 className="text-center text-white text-2xl"></h2>
        </div>
      </div>
      {/* ここに二つ目の要素 */}
      <div className="text-white" style={{ backgroundColor: blue }}>
        <BlueContainer />
      </div>

      {/* 波線 */}
      <svg
        className="absolute inset-x-0 bottom-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill={green}
          d="M0,160L48,144C96,128,192,96,288,90.7C384,85,480,107,576,122.7C672,139,768,149,864,122.7C960,96,1056,42,1152,48C1248,53,1344,139,1392,176L1440,213L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <div className="h-60" style={{ backgroundColor: blue }}>
        <h2 className="text-center text-white text-2xl"></h2>
      </div>

      {/* ここに三つ目の要素 */}
      <div className="text-white" style={{ backgroundColor: green }}>
        <GreenContainer />
      </div>
    </div>
  );
};

export default FirstMain;
