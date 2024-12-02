import { supabase } from "@/lib/supabaseClient";

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
    console.log("自己紹介文が更新されました！");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message); // Errorオブジェクトのmessageプロパティにアクセス
      throw err; // 再スロー
    } else {
      console.error("予期しないエラー:", err);
      throw new Error("予期しないエラーが発生しました");
    }
  }
};
