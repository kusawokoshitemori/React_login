import { NextResponse } from "next/server";
import { supabase } from "@/services/supabaseClient";

// POST メソッドをエクスポート
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("users")
      .select("name")
      .eq("id", userId)
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch user name" },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ name: data.name });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
