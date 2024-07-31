import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
      path: "/",              
      domain: "https://todonext-app.vercel.app" 
    });
    const removedCookie = response.cookies.get("token");
    if (removedCookie && removedCookie.value !== '') {
      return NextResponse.json({ message: "Failed to remove token", success: false });
    }

    return response;
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
