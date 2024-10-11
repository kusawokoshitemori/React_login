import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // 簡単な認証ロジック（ここを実際の認証ロジックに置き換える）
    if (email === "test@example.com" && password === "password") {
      res.status(200).json({ message: "ログイン成功" });
    } else {
      res
        .status(401)
        .json({ message: "メールアドレスまたはパスワードが無効です" });
    }
  } else {
    // POSTメソッド以外の場合の処理
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
