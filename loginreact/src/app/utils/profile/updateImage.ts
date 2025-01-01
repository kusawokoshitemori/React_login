import { supabase } from "@/services/supabaseClient";

export const updateImage = async (
  userId: string,
  file: File
): Promise<string | null> => {
  // ファイルが無かったらreturnする処理
  if (!file) {
    console.error("ファイルが提供されていません");
    return null;
  }

  const filePath = `${userId}/${Date.now()}-${file.name}`; // ユーザーIDで管理
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (error) {
    console.error("アップロードエラー:", error);
    return null;
  }

  console.log("アップロード成功:", data);

  // getPublicUrlの戻り値にアクセス
  const fileUrl = supabase.storage.from("avatars").getPublicUrl(filePath)
    .data.publicUrl;
  return fileUrl; // 画像URLを返す
};
