"use client";

interface ButtonProps {
  userId: string;
}

const ButtonFollow: React.FC<ButtonProps> = ({ userId }) => {
  const handleClick = () => {
    console.log(userId);
  };
  return (
    <button
      onClick={handleClick}
      className="text-white bg-blue-500 rounded-lg hover:bg-blue-700 whitespace-nowrap p-4 text-lg"
    >
      フォローする
    </button>
  );
};

export default ButtonFollow;
