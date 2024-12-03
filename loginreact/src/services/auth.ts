import { supabase } from "./supabaseClient";

// ログイン処理
export const handleLogin = async (email: string, password: string) => {
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (response.error) {
    console.error("ログインエラー:", response.error.message);
    return null;
  }

  console.log(response.data); // ログイン成功データを表示

  const token = response.data.session?.access_token;
  if (token) {
    localStorage.setItem("token", token);

    const { error: sessionError } = await supabase.auth.setSession({
      access_token: token,
      refresh_token: response.data.session?.refresh_token || "",
    });

    if (sessionError) {
      console.error("セッション設定エラー:", sessionError.message);
      return null;
    }

    return response.data.user;
  }

  return null;
};

// 現在のセッションを確認
export const checkUserSession = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("セッション取得エラー:", error.message);
    return null;
  }

  if (!session) {
    console.log("ユーザーが認証されていません。");
    return null;
  }

  console.log("現在のユーザー:", session.user);
  return session.user;
};
