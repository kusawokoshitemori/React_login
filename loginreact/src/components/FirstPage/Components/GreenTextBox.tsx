import React from "react";

interface TextBoxProps {
  text: string;
}

const GreenTextBox: React.FC<TextBoxProps> = ({ text }) => {
  return (
    <div className="bg-gradient-to-r from-green-400 to-green-600 border-2 border-green-800 rounded-lg shadow-xl p-6 w-3/4 mx-auto text-center transform transition-transform duration-300">
      <p className="text-white font-semibold text-2xl tracking-wide">{text}</p>
    </div>
  );
};

export default GreenTextBox;
