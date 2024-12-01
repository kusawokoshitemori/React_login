"use client";

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>; // 型を明示的に指定
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
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
