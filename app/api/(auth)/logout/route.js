import { NextResponse } from "next/server";

export async function GET(req, res) {
    console.log("Environment:", process.env.NODE_ENV);
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

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
