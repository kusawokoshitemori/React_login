import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { proverb, explanation } = req.body;

    const { data, error } = await supabase
      .from("proverbs")
      .insert([{ proverb, explanation }]);

    if (error) {
      res.status(500).json({ message: "投稿に失敗しました", error });
    } else {
      res.status(200).json({ message: "投稿が成功しました", data });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
