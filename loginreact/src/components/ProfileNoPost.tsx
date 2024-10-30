import ButtonPostMove from "./ButtonPostMove";

const ProfileNoPost = () => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-xl text-emerald-700 text-shadow-md">
        まだ投稿はありません
      </p>
      <p className="text-lg text-purple-600 text-shadow-md">
        あなたのアイデアを投稿しましょう
      </p>
      <ButtonPostMove />
    </div>
  );
};

export default ProfileNoPost;
