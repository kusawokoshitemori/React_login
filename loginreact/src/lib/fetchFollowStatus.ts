import { supabase } from "@/services/supabaseClient";

export const fetchFollowStatus = async (
  followerId: string | undefined,
  followeeId: string | undefined
): Promise<boolean> => {
  if (!followerId || !followeeId) return false;

  try {
    const { data, error } = await supabase
      .from("follows")
      .select("*")
      .eq("follower_id", followerId)
      .eq("followee_id", followeeId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 はデータがない場合のコード
      console.error("フォロー状態の取得に失敗しました:", error.message);
      return false;
    }

    return !!data;
  } catch (err) {
    console.error("フォロー状態取得中の予期しないエラー:", err);
    return false;
  }
};