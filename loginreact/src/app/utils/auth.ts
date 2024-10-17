// JWTトークンの処理を行うヘルパー関数
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // 環境変数から秘密鍵を取得
// デバッグ用
if (!JWT_SECRET) {
  throw new Error("JWT_SECRETの秘密鍵が未設定");
}

// JWTトークンを生成する関数
export const generateToken = (user: {
  id: string;
  email: string;
  name: string;
}) => {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name }, // ペイロード
    JWT_SECRET, // 秘密鍵
    { expiresIn: "1d" } // 有効期限
  );
};

// トークンをデコードする関数
export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // トークンを検証
    return decoded; // デコードされたペイロードを返す
  } catch {
    return null; // エラーが発生した場合はnullを返す
  }
};

// トークンからユーザー情報を取得する関数
export const getUserFromToken = (token: string) => {
  const decoded = verifyToken(token);
  return decoded; // デコードされたユーザー情報を返す
};
