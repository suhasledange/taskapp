import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import bcrypt from 'bcrypt'

dbConnect()

export async function POST(request){
    try {
        const {username, email, password} = await request.json()

        const user = await User.findOne({
            $or:[{email},{username}]
        })

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })


    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}