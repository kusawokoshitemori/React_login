import { supabase } from "@/services/supabaseClient";

export const fetchFilePath = async (userId: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from("users") // ストレージ名
      .select("profile_image_url") // 必要な列を指定
      .eq("id", userId) // ユーザーIDでフィルタ
      .single(); // 単一のレコードを取得

    if (error) {
      return null;
    }

    return data?.profile_image_url || null; // ファイルパスを返す
  } catch {
    return null;
  }
};
