"use client";

const CommentPost = () => {
  const handleClick = () => {
    console.log("クリックしたよ");
  };

  return (
    <div className="flex items-center justify-center">
      <input
        type="text"
        placeholder="入力してください"
        className="border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 sm:w-72 md:w-96 lg:w-128 py-4"
      />
      <button
        onClick={handleClick}
        className="text-white bg-blue-500 rounded-lg hover:bg-blue-700 whitespace-nowrap px-4 py-4 text-lg"
      >
        送信
      </button>
    </div>
  );
};

export default CommentPost;
