// データをseemsに入れる予定

// import { NextApiRequest, NextApiResponse } from "next";
// import { supabase } from "@/lib/supabaseClient";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { user_id, post_id } = req.body; // フロントエンドからのデータを取得

//   // `seems`テーブルにデータを挿入
//   const { data, error } = await supabase
//     .from("seems")
//     .insert([{ user_id, post_id }]);

//   if (error) {
//     return res.status(500).json({ error: error.message });
//   }

//   return res.status(200).json(data);
// }
