import "./App.css";
import { useForm } from "react-hook-form";
import { validationSchema } from "./utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface LoginForm {
  name: string;
  email: string;
  password: string;
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
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
}

export default App;
