import { supabase } from "@/services/supabaseClient";

export async function POST(req: Request) {
  const { PlayerUser, OtherUserId } = await req.json();

  const { error } = await supabase
    .from("follows")
    .delete()
    .match({ follower_id: PlayerUser, followee_id: OtherUserId });

  if (error) {
    console.error("フォロー解除に失敗しました:", error.message);
  } else {
    console.log("フォロー解除に成功しました");
  }
}
