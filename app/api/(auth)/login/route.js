import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await dbConnect();
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invlid Credentials" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    console.log("Login")

    console.log("Environment:", process.env.NODE_ENV);
    console.log("Token Set:", token);
    console.log("Token Removed:", response.cookies.get("token"));

    return response;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
