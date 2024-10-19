//Next.js のクライアントコンポーネントとして指定
"use client";

import { useForm } from "react-hook-form";
import { validationSchema } from "../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

interface LoginForm {
  name: string;
  email: string;
  password: string;
}

const App = () => {
  // ログインできているかを管理するやつ。できてなかったらメッセージを表示
  const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  // ここでページ遷移するuseRouterを使う準備
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
      const response = await axios.post("/api/login", {
        email: data.email,
        password: data.password,
      });
      console.log(response.data.message); // ログイン成功メッセージを表示

      // JWTトークンをlocalStorageに保存
      localStorage.setItem("token", response.data.token);

      setLoginSuccess(true);
      setLoginError(null);
      // HomePageにリダイレクトする
      router.push("/HomePage");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message); // エラーメッセージを表示
        setLoginSuccess(false);
        setLoginError(error.response?.data.message || "ログインに失敗しました");
      } else {
        console.error("Unexpected error:", error);
        setLoginError("予期しないエラーが発生しました");
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h1 className="mb-5 text-2xl font-bold text-center">Login Form</h1>
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
