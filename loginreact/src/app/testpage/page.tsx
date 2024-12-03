"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "../utils/validationSchema";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

interface LoginForm {
  email: string;
  password: string;
}

const App = () => {
  const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      // Supabase の認証 API を利用してログイン
      const { data: session, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error("ログインエラー:", error.message);
        setLoginSuccess(false);
        setLoginError(error.message || "ログインに失敗しました");
        return;
      }

      console.log("ログイン成功:", session);
      setLoginSuccess(true);
      setLoginError(null);

      // ログイン成功後、セッションは Supabase が自動管理
      router.push("/HomePage"); // ホームページへリダイレクト
    } catch (e) {
      console.error("予期しないエラー:", e);
      setLoginSuccess(false);
      setLoginError("予期しないエラーが発生しました");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h1 className="mb-5 text-2xl font-bold text-center">Login Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="block text-sm mb-1">
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <p className="text-red-600 text-xs mb-4">
          {errors.email?.message as React.ReactNode}
        </p>

        <label htmlFor="password" className="block text-sm mb-1">
          パスワード
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <p className="text-red-600 text-xs mb-4">
          {errors.password?.message as React.ReactNode}
        </p>

        <button
          type="submit"
          className="w-full p-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          送信
        </button>

        {loginSuccess === false && (
          <p className="text-red-600 text-xs mt-2">{loginError}</p>
        )}
      </form>
      <Link href="/register" className="text-blue-600 hover:underline">
        新規登録
      </Link>
    </div>
  );
};

export default App;
