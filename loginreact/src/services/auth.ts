import { supabase } from "./supabaseClient";

// ログイン処理
export const handleLogin = async (email: string, password: string) => {
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (response.error) {
    return null;
  }

  const token = response.data.session?.access_token;
  if (token) {
    localStorage.setItem("token", token);

    const { error: sessionError } = await supabase.auth.setSession({
      access_token: token,
      refresh_token: response.data.session?.refresh_token || "",
    });

    if (sessionError) {
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
    return null;
  }

  if (!session) {
    return null;
  }

  return session.user;
};
