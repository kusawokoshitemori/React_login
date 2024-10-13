"use client";

import React from "react";
import { useForm } from "react-hook-form";

const ProverbForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // ここでデータをAPIに送信する処理を追加
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
          {...register("explanation", { required: true, maxLength: 70 })}
          placeholder="説明 (最大70文字)"
          className="w-full p-2 border rounded"
        />
        {errors.explanation && <span>説明は必須です（最大70文字）</span>}
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
