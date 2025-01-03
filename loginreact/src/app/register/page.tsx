"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const schema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(6, "パスワードは6文字以上である必要があります"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  // ログインできているかを管理するやつ。できてなかったらメッセージを表示
  const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  // ここでページ遷移するuseRouterを使う準備
  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await axios.post("/api/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log(response.data.message); // 登録成功メッセージを表示

      // 登録したユーザー情報でトークンを取得
      const tokenResponse = await axios.post("/api/registerToken", {
        email: data.email, // メールアドレスを使ってトークンを取得
      });
      setLoginSuccess(true);
      setLoginError(null);

      localStorage.setItem("token", tokenResponse.data.token); // トークン保存
      router.push("/main"); // メインページへ遷移
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setLoginSuccess(false);
        setLoginError(
          error.response?.data.message || "ユーザー登録に失敗しました。"
        );
      } else {
        setLoginError("予期しないエラーが発生しました");
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h1 className="mb-5 text-2xl font-bold text-center">新規登録フォーム</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name" className="block text-sm mb-1">
          名前
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <p className="text-red-600 text-xs mb-4">
          {errors.name?.message as React.ReactNode}
        </p>

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
          登録
        </button>
        {loginSuccess === false && (
          <p className="text-red-600 text-xs mt-2">{loginError}</p>
        )}
      </form>
    </div>
  );
};

export default Register;
