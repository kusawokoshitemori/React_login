// src/app/register.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import "./page.css";

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

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await axios.post("/api/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      console.log(response.data.message); // 登録成功メッセージを表示
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message); // エラーメッセージを表示
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="form-container">
      <h1>新規登録フォーム</h1>
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
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default Register;
