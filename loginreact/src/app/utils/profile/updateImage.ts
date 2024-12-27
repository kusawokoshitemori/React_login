// import { supabase } from "@/services/supabaseClient";

// export const updateImage = async (
//   userId: string,
//   file: File
// ): Promise<string | null> => {
//   // ここにファイルが無かったらreturnする処理
//   const filePath = `${userId}/${Date.now()}-${file.name}`; // ユーザーIDで管理
//   const { data, error } = await supabase.storage
//     .from("avatars")
//     .upload(filePath, file);

//   if (error) {
//     console.error("アップロードエラー:", error);
//     return null;
//   }
//   console.log("できたよ", data);
//   return null;
// };
// //   const { publicUrl } = supabase.storage
// //     .from("profile-images")
// //     .getPublicUrl(fileName);
// //   console.log(`公開URL: ${publicUrl}`);
// //   return publicUrl || null;
