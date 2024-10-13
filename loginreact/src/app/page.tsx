//Next.js のクライアントコンポーネントとして指定
"use client";

import { useForm } from "react-hook-form";
import { validationSchema } from "../app/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "./page.css";
import Link from "next/link";
import { useState } from "react";

interface LoginForm {
  name: string;
  email: string;
  password: string;
}

const App = () => {
  //ログインできているかを管理するやつ。できてなかったらメッセージを表示
  const [loginSuccess, setLoginSuccess] = useState<boolean | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
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
      const response = await axios.post("http://localhost:3000/api/login", {
        email: data.email,
        password: data.password,
      });
      console.log(response.data.message); // ログイン成功メッセージを表示
      setLoginSuccess(true);
      setLoginError(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message); // エラーメッセージを表示
        setLoginSuccess(false);
        setLoginError(error.response?.data.message || "ログインに失敗しました"); //ここ後で理解
      } else {
        console.error("Unexpected error:", error);
        setLoginError("予期しないエラーが発生しました");
      }
    }
  };

  return (
    <div className="form-container">
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="名前">名前</label>
        <input id="name" type="text" {...register("name")} />
        <p>{errors.name?.message as React.ReactNode}</p>
        <label htmlFor="メールアドレス">メールアドレス</label>
        <input id="email" type="email" {...register("email")} />
        <p>{errors.email?.message as React.ReactNode}</p>
        <label htmlFor="パスワード">パスワード</label>
        <input id="password" type="password" {...register("password")} />
        <p>{errors.password?.message as React.ReactNode}</p>
        <button type="submit">送信</button>

        {loginSuccess === false && <p>{loginError}</p>}
      </form>
      <Link href="/register">新規登録</Link>
    </div>
  );
};

export default App;
