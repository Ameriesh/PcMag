import { authClient } from "@/lib/auth-client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { data } = await authClient.getSession();
    // data.user contiendra les infos de l'utilisateur
    return NextResponse.json({ user: data?.user || null });
  } catch (err: any) {
    return NextResponse.json({ user: null, error: err.message });
  }
}
