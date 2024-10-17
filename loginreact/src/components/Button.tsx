"use client";

const Button = () => {
  const handleClick = () => {
    console.log("クリックしたよ");
  };

  return (
    <button
      onClick={handleClick}
      className="text-white bg-blue-500 rounded-lg hover:bg-blue-700 p-4"
    >
      プロフィールを編集
    </button>
  );
};

export default Button;
