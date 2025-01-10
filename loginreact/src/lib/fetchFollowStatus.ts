import { supabase } from "@/services/supabaseClient";

export const fetchFollowStatus = async (
  followerId: string | undefined,
  followeeId: string | undefined
): Promise<boolean> => {
  if (!followerId || !followeeId) return false;

  try {
    const { data, error } = await supabase
      .from("follows")
      .select("*")
      .eq("follower_id", followerId)
      .eq("followee_id", followeeId)
      .single();

    if (error && error.code !== "PGRST116") {
      return false;
    }

    return !!data;
  } catch {
    return false;
  }
};
