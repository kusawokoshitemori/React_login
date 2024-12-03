import { supabase } from "@/services/supabaseClient";

export async function Get(userId: string) {
  try {
    // 'users' テーブルから 'id' に一致するレコードの 'name' を取得
    const { data, error } = await supabase
      .from("users")
      .select("name")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching name:", error);
      return null; // エラーの場合に null を返す
    }

    return data ? data.name : null; // レコードがあれば 'name' を返す
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
}
