import React, { useState } from "react";

const ChengeProfile = () => {
  const [name, setName] = useState(""); // 名前の状態管理
  const [image, setImage] = useState<File | null>(null); // アップロード画像の状態
  const [imagePreview, setImagePreview] = useState<string | null>(null); // 画像プレビュー用

  // ファイルが選択されたとき
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 名前が入力されたとき
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  // 送信ボタンが押されたとき
  const handleSubmit = () => {
    // サーバー送信処理（例）
    console.log("送信する名前:", name);
    console.log("送信する画像:", image);
    alert("プロフィールが送信されました！");
  };

  // 変更ボタンが押されたとき
  const handleReset = () => {
    setName("");
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* プロフィール画像のアップロード */}
      <div>
        <h3 className="text-lg font-bold">プロフィール画像をアップロード</h3>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="画像プレビュー"
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* 名前入力 */}
      <div>
        <h3 className="text-lg font-bold">名前を入力</h3>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="新しい名前を入力"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* ボタン */}
      <div className="flex space-x-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          送信
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          変更
        </button>
      </div>
    </div>
  );
};

export default ChengeProfile;
