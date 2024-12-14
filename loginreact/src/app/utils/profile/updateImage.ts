// import { supabase } from "@/services/supabaseClient";

// export const updateImage = async (
//   userId: string,
//   imageFile: File
// ): Promise<void> => {
//   try {
//     const fileName = `aaa`; //${userId}/${Date.now()}_${imageFile.name}
//     const { data, error } = await supabase.storage
//       .from("profile-images")
//       .upload(fileName, imageFile);

//     if (error) {
//       console.log(error);
//       throw new Error(`画像アップロードエラー: ${error.message}`);
//     }

//     const { data: publicUrlData } = supabase.storage
//       .from("profile-images")
//       .getPublicUrl(fileName);

//     if (!publicUrlData?.publicUrl) throw new Error("画像URL取得エラー");

//     const profileImageUrl = publicUrlData.publicUrl;

//     // URLをDBに保存
//     const { error: updateError } = await supabase
//       .from("users")
//       .update({ profile_image_url: profileImageUrl })
//       .eq("id", userId);

//     if (updateError)
//       throw new Error(`プロフィール画像URL更新エラー: ${updateError.message}`);

//     console.log("プロフィール画像が更新されました！");
//   } catch (err: any) {
//     console.error(err.message);
//     throw err;
//   }
// };
