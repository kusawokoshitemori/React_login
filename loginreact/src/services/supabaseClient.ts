import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("SupabaseのURLまたはAnonキーが設定されていません。");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 現在のセッションを確認する関数
export const checkUserSession = async () => {
  // セッションを取得
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error("セッション取得に失敗しました。");
  }

  if (!session) {
    return null; // 認証されていない場合はnullを返す
  }

  return session.user; // 認証されている場合はユーザー情報を返す
};
