import React from "react";

interface TextBoxProps {
  text: string;
}

const BlueTextBox: React.FC<TextBoxProps> = ({ text }) => {
  return (
    <div className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 border-2 border-blue-800 rounded-lg shadow-xl p-4 text-center transform transition-transform duration-300 hover:scale-125">
      <p className="text-white font-semibold text-lg tracking-wide">{text}</p>
    </div>
  );
};

export default BlueTextBox;
