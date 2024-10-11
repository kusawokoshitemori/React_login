// src/pages/index.tsx
import { useForm } from "react-hook-form";
import { validationSchema } from "../utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import "./index.css";

interface LoginForm {
  name: string;
  email: string;
  password: string;
}

const App = () => {
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
      </form>
    </div>
  );
};

export default App;
