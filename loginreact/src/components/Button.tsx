"use client";

const Button = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-white bg-blue-500 rounded-lg hover:bg-blue-700 whitespace-nowrap p-4 text-lg"
    >
      プロフィール編集
    </button>
  );
};

export default Button;
