import "./App.css";
import { useForm } from "react-hook-form";

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
  } = useForm<LoginForm>({ mode: "onChange" });

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <div className="form-container">
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="名前">名前</label>
        <input
          id="name"
          type="text"
          {...register("name", {
            required: "名前は必須です",
            minLength: { value: 4, message: "4文字以上で入力してください" },
          })}
        />
        <p>{errors.name?.message as React.ReactNode}</p>
        <label htmlFor="メールアドレス">メールアドレス</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: "Emailは必須です" })}
        />
        <p>{errors.email?.message as React.ReactNode}</p>
        <label htmlFor="パスワード">パスワード</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "パスワードは必須です",
            minLength: { value: 6, message: "6文字以上で入力してください" },
          })}
        />
        <p>{errors.password?.message as React.ReactNode}</p>

        <button type="submit">送信</button>
      </form>
    </div>
  );
}

export default App;
