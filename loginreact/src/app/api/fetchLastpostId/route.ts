import { supabase } from "@/services/supabaseClient";

export async function fetchLastPostId() {
  const { data, error } = await supabase
    .from("posts")
    .select("id")
    .order("id", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Error fetching latest post ID:", error);
    return null;
  }

  return data && data.length > 0 ? data[0].id : null;
}
