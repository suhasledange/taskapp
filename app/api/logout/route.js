import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    response.cookies.delete("token", {
      httpOnly: true,
      secure: true,
      path: "/",              
    });

    return response;
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
