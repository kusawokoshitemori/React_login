import "./App.css";
import { useForm } from "react-hook-form";

// フォームデータの型定義
interface FormData {
  example: string;
}

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);

  console.log(watch("example"));

  return (
    <div className="form-container">
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="名前">名前</label>
        <input id="name" type="text" {...register("example")} />
        <label htmlFor="メールアドレス">メールアドレス</label>
        <input id="email" type="email" {...register("example")} />
        <label htmlFor="パスワード">パスワード</label>
        <input id="password" type="password" {...register("example")} />

        {/* エラーメッセージの表示 */}
        {errors.example?.message && <p>{String(errors.example.message)}</p>}

        <button type="submit">送信</button>
      </form>
    </div>
  );
}

export default App;
