import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    });

    console.log(response.cookies.get("token"))

    if(response.cookies.get("token").value !== '') return NextResponse.json({message:"Failed to remove token",success:false}) 

    return response;
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
