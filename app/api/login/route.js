import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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
        { error: "Invalid Credentials" },
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

    const tokenExpiryTimestamp = Date.now() + (24 * 60 * 60 * 1000);
    const tokenExpiryDate = new Date(tokenExpiryTimestamp);

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

     cookies().set('token',token,{
        expires:tokenExpiryDate,
        httpOnly:true,
        path:'/'
      })

    return response;

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
