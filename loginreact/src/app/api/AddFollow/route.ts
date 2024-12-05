import { supabase } from "@/services/supabaseClient";

export async function POST(req: Request) {
  const { PlayerUser, OtherUserId } = await req.json();

  const { error } = await supabase
    .from("follows")
    .insert({ follower_id: PlayerUser, followee_id: OtherUserId });

  if (error) {
    throw error;
  }
  console.log("フォローができました");
}
