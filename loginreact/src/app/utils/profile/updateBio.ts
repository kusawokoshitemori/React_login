import { supabase } from "@/services/supabaseClient";

export const updateBio = async (
  userId: string,
  introduce: string
): Promise<void> => {
  try {
    const { error } = await supabase
      .from("users")
      .update({ introduce: introduce })
      .eq("id", userId);

    if (error) throw new Error(`自己紹介文更新エラー: ${error.message}`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw err; // 再スロー
    } else {
      throw new Error("予期しないエラーが発生しました");
    }
  }
};
