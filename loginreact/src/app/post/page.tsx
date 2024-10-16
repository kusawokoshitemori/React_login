"use client"; // クライアントコンポーネントとしてマーク

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { supabase } from "../../lib/supabaseClient";
import useAuth from "../../hooks/useAuth";

//formの型定義
interface ProverbFormData {
  proverb: string;
  explanation: string;
}

const ProverbForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProverbFormData>();

  const user = useAuth(); // ユーザー情報を取得

  const onSubmit: SubmitHandler<ProverbFormData> = async (data) => {
    if (!user) {
      console.error("ユーザーが認証されていません");
      return;
    }
    const { error } = await supabase.from("posts").insert([
      {
        proverb: data.proverb,
        explanation: data.explanation,
        userid: "user" + user.id,
        good: 0,
        comment: 0,
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error.message);
    } else {
      console.log("データが正常に挿入されました");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <textarea
          {...register("proverb", { required: true, maxLength: 30 })}
          placeholder="ことわざ (最大30文字)"
          className="w-full p-2 border rounded"
        />
        {errors.proverb && <span>ことわざは必須です（最大30文字）</span>}
      </div>
      <div>
        <textarea
          {...register("explanation", { required: true, maxLength: 50 })}
          placeholder="説明 (最大50文字)"
          className="w-full p-2 border rounded"
        />
        {errors.explanation && <span>説明は任意です（最大50文字）</span>}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        投稿
      </button>
    </form>
  );
};

export default ProverbForm;
