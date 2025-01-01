import { supabase } from "@/services/supabaseClient";

export const updateImage = async (
  userId: string,
  file: File
): Promise<string | null> => {
  if (!file) {
    console.error("ファイルがありません");
    return null;
  }

  const filePath = `${userId}/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (error) {
    console.error("アップロードエラー", error);
    return null;
  }
  console.log("アップロード成功", data);

  // getPublicUrlの戻り値にアクセス
  const fileUrl = supabase.storage.from("avatars").getPublicUrl(filePath)
    .data.publicUrl;

  // データベースにパスを送る
  const { error: DBerror } = await supabase
    .from("users")
    .update({ profile_image_url: filePath })
    .eq("id", userId);

  if (DBerror) {
    console.error("データベースのエラーが発生しました", DBerror);
    return null;
  }

  return fileUrl; // 画像URLを返す
};
